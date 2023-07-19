import { useState, Fragment } from "react";
import { Input, Button, Popconfirm } from "antd";
import useSWR from "swr";
import { useAuth } from "../../../contexts/auth";
import useSWRMutation from "swr/mutation";
import { api } from "../../../utils/fetcher";
import { CategoryCard } from "../../../components/CategoryCard";
import Loader from "../../../components/Loader";
import "./styles.css";
import { useSWRConfig } from "swr";
import { toast } from "react-toastify";

interface ApiCategory {
  id: number;
  categoria: string;
}

export interface Category {
  id: number;
  name: string;
  registered?: boolean;
}

export function AddCategories() {
  const { token } = useAuth();
  const { mutate } = useSWRConfig();

  const [input, setInput] = useState<string>("");

  const [selectedItems, setSelectedItems] = useState<Category[]>([]);

  const { data: registeredCategories, isLoading: loadingRegistered } = useSWR<
    ApiCategory[]
  >(token ? "/busca_categorias_despesas_geral_usuario" : null, (url) =>
    api.post(url, { token })
  );

  const { data: allCategories } = useSWR<ApiCategory[]>(
    "/categorias_despesas_geral",
    (url) => api.get(url)
  );

  const {
    isMutating: assignCategoriesLoading,
    trigger: assignCategoriesTrigger,
  } = useSWRMutation(
    token ? "/cadastro_categorias_usuario" : null,
    async (url) =>
      await api
        .post(url, {
          token,
          categorias: selectedItems.map((item) => ({ id: item.id })),
        })
        .then(() => {
          mutate("/busca_categorias_despesas_geral_usuario");
          mutate("/categorias_despesas_geral");
        })
        .then(() => {
          setSelectedItems([]);
          setInput("");
          toast.success("Categorias cadastradas com sucesso!");
        })
  );

  // Função para alternar a seleção de um item
  const toggleItem = (category: Category) => {
    if (category.registered) return;

    // Encontrar o índice do item selecionado na lista de seleção
    const itemIndex = selectedItems.findIndex(
      (item) => item.id === category.id
    );

    // Se o item estiver selecionado (índice diferente de -1)
    if (itemIndex !== -1) {
      // Criar uma cópia da lista de seleção atual
      const updatedItems = [...selectedItems];
      // Remover o item da lista de seleção
      updatedItems.splice(itemIndex, 1);
      // Atualizar a lista de seleção
      setSelectedItems(updatedItems);
    } else {
      // Encontrar o objeto do item selecionado na lista de categorias filtradas
      const newItem = filteredCategories?.find(
        (item: any) => item.id === category.id
      );
      // Se o objeto do item selecionado existir
      if (newItem) {
        // Adicionar o item à lista de seleção
        setSelectedItems([...selectedItems, newItem]);
      }
    }

    setInput("");
  };

  const formattedAllCategories =
    allCategories
      ?.map((item) => {
        const isRegistered = registeredCategories?.some(
          (userCategoryItem) => userCategoryItem.id === item.id
        );
        return { id: item.id, name: item.categoria, registered: isRegistered };
      })
      //@ts-ignore
      .sort((a, b) => a.registered - b.registered) || [];

  const filteredCategories =
    formattedAllCategories.filter((item) => {
      if (typeof input === "string") {
        // Verifica se input é uma string
        if (input[input.length - 1] === " ") {
          return item.name
            .toLowerCase()
            .includes(input.slice(1, input.length - 1).toLowerCase());
        }
        return item.name.toLowerCase().includes(input.toLowerCase());
      }
      return true; // Retorna true para incluir todos os itens se input não for uma string
    }) || [];

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
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          height: "80%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "45%",
          }}
        >
          <h3>Pesquisar categorias criadas</h3>
          <Input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            style={{ margin: 20 }}
          />

          <div
            id="lista"
            style={{
              overflowY: "auto",
              flexGrow: 1,
              width: "100%",
            }}
          >
            {loadingRegistered ? (
              <Loader />
            ) : filteredCategories.length === 0 ? (
              <CreateCategory input={input} setInput={setInput} />
            ) : (
              filteredCategories.map((item) => {
                const categoryExists = formattedAllCategories.some(
                  (category) => category.name === input
                );
                const trimmedInput = input.trim();

                if (
                  !categoryExists &&
                  trimmedInput.length > 0 &&
                  !formattedAllCategories.some(
                    (category) => category.name === trimmedInput
                  )
                ) {
                  return (
                    <Fragment key={item.id}>
                      {filteredCategories.indexOf(item) === 0 && (
                        <CreateCategory input={input} setInput={setInput} />
                      )}
                      <CategoryCard item={item} toggleItem={toggleItem} />
                    </Fragment>
                  );
                }
                return (
                  <CategoryCard
                    key={item.id}
                    item={item}
                    isSelected={selectedItems.some(
                      (selectedItem) => selectedItem.id === item.id
                    )}
                    toggleItem={toggleItem}
                  />
                );
              })
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "45%",
          }}
        >
          <h4>Categorias selecionadas para adicionar à sua lista:</h4>

          <div
            id="lista"
            style={{
              overflowY: "auto",
              flexGrow: 1,
              width: "100%",
            }}
          >
            {loadingRegistered ? (
              <Loader />
            ) : selectedItems.length === 0 ? (
              <div>Nenhuma categoria selecionada</div>
            ) : (
              selectedItems.map((item) => (
                <CategoryCard
                  key={item.id}
                  item={item}
                  isSelected={true}
                  toggleItem={toggleItem}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <Popconfirm
        title="Desselecionar toda(s) a(s) categoria(s)"
        description="Tem certeza que deseja desselecionar toda(s) a(s) categoria(s)"
        onConfirm={() => setSelectedItems([])}
        // onCancel={() => {}}
        okText="Sim"
        disabled={selectedItems.length === 0}
        cancelText="Não"
      >
        <Button
          type="primary"
          danger
          size="large"
          block
          disabled={selectedItems.length === 0}
        >
          {`Desselecionar toda(s) a(s) categoria(s)`}
        </Button>
      </Popconfirm>
      <Popconfirm
        title={`Cadastrar ${selectedItems.length} nova(s) categoria(s)`}
        description={`Tem certeza que deseja cadastrar ${selectedItems.length} nova(s) categoria(s)`}
        onConfirm={() => assignCategoriesTrigger()}
        // onCancel={() => {}}
        okText="Sim"
        disabled={selectedItems.length <= 0 || assignCategoriesLoading}
        cancelText="Não"
      >
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={loadingRegistered || assignCategoriesLoading}
          block
        >
          {`Cadastrar ${selectedItems.length} nova(s) categoria(s)`}
        </Button>
      </Popconfirm>
    </div>
  );
}

function CreateCategory({ input, setInput }: { input: string; setInput: any }) {
  const { mutate } = useSWRConfig();
  const { token } = useAuth();
  const { isMutating: createCategoryLoading, trigger } = useSWRMutation(
    token ? "/cadastro_categorias" : null,
    async (url) => {
      await api
        .post(url, {
          token,
          categoriaBody: input,
        })
        .then((e) => {
          mutate("/busca_categorias_despesas_geral_usuario");
          mutate("/categorias_despesas_geral");
          return e;
        })
        .then((e) => {
          setInput("");
          toast.success("Categoria criada com sucesso!");

          setTimeout(() => {
            api
              .post("/cadastro_categorias_usuario", {
                token,
                //@ts-ignore
                categorias: [{ id: e?.id }],
              })
              .then((e) => {
                mutate("/busca_categorias_despesas_geral_usuario");
                mutate("/categorias_despesas_geral");
                return e;
              })
              .then((e) => {
                setInput("");
                //@ts-ignore
                toast.success(JSON.stringify(e.message));
              });
          }, 1000);
          console.log("event passado", e);
        });
    }
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
      }}
    >
      <p style={{ padding: 8 }}>Nenhuma categoria - {input}</p>
      <Popconfirm
        title={`Criar categoria ${input}`}
        description={`Tem certeza que deseja criar a categoria ${input}`}
        onConfirm={() => trigger()}
        // onCancel={() => {}}
        disabled={createCategoryLoading}
        okText="Sim"
        cancelText="Não"
      >
        <Button loading={createCategoryLoading} block>
          Criar categoria - {input}
        </Button>
      </Popconfirm>
    </div>
  );
}
