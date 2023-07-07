import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Container from "../Container";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  LeftCircleFilled,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useAuth } from "../../contexts/auth";

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
  const { token } = useAuth();
  const { pathname } = location;
  const backButtonActive = pathname.split("/").length > 2;

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

  function goBack() {
    navigate(-1);
  }

  const menuHeight = 46; // Altura do menu em pixels
  const backButtonHeight = 20; // Altura do menu em pixels

  const mainContentStyle = {
    height: `calc(100% - ${menuHeight}px)`,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const mainContentWithBackButtonStyle = {
    ...mainContentStyle,
    height: `calc(100% - ${menuHeight}px - ${backButtonHeight + 16.5}px)`,
  };

  return (
    <Container>
      {backButtonActive && (
        <div
          style={{
            cursor: "pointer",
            width: "100%",
            maxHeight: backButtonHeight + 16.5,

            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "center",

            padding: 8,
          }}
          onClick={() => goBack()}
        >
          <LeftCircleFilled
            style={{
              fontSize: backButtonHeight,
            }}
          />
          <p style={{ marginLeft: "1rem" }}>Voltar</p>
        </div>
      )}
      <div
        style={
          backButtonActive ? mainContentWithBackButtonStyle : mainContentStyle
        }
      >
        {children ?? <Outlet />}
      </div>
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
