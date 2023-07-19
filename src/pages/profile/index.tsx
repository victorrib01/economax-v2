import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { deleteLocalStorage, getLocalStorage } from "../../utils/localStorage";
import { FeedBackModal } from "../../components/FeedBackModal";

export function Profile() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const signOut = () => {
    setToken(null);
    deleteLocalStorage();
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
        <p>Usuário: {getLocalStorage().name}</p>
      </Card>
      <Button
        type="primary"
        style={{ width: "100%" }}
        onClick={() => signOut()}
      >
        Sair
      </Button>
      {/* <FeedBackModal
        open={true}
        onCreate={() => undefined}
        onCancel={() => undefined}
      /> */}
      <p>v {import.meta.env.VITE_APP_VERSION}</p>
    </div>
  );
}
