import React, { createContext, useContext, useState, useEffect } from "react";
import { getLocalStorage } from "../utils/localStorage";

type AuthContextData = {
  username: string | null;
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
  const [username, setUsername] = useState<string | null>(null);
  const [remember, setRemember] = useState<boolean>(false);

  useEffect(() => {
    const tokenFromLocalStorage = getLocalStorage();

    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage.token);
      setUsername(tokenFromLocalStorage.name);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ username, token, setToken, remember, setRemember }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  const { username, token, remember, setToken, setRemember } = context;
  return { username, token, remember, setToken, setRemember };
}
