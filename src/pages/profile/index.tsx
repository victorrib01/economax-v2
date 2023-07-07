import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

export function Profile() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const signOut = () => {
    setToken(null);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        width: "90%",
      }}
    >
      <Card style={{ width: "100%" }}>
        <p>Usuário: Teste</p>
      </Card>
      <Button
        type="primary"
        style={{ width: "100%" }}
        onClick={() => signOut()}
      >
        Sair
      </Button>
      <p>v 2.0.0</p>
    </div>
  );
}
