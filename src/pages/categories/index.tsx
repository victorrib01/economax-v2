import {
  // Input,
  // Button,
  Result,
} from "antd";
// import React, { useEffect, useState } from "react";
// import Loader from "../../components/Loader";
// import { useNavigate } from "react-router-dom";
// import { CategoryCard } from "../../components/CategoryCard";

// interface Category {
//   id: number;
//   name: string;
//   registered?: boolean;
// }

export function Categories() {
  // const navigate = useNavigate();

  // const [loading, setLoading] = useState<boolean>(true);
  // const [input, setInput] = useState<string>("");
  // const [allCategories, setAllCategories] = useState<Category[]>([
  //   {
  //     id: 1,
  //     name: "category 1",
  //   },
  //   {
  //     id: 2,
  //     name: "category 2",
  //   },
  // ]);
  // const [registeredCategories, setRegisteredCategories] = useState<Category[]>(
  //   []
  // );
  // //   const [selectedItems, setSelectedItems] = useState<Category[]>([]);

  // const filteredCategories = allCategories.filter(filterCategory);

  // useEffect(() => {
  //   filterCategories();
  // }, [registeredCategories]);

  // function filterCategory(item: Category): boolean {
  //   if (typeof input !== "string") {
  //     return true;
  //   }

  //   const trimmedInput = input.trim().toLowerCase();
  //   const lowercaseName = item.name.toLowerCase();

  //   if (trimmedInput.endsWith(" ")) {
  //     return lowercaseName.includes(trimmedInput.slice(1, -1));
  //   }

  //   return lowercaseName.includes(trimmedInput);
  // }

  // function filterCategories() {
  //   setLoading(true);

  //   const updatedCategories = allCategories
  //     .map(updateCategory)
  //     .sort(sortCategories);

  //   setAllCategories(updatedCategories);
  //   setLoading(false);
  // }

  // function updateCategory(categoryItem: Category): Category {
  //   const isRegistered = registeredCategories.some(
  //     (userCategoryItem) => userCategoryItem.name === categoryItem.name
  //   );

  //   return {
  //     ...categoryItem,
  //     registered: isRegistered,
  //   };
  // }

  // function sortCategories(a: Category, b: Category): number {
  //   if (a.registered === b.registered) {
  //     return a.name.localeCompare(b.name);
  //   }
  //   return a.registered ? 1 : -1;
  // }
  // useEffect(() => {
  //   const categories = Array.from({ length: 100 }, (_, index) => ({
  //     id: index + 1,
  //     name: `Category ${index + 1}`,
  //   }));

  //   setAllCategories(categories);
  // }, []);
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
      {/* <div
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
          ) : filteredCategories.length === 0 ? (
            <div>Nenhuma categoria - {input}</div>
          ) : (
            filteredCategories.map((item) => {
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
                    {filteredCategories.indexOf(item) === 0 &&
                      `Nenhuma categoria - ${input}`}
                    <CategoryCard item={item} />
                  </React.Fragment>
                );
              }

              return <CategoryCard item={item} />;
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
      </Button> */}
      <Result
        status="error"
        title="Pagina sob construção..."
        subTitle="Desculpe, mas a pagina de categorias esta sendo construida."
        // extra={<Button type="primary">Back Home</Button>}
      />
    </div>
  );
}
