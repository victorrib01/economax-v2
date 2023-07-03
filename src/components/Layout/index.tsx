import { Outlet } from "react-router-dom";
import Container from "../Container";

type LayoutProps = {
  children?: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return <Container>{children ?? <Outlet />}</Container>;
}
