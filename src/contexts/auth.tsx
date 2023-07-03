import React, { createContext, useContext, useState } from "react";

type AuthContextData = {
  cookies: Object | null;
  setCookies: React.Dispatch<React.SetStateAction<any>>;
};

type AuthContextProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [cookies, setCookies] = useState(null);

  return (
    <AuthContext.Provider value={{ cookies, setCookies }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  const { cookies, setCookies } = context;
  return { cookies, setCookies };
}
