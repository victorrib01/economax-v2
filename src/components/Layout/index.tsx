import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Container from "../Container";
import { useAuth } from "../../contexts/auth";

type LayoutProps = {
  children?: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/home");
  }, [token]);
  return <Container>{children ?? <Outlet />}</Container>;
}
