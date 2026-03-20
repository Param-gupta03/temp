import { createContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export const AppContext = createContext();

// 🔥 ENV VARIABLES
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// 🔥 SAFETY CHECK
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Supabase ENV not loaded properly");
}

// 🔥 SUPABASE CLIENT
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const AppProvider = ({ children }) => {
  // ===== AUTH =====
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  // ===== CART =====
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCartQuantity = (id, change) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  // ===== PRODUCT =====
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ===== MESSAGE =====
  const [message, setMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);

  const showMessage = (msg) => {
    setMessage(msg);
    setShowMessageModal(true);
    setTimeout(() => setShowMessageModal(false), 2000);
  };

  // ===== IMAGE STATE =====
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // ===== AUTH LISTENER =====
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ===== FETCH ROLE (SAFE VERSION 🔥) =====
  useEffect(() => {
    const fetchRole = async () => {
      if (!user) {
        setRole(null);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      // 🔥 SAFE HANDLING
      if (error || !data) {
        console.warn("⚠️ Role fetch failed:", error?.message);
        setRole('buyer'); // fallback
        return;
      }

      setRole(data.role);
    };

    fetchRole();
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        // Supabase
        supabase,

        // Auth
        user,
        role,
        setRole,

        // Cart
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,

        // Product
        selectedProduct,
        setSelectedProduct,

        // Messages
        message,
        showMessage,
        showMessageModal,
        setShowMessageModal,

        // Image
        isGeneratingImage,
        setIsGeneratingImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};