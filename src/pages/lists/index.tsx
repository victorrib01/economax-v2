import { useNavigate } from "react-router-dom";
import { Button, Space, Card } from "antd";
import useSWR from "swr";
import { api } from "../../utils/fetcher";
import { useAuth } from "../../contexts/auth";
import { formatCentsToReal } from "../../utils/formatCentsToReal";
import Loader from "../../components/Loader";

export function Lists() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const {
    data: sumTotalDaySpends,
    error: sumTotalDaySpendsError,
    isLoading: sumTotalDaySpendsLoading,
  } = useSWR(token ? "/soma_total_gastos_por_usuario_por_dia" : null, (url) =>
    api.post(url, { token })
  );

  const {
    data: sumTotalMonthSpends,
    error: sumTotalMonthSpendsError,
    isLoading: sumTotalMonthSpendsLoading,
  } = useSWR(token ? "/soma_total_gastos_por_usuario_por_dia" : null, (url) =>
    api.post(url, { token })
  );

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
        {sumTotalMonthSpendsLoading || sumTotalDaySpendsLoading ? (
          <Loader />
        ) : sumTotalDaySpendsError || sumTotalMonthSpendsError ? (
          <div>Erro tente novamente mais tarde</div>
        ) : (
          <>
            <p>
              Gastos do mês:{" "}
              {formatCentsToReal(
                sumTotalMonthSpends ? sumTotalMonthSpends["Total"] : "0"
              )}
            </p>
            <p>
              Gastos do dia:{" "}
              {formatCentsToReal(
                sumTotalDaySpends ? sumTotalDaySpends["Total"] : "0"
              )}
            </p>
          </>
        )}
      </Card>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Button block onClick={() => navigate("/lista/gastos_por_categoria")}>
          Gastos por categoria
        </Button>
        <Button block onClick={() => navigate("/lista/relatorio")}>
          Relatorio
        </Button>
      </Space>
    </div>
  );
}
