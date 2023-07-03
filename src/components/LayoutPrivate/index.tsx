import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Container from "../Container";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

type MenuItem = {
  label: string;
  key: string;
  icon: React.ReactNode;
  path: string;
};

type LayoutProps = {
  children?: React.ReactNode;
};

const items: MenuItem[] = [
  {
    label: "Home",
    key: "home",
    icon: <MailOutlined />,
    path: "/home",
  },
  {
    label: "Categorias",
    key: "categories",
    icon: <AppstoreOutlined />,
    path: "/categorias",
  },
  {
    label: "Lista",
    key: "list",
    icon: <UnorderedListOutlined />,
    path: "/lista",
  },
  {
    label: "Perfil",
    key: "profile",
    icon: <SettingOutlined />,
    path: "/perfil",
  },
];

export function LayoutPrivate({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const getMenuSelectedKey = (pathname: string) => {
    for (const item of items) {
      if (pathname.includes(item.path)) {
        return item.key;
      }
    }
    return "home"; // Defina uma chave de item padrão caso não corresponda a nenhum dos casos acima
  };

  const selectedKey = getMenuSelectedKey(pathname);

  const onClick = (e: { key: React.Key }) => {
    const key = e.key as string;
    const item = items.find((item) => item.key === key);
    if (item) {
      navigate(item.path);
    }
  };

  const menuHeight = 46; // Altura do menu em pixels

  const mainContentStyle = {
    height: `calc(100% - ${menuHeight}px)`,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Container>
      <div style={mainContentStyle}>{children ?? <Outlet />}</div>
      <Menu
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onClick={onClick}
        selectedKeys={[selectedKey]}
        mode="horizontal"
        items={items}
      />
    </Container>
  );
}
