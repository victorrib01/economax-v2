import { useNavigate } from "react-router-dom";
import { Button, Space, Card } from "antd";

export function Lists() {
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
      <Card
        title="Resumo"
        style={{
          width: "100%",
          display: "flex",
          //   alignItems: "center",
          //   justifyContent: "center",
          flexDirection: "column",
        }}
        headStyle={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>Gastos do mês: R$ 0,00</p>
        <p>Gastos do dia: R$ 0,00</p>
      </Card>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Button block>Gastos por categoria</Button>
        <Button block>Relatorio</Button>
      </Space>
    </div>
  );
}
