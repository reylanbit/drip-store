import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const STORAGE_USERS_KEY = 'drip-store-users';
const STORAGE_CURRENT_USER_KEY = 'drip-store-current-user';

const readStorageJson = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => readStorageJson(STORAGE_USERS_KEY, []));
  const [currentUser, setCurrentUser] = useState(() => readStorageJson(STORAGE_CURRENT_USER_KEY, null));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (currentUser) {
      window.localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(currentUser));
    } else {
      window.localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
    }
  }, [currentUser]);

  const register = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const normalizedEmail = String(email || '').trim().toLowerCase();
      if (!normalizedEmail || !password || !name) {
        throw new Error('Dados incompletos');
      }
      const exists = users.some((u) => u.email === normalizedEmail);
      if (exists) {
        throw new Error('E-mail já cadastrado');
      }
      const newUser = { id: Date.now(), name, email: normalizedEmail, password };
      setUsers((prev) => [...prev, newUser]);
      setCurrentUser({ id: newUser.id, name: newUser.name, email: newUser.email });
      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.message || 'Erro ao cadastrar' };
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const normalizedEmail = String(email || '').trim().toLowerCase();
      const user = users.find((u) => u.email === normalizedEmail && u.password === password);
      if (!user) {
        throw new Error('E-mail ou senha inválidos');
      }
      setCurrentUser({ id: user.id, name: user.name, email: user.email });
      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.message || 'Erro ao entrar' };
    } finally {
      setLoading(false);
    }
  };

  const loginWithProvider = async (provider) => {
    setLoading(true);
    try {
      const key = String(provider || '').toLowerCase();
      const isGoogle = key === 'google';
      const email = isGoogle ? 'google-user@dripstore.fake' : 'facebook-user@dripstore.fake';
      const name = isGoogle ? 'Usuário Google' : 'Usuário Facebook';

      let user = users.find((u) => u.email === email);
      if (!user) {
        user = {
          id: Date.now(),
          name,
          email,
          password: null,
          provider: key
        };
        setUsers((prev) => [...prev, user]);
      }

      setCurrentUser({ id: user.id, name: user.name, email: user.email });
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        message:
          (error && error.message) ||
          `Não foi possível entrar com ${provider === 'google' ? 'Google' : 'Facebook'}`
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    register,
    login,
    logout,
    loginWithProvider
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };

