import { Select, Card, Space } from "antd";
import { getAllMonths } from "../../../utils/getAllMonths";
import { useState, useEffect } from "react";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { useAuth } from "../../../contexts/auth";
import { api } from "../../../utils/fetcher";
import { SpendCard } from "../../../components/SpendCard";
import Loader from "../../../components/Loader";

const monthOptions = getAllMonths().map((item) => ({
  label: item.name,
  value: item.number,
}));

export function Relatory() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [monthValue, setMonthValue] = useState(moment().month() + 1);

  const {
    data: lastRegisters,
    error: lastRegistersError,
    isLoading: lastRegistersLoading,
    mutate: fetchLastRegisters,
  } = useSWR<[]>(token ? "/ultimas_despesas_usuario" : null, (url) =>
    api.post(url, { token, mes: monthValue, ano: 2023 })
  );

  function onChange(value) {
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
        <h1>Relatório de gastos</h1>
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder="Selecione um mês"
          filterOption={(input, option) =>
            (option?.label ?? "")
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
          ) : lastRegisters?.length === 0 ? (
            <p>Sem registros disponíveis.</p>
          ) : (
            lastRegisters?.map((item) => (
              <SpendCard item={item} key={item.data} />
            ))
          )}
        </Space>
      </div>
    </div>
  );
}
