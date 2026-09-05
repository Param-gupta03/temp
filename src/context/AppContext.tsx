"use client";
import { createContext, useCallback, useEffect, useMemo, useState, ReactNode } from 'react';

import { mockProducts } from '../data/mockProducts';

export interface User {
  id: string;
  email: string;
  role?: string;
  user_metadata?: any;
}

export const AppContext = createContext<any>(null);

const CART_STORAGE_KEY = 'green-turtle-cart';
const LOCAL_USER_STORAGE_KEY = 'green-turtle-user';
const LOCAL_PRODUCTS_STORAGE_KEY = 'green-turtle-products';

const readJson = (key: string, fallback: any) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const normalizeProduct = (product: any) => ({
  ...product,
  imageUrl: product.imageUrl || product.image_url || '',
  price: Number(product.price || 0),
  numberOfItem: Number(
    product.numberOfItem ?? product.number_of_item ?? product['Number of item'] ?? 0
  ),
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [hasLoadedStoredState, setHasLoadedStoredState] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [localProducts, setLocalProducts] = useState<any[]>(() => mockProducts.map(normalizeProduct));
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const nextTheme = prev === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('green-turtle-theme', nextTheme);
        if (nextTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return nextTheme;
    });
  }, []);

  useEffect(() => {
    const storedUser = readJson(LOCAL_USER_STORAGE_KEY, null);

    if (storedUser) {
      // Sync local wallets and eco_coins into user_metadata for local mode consistency
      const wallets = readJson('green-turtle-wallets', {});
      const coins = readJson('green-turtle-eco-coins', {});
      const userKey = storedUser.id;
      storedUser.user_metadata = {
        ...storedUser.user_metadata,
        wallet: wallets[userKey] !== undefined ? wallets[userKey] : (storedUser.user_metadata?.wallet || 0),
        eco_coins: coins[userKey] !== undefined ? coins[userKey] : (storedUser.user_metadata?.eco_coins || 0)
      };
    }

    setUser(storedUser);
    setRole(storedUser?.role || null);
    setCart(readJson(CART_STORAGE_KEY, []));
    setLocalProducts(readJson(LOCAL_PRODUCTS_STORAGE_KEY, mockProducts).map(normalizeProduct));
    
    if (typeof window !== 'undefined') {
      const storedTheme = window.localStorage.getItem('green-turtle-theme') as 'light' | 'dark' | null;
      if (storedTheme) {
        setTheme(storedTheme);
        if (storedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }

    setHasLoadedStoredState(true);
  }, []);

  useEffect(() => {
    if (hasLoadedStoredState && typeof window !== 'undefined') {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, hasLoadedStoredState]);

  useEffect(() => {
    if (hasLoadedStoredState && typeof window !== 'undefined') {
      window.localStorage.setItem(LOCAL_PRODUCTS_STORAGE_KEY, JSON.stringify(localProducts));
    }
  }, [hasLoadedStoredState, localProducts]);

  useEffect(() => {
    if (hasLoadedStoredState && typeof window !== 'undefined') {
      if (user) {
        window.localStorage.setItem(
          LOCAL_USER_STORAGE_KEY,
          JSON.stringify({ ...user, role: role || (user as any).role || 'buyer' })
        );
      } else {
        window.localStorage.removeItem(LOCAL_USER_STORAGE_KEY);
      }
    }
  }, [hasLoadedStoredState, role, user]);

  const showMessage = useCallback((msg: string) => {
    setMessage(msg);
    setShowMessageModal(true);
    if (typeof window !== 'undefined') {
      window.setTimeout(() => setShowMessageModal(false), 2200);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setRole(null);
      return;
    }

    // Skip role fetching for local override admin or admin roles
    if (user.id === 'admin-local' || (user as any).role === 'admin') {
      setRole('admin');
      return;
    }

    if (user.id.startsWith('local-')) {
      setRole(user.role || 'buyer');
      return;
    }

    const fetchRole = async () => {
      try {
        const response = await fetch(`/api/profile?userId=${user.id}`);
        const data = await response.json();
        if (data.profile?.role) {
          setRole(data.profile.role);
        } else {
          setRole(user.role || 'buyer');
        }
      } catch (err) {
        console.error('Error fetching role:', err);
        setRole(user.role || 'buyer');
      }
    };

    fetchRole();
  }, [user]);

  const addToCart = useCallback((product: any) => {
    const normalized = normalizeProduct(product);

    if (normalized.numberOfItem <= 0) {
      showMessage('This product is out of stock.');
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === normalized.id);

      if (existing) {
        if (existing.quantity >= normalized.numberOfItem) {
          showMessage(`Only ${normalized.numberOfItem} items are available.`);
          return prev;
        }

        return prev.map((item) =>
          item.id === normalized.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...normalized, quantity: 1 }];
    });
  }, [showMessage]);

  const removeFromCart = useCallback((id: string | number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateCartQuantity = useCallback((id: string | number, change: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) {
            return item;
          }

          const nextQuantity = item.quantity + change;
          const maxQuantity = Number(item.numberOfItem || 0);

          if (change > 0 && maxQuantity > 0) {
            return { ...item, quantity: Math.min(maxQuantity, nextQuantity) };
          }

          return { ...item, quantity: Math.max(1, nextQuantity) };
        })
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const fetchProducts = useCallback(
    async ({ limit, sellerId, all = false }: { limit?: number; sellerId?: string; all?: boolean } = {}) => {
      try {
        const queryParams = new URLSearchParams();
        if (limit) queryParams.set('limit', String(limit));
        if (sellerId) queryParams.set('sellerId', sellerId);
        if (all) queryParams.set('all', 'true');

        const response = await fetch(`/api/products?${queryParams.toString()}`);
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        const dbProducts = (data.products || []).map(normalizeProduct);
        const dbIds = new Set(dbProducts.map((p: any) => String(p.id)));

        let extraLocal = [...localProducts].filter(p => !dbIds.has(String(p.id)));
        if (!all) {
          extraLocal = extraLocal.filter(p => p.is_verified !== false);
        }
        if (sellerId) {
          extraLocal = extraLocal.filter((product) => product.seller_id === sellerId);
        }

        let merged = [...dbProducts, ...extraLocal];
        if (limit) {
          merged = merged.slice(0, limit);
        }

        return {
          data: merged,
          error: null,
          source: 'mongodb',
        };
      } catch (error: any) {
        console.error('Fetch products failed, using local fallback:', error);
        let products = [...localProducts];
        if (!all) {
          products = products.filter(p => p.is_verified !== false);
        }
        if (sellerId) {
          products = products.filter((product) => product.seller_id === sellerId);
        }
        if (limit) {
          products = products.slice(0, limit);
        }
        return { data: products, error, source: 'fallback' };
      }
    },
    [localProducts]
  );

  const getProductById = useCallback(
    async (id: string | number) => {
      if (!id) {
        return null;
      }

      const localMatch = localProducts.find((product) => String(product.id) === String(id));
      try {
        const response = await fetch(`/api/products?id=${id}`);
        const data = await response.json();
        if (data.product) {
          return normalizeProduct(data.product);
        }
        return localMatch || null;
      } catch (err) {
        console.error('Error fetching product by ID:', err);
        return localMatch || null;
      }
    },
    [localProducts]
  );

  const registerUser = useCallback(
    async ({ email, password, nextRole, metadata = {} }: any) => {
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, role: nextRole, metadata }),
        });

        const data = await response.json();
        if (data.error) {
          return { error: new Error(data.error), user: null, mode: 'mongodb' };
        }

        setUser(data.user);
        setRole(data.user.role);
        return { error: null, user: data.user, mode: 'mongodb' };
      } catch (error: any) {
        console.error('Registration failed, using local mode fallback:', error);
        const localUser: any = {
          id: `local-${Date.now()}`,
          email,
          role: nextRole,
          user_metadata: metadata,
        };
        setUser(localUser);
        setRole(nextRole);
        return { error: null, user: localUser, mode: 'local' };
      }
    },
    []
  );

  const loginUser = useCallback(async ({ email, password }: any) => {
    const adminId = process.env.NEXT_PUBLIC_ADMIN_ID || 'admin';
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

    if (email === adminId && password === adminPassword) {
      const adminUser: any = {
        id: `admin-local`,
        email,
        role: 'admin',
        user_metadata: {},
      };
      setUser(adminUser);
      setRole('admin');
      return { error: null, user: adminUser, role: 'admin', mode: 'local-override' };
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.error) {
        return { error: new Error(data.error), user: null, role: null, mode: 'mongodb' };
      }

      setUser(data.user);
      setRole(data.role);

      return {
        error: null,
        user: data.user,
        role: data.role,
        mode: 'mongodb',
      };
    } catch (error: any) {
      console.error('Login failed, using local fallback:', error);
      const normalizedEmail = email.toLowerCase();
      const localRole = normalizedEmail.includes('admin')
        ? 'admin'
        : normalizedEmail.includes('seller')
          ? 'seller'
          : 'buyer';
      
      const userKey = `local-${email}`;
      const wallets = readJson('green-turtle-wallets', {});
      const coins = readJson('green-turtle-eco-coins', {});

      const localUser: any = {
        id: userKey,
        email,
        role: localRole,
        user_metadata: {
          wallet: wallets[userKey] || 0,
          eco_coins: coins[userKey] || 0
        },
      };
      setUser(localUser);
      setRole(localRole);
      return { error: null, user: localUser, role: localRole, mode: 'local' };
    }
  }, []);

  const logoutUser = useCallback(async () => {
    setUser(null);
    setRole(null);
    return { error: null, mode: 'mongodb' };
  }, []);

  const updateProfile = useCallback(
    async (profileData: any) => {
      if (!user) return { error: new Error('Not logged in') };

      try {
        const response = await fetch('/api/auth/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, profileData }),
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        setUser((prev: any) =>
          prev
            ? {
                ...prev,
                user_metadata: {
                  ...(prev.user_metadata || {}),
                  ...profileData,
                },
              }
            : prev
        );
        return { error: null, mode: 'mongodb' };
      } catch (err: any) {
        setUser((prev) =>
          prev
            ? ({
                ...prev,
                user_metadata: {
                  ...(prev.user_metadata || {}),
                  ...profileData,
                },
              } as any)
            : prev
        );
        return { error: null, mode: 'local' };
      }
    },
    [user]
  );

  const requestPasswordReset = useCallback(async (email: string) => {
    return { error: null, mode: 'local' };
  }, []);

  const updatePassword = useCallback(
    async (password: string) => {
      if (!user) return { error: new Error('Not logged in') };

      try {
        const response = await fetch('/api/auth/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, password }),
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        return { error: null, mode: 'mongodb' };
      } catch (err: any) {
        return { error: null, mode: 'local' };
      }
    },
    [user]
  );

  const addSellerProduct = useCallback(
    async (product: any) => {
      const payload = {
        ...product,
        price: Number(product.price),
        numberOfItem: Number(product.numberOfItem || product.number_of_item || 0),
        imageUrl: product.imageUrl || product.image_url || '',
        seller_id: user?.id || 'local-seller',
      };

      try {
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: payload.name,
            price: payload.price,
            description: payload.description,
            category: payload.category,
            seller_id: payload.seller_id,
            imageUrl: payload.imageUrl,
            material_used: payload.material_used || '',
            weight: payload.weight || '',
            number_of_item: payload.numberOfItem,
          }),
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        const dbCreated = normalizeProduct(data.product);
        setLocalProducts((prev) => [dbCreated, ...prev]);

        return { data: dbCreated, error: null, mode: 'mongodb' };
      } catch (insertError: any) {
        console.error('Failed to add product to MongoDB, saving locally:', insertError);
        const created = normalizeProduct({
          ...payload,
          id: `local-product-${Date.now()}`,
          is_verified: false,
          admin_price: null,
        });
        setLocalProducts((prev) => [created, ...prev]);
        return { data: created, error: insertError, mode: 'fallback-local' };
      }
    },
    [user]
  );

  const deleteSellerProduct = useCallback(async (id: string | number) => {
    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setLocalProducts((prev) => prev.filter((product) => product.id !== id));
      return { error: null, mode: 'mongodb' };
    } catch (err: any) {
      setLocalProducts((prev) => prev.filter((product) => product.id !== id));
      return { error: null, mode: 'local' };
    }
  }, []);

  const verifyProduct = useCallback(async (id: string | number, adminPrice: number) => {
    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          updatedFields: {
            is_verified: true,
            admin_price: adminPrice,
            price: adminPrice,
          },
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setLocalProducts((prev) => 
        prev.map(p => p.id === id ? { ...p, is_verified: true, admin_price: adminPrice, price: adminPrice } : p)
      );
      return { error: null, mode: 'mongodb' };
    } catch (err: any) {
      setLocalProducts((prev) => 
        prev.map(p => p.id === id ? { ...p, is_verified: true, admin_price: adminPrice, price: adminPrice } : p)
      );
      return { error: null, mode: 'local' };
    }
  }, []);

  const updateProduct = useCallback(async (id: string | number, updatedFields: any) => {
    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, updatedFields }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setLocalProducts((prev) => 
        prev.map(p => {
          if (p.id === id) {
            return normalizeProduct({ ...p, ...updatedFields });
          }
          return p;
        })
      );
      return { error: null, mode: 'mongodb' };
    } catch (err: any) {
      setLocalProducts((prev) => 
        prev.map(p => {
          if (p.id === id) {
            return normalizeProduct({ ...p, ...updatedFields });
          }
          return p;
        })
      );
      return { error: null, mode: 'local' };
    }
  }, []);

  const awardEcoCoins = useCallback(async (userId: string, amount: number) => {
    const userKey = userId || 'local-buyer';
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userKey, action: 'award_coins', amount }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      const nextCoins = data.profile?.eco_coins || 0;
      setUser((prev: any) => {
        if (!prev) return prev;
        return {
          ...prev,
          user_metadata: { ...prev.user_metadata, eco_coins: nextCoins }
        };
      });
      return { error: null, mode: 'mongodb' };
    } catch (err: any) {
      try {
        const coins = readJson('green-turtle-eco-coins', {});
        coins[userKey] = (coins[userKey] || 0) + amount;
        window.localStorage.setItem('green-turtle-eco-coins', JSON.stringify(coins));
        
        setUser((prev: any) => {
          if (!prev) return prev;
          return {
            ...prev,
            user_metadata: { ...prev.user_metadata, eco_coins: coins[userKey] }
          };
        });
      } catch (e) {
        console.error(e);
      }
      return { error: null, mode: 'local' };
    }
  }, []);

  const spendEcoCoins = useCallback(async (userId: string, amount: number) => {
    const userKey = userId || 'local-buyer';
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userKey, action: 'spend_coins', amount }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      const nextCoins = data.profile?.eco_coins || 0;
      setUser((prev: any) => {
        if (!prev) return prev;
        return {
          ...prev,
          user_metadata: { ...prev.user_metadata, eco_coins: nextCoins }
        };
      });
      return { error: null, mode: 'mongodb' };
    } catch (err: any) {
      try {
        const coins = readJson('green-turtle-eco-coins', {});
        const current = coins[userKey] || 0;
        coins[userKey] = Math.max(0, current - amount);
        window.localStorage.setItem('green-turtle-eco-coins', JSON.stringify(coins));
        
        setUser((prev: any) => {
          if (!prev) return prev;
          return {
            ...prev,
            user_metadata: { ...prev.user_metadata, eco_coins: coins[userKey] }
          };
        });
      } catch (e) {
        console.error(e);
      }
      return { error: null, mode: 'local' };
    }
  }, []);

  const creditSellerWallet = useCallback(async (sellerId: string, amount: number) => {
    const sellerKey = sellerId || 'local-seller';
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: sellerKey, action: 'credit_wallet', amount }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      const nextWallet = data.profile?.wallet || 0;
      setUser((prev: any) => {
        if (prev && (prev.id === sellerId || (sellerId === 'local-seller' && role === 'seller'))) {
          return {
            ...prev,
            user_metadata: { ...prev.user_metadata, wallet: nextWallet }
          };
        }
        return prev;
      });
      return { error: null, mode: 'mongodb' };
    } catch (err: any) {
      try {
        const wallets = readJson('green-turtle-wallets', {});
        wallets[sellerKey] = (wallets[sellerKey] || 0) + amount;
        window.localStorage.setItem('green-turtle-wallets', JSON.stringify(wallets));
        
        setUser((prev: any) => {
          if (prev && (prev.id === sellerId || (sellerId === 'local-seller' && role === 'seller'))) {
            return {
              ...prev,
              user_metadata: { ...prev.user_metadata, wallet: wallets[sellerKey] }
            };
          }
          return prev;
        });
      } catch (e) {
        console.error(e);
      }
      return { error: null, mode: 'local' };
    }
  }, [role]);

  const updateProductStock = useCallback(async (id: string | number, quantityPurchased: number) => {
    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, quantityPurchased }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setLocalProducts((prev) => 
        prev.map(p => {
          if (p.id === id) {
            const nextStock = Math.max(0, (p.numberOfItem || 0) - quantityPurchased);
            return { ...p, numberOfItem: nextStock };
          }
          return p;
        })
      );
      return { error: null, mode: 'mongodb' };
    } catch (err: any) {
      setLocalProducts((prev) => 
        prev.map(p => {
          if (p.id === id) {
            const nextStock = Math.max(0, (p.numberOfItem || 0) - quantityPurchased);
            return { ...p, numberOfItem: nextStock };
          }
          return p;
        })
      );
      return { error: null, mode: 'local' };
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      role,
      setRole,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      selectedProduct,
      setSelectedProduct,
      message,
      showMessage,
      showMessageModal,
      setShowMessageModal,
      isGeneratingImage,
      setIsGeneratingImage,
      fetchProducts,
      getProductById,
      registerUser,
      loginUser,
      logoutUser,
      updateProfile,
      requestPasswordReset,
      updatePassword,
      addSellerProduct,
      deleteSellerProduct,
      verifyProduct,
      updateProduct,
      awardEcoCoins,
      spendEcoCoins,
      creditSellerWallet,
      updateProductStock,
      theme,
      toggleTheme,
    }),
    [
      addSellerProduct,
      addToCart,
      cart,
      clearCart,
      deleteSellerProduct,
      fetchProducts,
      getProductById,
      isGeneratingImage,
      loginUser,
      logoutUser,
      message,
      registerUser,
      removeFromCart,
      role,
      requestPasswordReset,
      selectedProduct,
      showMessage,
      showMessageModal,
      updateCartQuantity,
      updatePassword,
      updateProfile,
      user,
      verifyProduct,
      updateProduct,
      awardEcoCoins,
      spendEcoCoins,
      creditSellerWallet,
      updateProductStock,
      theme,
      toggleTheme,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
