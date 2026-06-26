"use client";
import { createContext, useCallback, useEffect, useMemo, useState, ReactNode } from 'react';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

import { mockProducts } from '../data/mockProducts';

export const AppContext = createContext<any>(null);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

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
    if (!supabase) {
      return undefined;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setUser(data.session.user);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (!supabase || !user) {
      if (!user) {
        setRole(null);
      }
      return;
    }

    // Skip role fetching for local override admin or admin roles
    if (user.id === 'admin-local' || (user as any).role === 'admin') {
      setRole('admin');
      return;
    }

    const fetchRole = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error || !data?.role) {
        setRole('buyer');
        return;
      }

      setRole(data.role);
    };

    fetchRole();
  }, [user, supabase]);

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
      if (!supabase) {
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
        return { data: products, error: null, source: 'local' };
      }

      let query = supabase.from('products').select('*');
      if (!all) {
        query = query.eq('is_verified', true);
      }
      if (sellerId) {
        query = query.eq('seller_id', sellerId);
      }
      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
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

      // Merge database products with local storage products to prevent data desync
      const dbProducts = (data || []).map(normalizeProduct);
      const dbIds = new Set(dbProducts.map(p => String(p.id)));
      
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
        source: 'supabase-merged',
      };
    },
    [localProducts, supabase]
  );

  const getProductById = useCallback(
    async (id: string | number) => {
      if (!id) {
        return null;
      }

      const localMatch = localProducts.find((product) => String(product.id) === String(id));
      if (!supabase) {
        return localMatch || null;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        return localMatch || null;
      }

      return normalizeProduct(data);
    },
    [localProducts, supabase]
  );

  const registerUser = useCallback(
    async ({ email, password, nextRole, metadata = {} }: any) => {
      if (!supabase) {
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

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: nextRole,
            ...metadata,
          },
        },
      });

      if (!error && data.user) {
        setUser(data.user);
      }

      return { error, user: data.user, mode: 'supabase' };
    },
    [supabase]
  );

  const loginUser = useCallback(async ({ email, password }: any) => {
    // Hardcoded Admin Override from .env (with fallbacks if server wasn't restarted)
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

    if (!supabase) {
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

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { error, user: null, role: null, mode: 'supabase' };
    }

    const {
      data: { user: signedInUser },
    } = await supabase.auth.getUser();

    if (!signedInUser) return { error: { message: 'User not found' }, user: null, role: null, mode: 'supabase' };

    const { data, error: roleError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', signedInUser.id)
      .single();

    const nextRole = roleError || !data?.role ? 'buyer' : data.role;
    setRole(nextRole);

    return {
      error: null,
      user: signedInUser,
      role: nextRole,
      mode: 'supabase',
    };
  }, [supabase]);

  const logoutUser = useCallback(async () => {
    if (!supabase) {
      setUser(null);
      setRole(null);
      return { error: null, mode: 'local' };
    }

    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setRole(null);
    }
    return { error, mode: 'supabase' };
  }, [supabase]);

  const updateProfile = useCallback(
    async (profileData: any) => {
      if (!supabase) {
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

      return supabase.auth.updateUser({ data: profileData });
    },
    [supabase]
  );

  const requestPasswordReset = useCallback(async (email: string) => {
    if (!supabase) {
      return { error: null, mode: 'local' };
    }

    if (typeof window !== 'undefined') {
      return supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
    }
    return { error: { message: 'Window not defined' } };
  }, [supabase]);

  const updatePassword = useCallback(
    async (password: string) => {
      if (!supabase) {
        return { error: null, mode: 'local' };
      }

      return supabase.auth.updateUser({ password });
    },
    [supabase]
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

      if (!supabase) {
        const created = normalizeProduct({
          ...payload,
          id: `local-product-${Date.now()}`,
          is_verified: false,
          admin_price: null,
        });
        setLocalProducts((prev) => [created, ...prev]);
        return { data: created, error: null, mode: 'local' };
      }

      const baseInsert = {
        name: payload.name,
        price: payload.price,
        description: payload.description,
        category: payload.category,
        seller_id: payload.seller_id,
        image_url: payload.imageUrl || null,
        material_used: payload.material_used || '',
        weight: payload.weight || '',
        is_verified: false,
        admin_price: null,
      };

      let insertedData = null;
      let insertError = null;

      const STOCK_COLUMN_CANDIDATES = ['number_of_item', 'Number of item'];

      for (const stockColumn of STOCK_COLUMN_CANDIDATES) {
        const { data, error } = await supabase
          .from('products')
          .insert([{ ...baseInsert, [stockColumn]: payload.numberOfItem }])
          .select()
          .single();

        if (!error) {
          insertedData = data;
          insertError = null;
          break;
        }

        insertError = error;

        if (!error.message?.toLowerCase().includes('column')) {
          break;
        }
      }

      if (insertError) {
        // Fallback: save to local storage so product is not lost
        const created = normalizeProduct({
          ...payload,
          id: `local-product-${Date.now()}`,
          is_verified: false,
          admin_price: null,
        });
        setLocalProducts((prev) => [created, ...prev]);
        return { data: created, error: insertError, mode: 'fallback-local' };
      }

      // Also add to local products to maintain state sync
      const dbCreated = normalizeProduct(insertedData);
      setLocalProducts((prev) => [dbCreated, ...prev]);

      return { data: dbCreated, error: null, mode: 'supabase' };
    },
    [user, supabase]
  );

  const deleteSellerProduct = useCallback(async (id: string | number) => {
    if (!supabase) {
      setLocalProducts((prev) => prev.filter((product) => product.id !== id));
      return { error: null, mode: 'local' };
    }

    const { error } = await supabase.from('products').delete().eq('id', id);
    return { error, mode: 'supabase' };
  }, [supabase]);

  const verifyProduct = useCallback(async (id: string | number, adminPrice: number) => {
    if (!supabase) {
      setLocalProducts((prev) => 
        prev.map(p => p.id === id ? { ...p, is_verified: true, admin_price: adminPrice, price: adminPrice } : p)
      );
      return { error: null, mode: 'local' };
    }

    const { error } = await supabase.from('products').update({
      is_verified: true,
      admin_price: adminPrice,
      price: adminPrice
    }).eq('id', id);
    return { error, mode: 'supabase' };
  }, [supabase]);

  const updateProduct = useCallback(async (id: string | number, updatedFields: any) => {
    const payload = {
      ...updatedFields,
      price: updatedFields.price !== undefined ? Number(updatedFields.price) : undefined,
      admin_price: updatedFields.admin_price !== undefined ? Number(updatedFields.admin_price) : undefined,
      numberOfItem: updatedFields.numberOfItem !== undefined ? Number(updatedFields.numberOfItem) : undefined,
    };
    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

    if (!supabase) {
      setLocalProducts((prev) => 
        prev.map(p => {
          if (p.id === id) {
            return normalizeProduct({ ...p, ...payload });
          }
          return p;
        })
      );
      return { error: null, mode: 'local' };
    }

    const dbPayload: any = {};
    if (payload.name !== undefined) dbPayload.name = payload.name;
    if (payload.price !== undefined) dbPayload.price = payload.price;
    if (payload.admin_price !== undefined) dbPayload.admin_price = payload.admin_price;
    if (payload.description !== undefined) dbPayload.description = payload.description;
    if (payload.category !== undefined) dbPayload.category = payload.category;
    if (payload.material_used !== undefined) dbPayload.material_used = payload.material_used;
    if (payload.weight !== undefined) dbPayload.weight = payload.weight;
    if (payload.is_verified !== undefined) dbPayload.is_verified = payload.is_verified;
    if (payload.imageUrl !== undefined || payload.image_url !== undefined) {
      dbPayload.image_url = payload.imageUrl || payload.image_url;
    }
    
    if (payload.numberOfItem !== undefined) {
      const { data: product } = await supabase.from('products').select('*').eq('id', id).single();
      const stockColumn = product && product['number_of_item'] !== undefined ? 'number_of_item' : 'Number of item';
      dbPayload[stockColumn] = payload.numberOfItem;
    }

    const { error } = await supabase.from('products').update(dbPayload).eq('id', id);
    return { error, mode: 'supabase' };
  }, [supabase]);

  const awardEcoCoins = useCallback(async (userId: string, amount: number) => {
    if (!supabase) {
      try {
        const coins = readJson('green-turtle-eco-coins', {});
        const userKey = userId || 'local-buyer';
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

    // In a real app, this should be done securely on the server via RPC or Edge Function
    const { data: profile } = await supabase.from('profiles').select('eco_coins').eq('id', userId).single();
    const currentCoins = profile?.eco_coins || 0;
    
    const { error } = await supabase.from('profiles').update({
      eco_coins: currentCoins + amount
    }).eq('id', userId);
    
    return { error, mode: 'supabase' };
  }, [supabase]);

  const spendEcoCoins = useCallback(async (userId: string, amount: number) => {
    if (!supabase) {
      try {
        const coins = readJson('green-turtle-eco-coins', {});
        const userKey = userId || 'local-buyer';
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

    const { data: profile } = await supabase.from('profiles').select('eco_coins').eq('id', userId).single();
    const currentCoins = profile?.eco_coins || 0;
    
    const { error } = await supabase.from('profiles').update({
      eco_coins: Math.max(0, currentCoins - amount)
    }).eq('id', userId);
    
    return { error, mode: 'supabase' };
  }, [supabase]);

  const creditSellerWallet = useCallback(async (sellerId: string, amount: number) => {
    if (!supabase) {
      try {
        const wallets = readJson('green-turtle-wallets', {});
        const sellerKey = sellerId || 'local-seller';
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

    const { data: profile } = await supabase.from('profiles').select('wallet').eq('id', sellerId).single();
    const currentWallet = profile?.wallet || 0;
    
    const { error } = await supabase.from('profiles').update({
      wallet: currentWallet + amount
    }).eq('id', sellerId);
    
    return { error, mode: 'supabase' };
  }, [role, supabase]);

  const updateProductStock = useCallback(async (id: string | number, quantityPurchased: number) => {
    if (!supabase) {
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

    const { data: product, error: fetchErr } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchErr || !product) {
      return { error: fetchErr, mode: 'supabase' };
    }

    const stockColumn = product['number_of_item'] !== undefined ? 'number_of_item' : 'Number of item';
    const currentStock = Number(product[stockColumn] || 0);
    const nextStock = Math.max(0, currentStock - quantityPurchased);

    const { error } = await supabase.from('products').update({
      [stockColumn]: nextStock
    }).eq('id', id);

    return { error, mode: 'supabase' };
  }, [supabase]);

  const value = useMemo(
    () => ({
      supabase,
      isSupabaseConfigured,
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
      isSupabaseConfigured,
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
      supabase,
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
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
