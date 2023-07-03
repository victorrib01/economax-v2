import { ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";

import { AuthProvider } from "./contexts/auth";

import { Layout } from "./components/Layout";
import { LayoutPrivate } from "./components/LayoutPrivate";

import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/global";

import { Login } from "./pages/login";
import { Register } from "./pages/register";

import { Home } from "./pages/home";
import { Profile } from "./pages/profile";
import { Lists } from "./pages/lists";
import { Categories } from "./pages/categories";
import { AddCategories } from "./pages/categories/add";

function App() {
  return (
    <ConfigProvider theme={theme}>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<LayoutPrivate />}>
            <Route path="/home" element={<Home />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/categorias" element={<Categories />} />
            <Route path="/categorias/adicionar" element={<AddCategories />} />
            <Route path="/lista" element={<Lists />} />
          </Route>
        </Routes>
        <GlobalStyle />
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
