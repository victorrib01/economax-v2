// import { Input, Button, Popconfirm } from "antd";
// import { useEffect, useState, Fragment } from "react";
// import Loader from "../../../components/Loader";
// import "./styles.css";
// import { CategoryCard } from "../../../components/CategoryCard";
export interface Category {
  id: number;
  name: string;
  registered?: boolean;
}

export function AddCategories() {
  // const [loading, setLoading] = useState<boolean>(true);
  // const [input, setInput] = useState<string>("");
  // const [allCategories, setAllCategories] = useState<Category[]>([]);
  // const [registeredCategories, setRegisteredCategories] = useState<Category[]>(
  //   []
  // );
  // const [selectedItems, setSelectedItems] = useState<Category[]>([]);

  // // Função para alternar a seleção de um item
  // const toggleItem = (category: Category) => {
  //   // Encontrar o índice do item selecionado na lista de seleção
  //   const itemIndex = selectedItems.findIndex(
  //     (item) => item.id === category.id
  //   );

  //   // Se o item estiver selecionado (índice diferente de -1)
  //   if (itemIndex !== -1) {
  //     // Criar uma cópia da lista de seleção atual
  //     const updatedItems = [...selectedItems];
  //     // Remover o item da lista de seleção
  //     updatedItems.splice(itemIndex, 1);
  //     // Atualizar a lista de seleção
  //     setSelectedItems(updatedItems);
  //   }
  //   // Caso contrário, se o item não estiver selecionado
  //   else {
  //     // Encontrar o objeto do item selecionado na lista de categorias filtradas
  //     const newItem = filteredCategories.find(
  //       (item) => item.id === category.id
  //     );

  //     // Se o objeto do item selecionado existir
  //     if (newItem) {
  //       // Adicionar o item à lista de seleção
  //       setSelectedItems([...selectedItems, newItem]);
  //     }
  //   }

  //   setInput("");
  // };

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
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "space-around",
    //     alignItems: "center",
    //     flexDirection: "column",
    //     height: "100%",
    //     width: "90%",
    //   }}
    // >
    //   <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "space-around",
    //       alignItems: "center",
    //       flexDirection: "column",
    //       width: "100%",
    //       height: "80%",
    //     }}
    //   >
    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //         width: "100%",
    //         height: "45%",
    //       }}
    //     >
    //       <h3>Pesquisar categorias criadas</h3>
    //       <Input onChange={(e) => setInput(e.target.value)} value={input} />

    //       <div
    //         id="lista"
    //         style={{
    //           overflowY: "auto",
    //           flexGrow: 1,
    //           width: "100%",
    //         }}
    //       >
    //         {loading ? (
    //           <Loader />
    //         ) : filteredCategories.length === 0 ? (
    //           <CreateCategory input={input} />
    //         ) : (
    //           filteredCategories.map((item) => {
    //             const categoryExists = allCategories.some(
    //               (category) => category.name === input
    //             );
    //             const trimmedInput = input.trim();

    //             if (
    //               !categoryExists &&
    //               trimmedInput.length > 0 &&
    //               !allCategories.some(
    //                 (category) => category.name === trimmedInput
    //               )
    //             ) {
    //               return (
    //                 <Fragment key={item.id}>
    //                   {filteredCategories.indexOf(item) === 0 && (
    //                     <CreateCategory input={input} />
    //                   )}
    //                   <CategoryCard item={item} />
    //                 </Fragment>
    //               );
    //             }
    //             return (
    //               <CategoryCard
    //                 key={item.id}
    //                 item={item}
    //                 isSelected={selectedItems.some(
    //                   (selectedItem) => selectedItem.id === item.id
    //                 )}
    //                 toggleItem={toggleItem}
    //               />
    //             );
    //           })
    //         )}
    //       </div>
    //     </div>

    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         width: "100%",
    //         height: "45%",
    //       }}
    //     >
    //       <h4>Categorias selecionadas para adicionar à sua lista:</h4>

    //       <div
    //         id="lista"
    //         style={{
    //           overflowY: "auto",
    //           flexGrow: 1,
    //           width: "100%",
    //         }}
    //       >
    //         {loading ? (
    //           <Loader />
    //         ) : selectedItems.length === 0 ? (
    //           <div>Nenhuma categoria selecionada</div>
    //         ) : (
    //           selectedItems.map((item) => (
    //             <CategoryCard
    //               key={item.id}
    //               item={item}
    //               toggleItem={toggleItem}
    //             />
    //           ))
    //         )}
    //       </div>
    //     </div>
    //   </div>
    //   <Popconfirm
    //     title="Desselecionar toda(s) a(s) categoria(s)"
    //     description="Tem certeza que deseja desselecionar toda(s) a(s) categoria(s)"
    //     onConfirm={() => setSelectedItems([])}
    //     // onCancel={() => {}}
    //     okText="Sim"
    //     cancelText="Não"
    //   >
    //     <Button
    //       type="primary"
    //       danger
    //       size="large"
    //       disabled={selectedItems.length < 0}
    //       block
    //     >
    //       {`Desselecionar toda(s) a(s) categoria(s)`}
    //     </Button>
    //   </Popconfirm>
    //   <Button
    //     type="primary"
    //     htmlType="submit"
    //     size="large"
    //     loading={loading}
    //     block
    //   >
    //     {`Cadastrar ${selectedItems.length} nova(s) categoria(s)`}
    //   </Button>
    // </div>
    <p>te</p>
  );
}

// function CreateCategory({ input }: { input: string }) {
//   return (
//     <div>
//       <p>Nenhuma categoria - {input}</p>
//       <p>Criar categoria</p>
//     </div>
//   );
// }
