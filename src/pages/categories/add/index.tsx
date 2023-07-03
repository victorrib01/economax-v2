import { Input, Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { CloseOutlined } from "@ant-design/icons";

interface Category {
  id: number;
  name: string;
  registered?: boolean;
}

export function AddCategories() {
  const [loading, setLoading] = useState<boolean>(true);
  const [input, setInput] = useState<string>("");
  const [allCategories, setAllCategories] = useState<Category[]>([
    {
      id: 1,
      name: "category 1",
    },
    {
      id: 2,
      name: "category 2",
    },
    {
      id: 3,
      name: "category 3",
    },
    {
      id: 4,
      name: "category 4",
    },
    {
      id: 5,
      name: "category 5",
    },
  ]);
  const [registeredCategories, setRegisteredCategories] = useState<Category[]>([
    {
      id: 3,
      name: "category 3",
    },
    {
      id: 5,
      name: "category 5",
    },
  ]);
  const [selectedItems, setSelectedItems] = useState<Category[]>([]);

  // Função para alternar a seleção de um item
  const toggleItem = (category) => {
    // Encontrar o índice do item selecionado na lista de seleção
    const itemIndex = selectedItems.findIndex(
      (item) => item.id === category.id
    );
    // Se o item estiver selecionado (índice diferente de -1)
    if (itemIndex !== -1) {
      // Criar uma cópia da lista de seleção atual
      const updatedItems = [...selectedItems];
      // Remover o item da lista de seleção
      setSelectedItems(updatedItems);
      // Atualizar a lista de seleção
      updatedItems.splice(itemIndex, 1);
    }
    // Caso contrário, se o item não estiver selecionado
    else {
      // Encontrar o objeto do item selecionado na lista de categorias filtradas
      const newItem = filteredCategories.find((item) => {
        return item.id === category.id;
      });

      // Se o objeto do item selecionado existir
      if (newItem) {
        // Adicionar o item à lista de seleção
        setSelectedItems([...selectedItems, newItem]);
      }
    }

    setInput("");
  };

  const filteredCategories = allCategories.filter(filterCategory);

  useEffect(() => {
    filterCategories();
  }, [registeredCategories]);

  function filterCategory(item: Category): boolean {
    if (typeof input !== "string") {
      return true;
    }

    const trimmedInput = input.trim().toLowerCase();
    const lowercaseName = item.name.toLowerCase();

    if (trimmedInput.endsWith(" ")) {
      return lowercaseName.includes(trimmedInput.slice(1, -1));
    }

    return lowercaseName.includes(trimmedInput);
  }

  function filterCategories() {
    setLoading(true);

    const updatedCategories = allCategories
      .map(updateCategory)
      .sort(sortCategories);

    setAllCategories(updatedCategories);
    setLoading(false);
  }

  function updateCategory(categoryItem: Category): Category {
    const isRegistered = registeredCategories.some(
      (userCategoryItem) => userCategoryItem.name === categoryItem.name
    );

    return {
      ...categoryItem,
      registered: isRegistered,
    };
  }

  function sortCategories(a: Category, b: Category): number {
    if (a.registered === b.registered) {
      return a.name.localeCompare(b.name);
    }
    return a.registered ? 1 : -1;
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
          }}
        >
          <h3>Pesquisar categorias criadas</h3>
          <Input onChange={(e) => setInput(e.target.value)} value={input} />

          <div
            id="lista"
            style={{
              overflowY: "auto",
              flexGrow: 1,
              width: "100%",
            }}
          >
            {loading ? (
              <Loader />
            ) : filteredCategories.length === 0 ? (
              <div>
                <p>Nenhuma categoria - {input}</p>
                <p>Criar categoria</p>
              </div>
            ) : (
              filteredCategories.map((item) => {
                const isSelected = selectedItems.some(
                  (selectedItem) => selectedItem.id === item.id
                );
                const categoryExists = allCategories.some(
                  (category) => category.name === input
                );
                const trimmedInput = input.trim();

                if (
                  !categoryExists &&
                  trimmedInput.length > 0 &&
                  !allCategories.some(
                    (category) => category.name === trimmedInput
                  )
                ) {
                  return (
                    <React.Fragment key={item.id}>
                      {filteredCategories.indexOf(item) === 0 && (
                        <div>
                          <p>Nenhuma categoria - {input}</p>
                          <p>Criar categoria</p>
                        </div>
                      )}
                      <CategoryCard
                        item={item}
                        isSelected={isSelected}
                        toggleItem={toggleItem}
                      />
                    </React.Fragment>
                  );
                }

                return (
                  <CategoryCard
                    item={item}
                    isSelected={isSelected}
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
          }}
        >
          <h4>Categorias selcionadas para adicionar a sua lista:</h4>

          <div
            id="lista"
            className="flex flex-col my-2 flex-grow overflow-y-auto h-[80%]"
          >
            {loading ? (
              <Loader />
            ) : selectedItems.length === 0 ? (
              <div>Nenhuma categoria selecionada</div>
            ) : (
              selectedItems.map((item) => (
                <CategoryCard item={item} toggleItem={toggleItem} />
              ))
            )}
          </div>
        </div>
      </div>
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        loading={loading}
        style={{ width: "100%" }}
      >
        {`Cadastrar ${selectedItems.length} nova(s) categoria(s)`}
      </Button>
    </div>
  );
}

function CategoryCard({ item, isSelected = false, toggleItem }) {
  if (item.registered) {
    return (
      <Card
        key={item}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div
          style={
            isSelected
              ? { color: "blue" }
              : { color: "black" } ?? {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }
          }
        >
          Cadastrado - {item.name}
        </div>
        {isSelected && <CloseOutlined />}
      </Card>
    );
  }
  return (
    <Card
      key={item}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
      onClick={() => toggleItem(item)}
    >
      <div
        style={
          isSelected
            ? { color: "blue" }
            : { color: "black" } ?? {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }
        }
      >
        {item.name}
      </div>
      {isSelected && <CloseOutlined />}
    </Card>
  );
}
