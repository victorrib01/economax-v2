import React, { createContext, useContext, useState, useEffect } from "react";

type AuthContextData = {
  token: string | null;
  remember: boolean;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setRemember: React.Dispatch<React.SetStateAction<boolean>>;
};

type AuthContextProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [remember, setRemember] = useState<boolean>(false);

  useEffect(() => {
    const tokenFromSessionStorage = sessionStorage.getItem("token");

    if (tokenFromSessionStorage) {
      setToken(tokenFromSessionStorage);
    } else {
      const tokenFromLocalStorage = localStorage.getItem("token");

      if (tokenFromLocalStorage) {
        setToken(tokenFromLocalStorage);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, remember, setToken, setRemember }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  const { token, remember, setToken, setRemember } = context;
  return { token, remember, setToken, setRemember };
}
