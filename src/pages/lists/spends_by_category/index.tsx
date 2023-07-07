import { Select, Space, Card } from "antd";
import { getAllMonths } from "../../../utils/getAllMonths";
import { useState, useEffect } from "react";
import moment from "moment-timezone";
import useSWR from "swr";
import { useAuth } from "../../../contexts/auth";
import { api } from "../../../utils/fetcher";
import Loader from "../../../components/Loader";
import { formatCentsToReal } from "../../../utils/formatCentsToReal";

type CategoryData = {
  category: string;
  value: number;
};
type LastRegistersData = Record<string, number>;

const monthOptions = getAllMonths().map((item) => ({
  label: item.name,
  value: item.number,
}));

export function SpendsByCategory() {
  const { token } = useAuth();

  const [monthValue, setMonthValue] = useState<number>(moment().month() + 1);

  const {
    data: lastRegisters,
    error: lastRegistersError,
    isLoading: lastRegistersLoading,
    mutate: fetchLastRegisters,
  } = useSWR(token ? "/gastos_categoria_usuario" : null, (url) =>
    api.post(url, { token, mes: monthValue, ano: 2023 })
  );

  function onChange(value: number) {
    setMonthValue(value);
  }

  useEffect(() => {
    fetchLastRegisters();
  }, [monthValue]);

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: 8,
        }}
      >
        <h1>Gastos por Categoria</h1>
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder="Selecione um mês"
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toString()
              .toLowerCase()
              .includes((input as string).toLowerCase())
          }
          onChange={onChange}
          value={monthValue}
          size="large"
          options={monthOptions}
        />
      </div>
      <div
        style={{
          overflowY: "auto",
          flexGrow: 1,
          width: "100%",
          minHeight: "50%",
        }}
      >
        <Space
          direction="vertical"
          size="middle"
          style={{ display: "flex", height: "100%" }}
        >
          {lastRegistersLoading ? (
            <Loader />
          ) : lastRegistersError ? (
            <p>Erro ao carregar registros.</p>
          ) : Object.entries(lastRegisters || {}).length === 0 ? (
            <p>Sem registros disponíveis.</p>
          ) : (
            lastRegisters?.map((item: CategoryData) => (
              <Card title={item.categoria} key={item.category}>
                <p>{formatCentsToReal(item.total)}</p>
              </Card>
            ))
          )}
        </Space>
      </div>
    </div>
  );
}
