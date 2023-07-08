import useSWR from "swr";
import { Input, Button } from "antd";
import React, { useState } from "react";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { CategoryCard } from "../../components/CategoryCard";
import { api } from "../../utils/fetcher";
import { useAuth } from "../../contexts/auth";

interface Category {
  id: number;
  name: string;
  registered?: boolean;
}

export function Categories() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [input, setInput] = useState<string>("");

  const { data: allCategories, isLoading: loading } = useSWR<
    { id: number; categoria: string }[]
  >(token ? "/busca_categorias_despesas_geral_usuario" : null, (url) =>
    api.post(url, { token })
  );

  const formattedCategories = allCategories?.map((item) => ({
    ...item,
    name: item.categoria,
  }));

  const filteredCategories = formattedCategories?.filter(filterCategory) || [];

  function filterCategory(item: Category): boolean {
    if (typeof input !== "string") {
      return true;
    }

    const trimmedInput = input.trim()?.toLowerCase();
    const lowercaseName = item?.name?.toLowerCase();

    if (trimmedInput.endsWith(" ")) {
      return lowercaseName?.includes(trimmedInput.slice(1, -1));
    }

    return lowercaseName?.includes(trimmedInput);
  }

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
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          height: "80%",
        }}
      >
        <h3
          style={{
            display: "flex",
            width: "100%",
          }}
        >
          Categorias cadastradas
        </h3>
        <Input onChange={(e) => setInput(e.target.value)} value={input} />

        <div
          id="lista"
          style={{
            width: "100%",
            overflowY: "auto",
            flexGrow: 1,
          }}
        >
          {loading ? (
            <Loader />
          ) : filteredCategories?.length === 0 ? (
            <div>Nenhuma categoria - {input}</div>
          ) : (
            filteredCategories?.map((item) => {
              const categoryExists = formattedCategories?.some(
                (category) => category.name === input
              );
              const trimmedInput = input.trim();

              if (
                !categoryExists &&
                trimmedInput.length > 0 &&
                !formattedCategories?.some(
                  (category) => category.name === trimmedInput
                )
              ) {
                return (
                  <React.Fragment key={item.id}>
                    {filteredCategories.indexOf(item) === 0 &&
                      `Nenhuma categoria - ${input}`}
                    <CategoryCard item={item} />
                  </React.Fragment>
                );
              }

              return <CategoryCard key={item.id} item={item} />;
            })
          )}
        </div>
      </div>
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        loading={loading}
        block
        onClick={() => navigate("/categorias/adicionar")}
      >
        Cadastrar nova categoria
      </Button>
      {/* <Result
        status="error"
        title="Pagina sob construção..."
        subTitle="Desculpe, mas a pagina de categorias esta sendo construida."
        // extra={<Button type="primary">Back Home</Button>}
      /> */}
    </div>
  );
}
