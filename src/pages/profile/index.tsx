import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const navigate = useNavigate();

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
        onClick={() => navigate("/")}
      >
        Sair
      </Button>
      <p>v 2.0.0</p>
    </div>
  );
}
