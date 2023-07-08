import { Input, Button, Popconfirm, Result } from "antd";
import { useEffect, useState, Fragment } from "react";
import Loader from "../../../components/Loader";
import "./styles.css";
import useSWR from "swr";
import { CategoryCard } from "../../../components/CategoryCard";
import { useAuth } from "../../../contexts/auth";
import { api } from "../../../utils/fetcher";
export interface Category {
  id: number;
  name: string;
  registered?: boolean;
}

export function AddCategories() {
  const { token } = useAuth();
  const [input, setInput] = useState<string>("");

  const [selectedItems, setSelectedItems] = useState<Category[]>([]);

  const { data: allCategories, isLoading: loading } = useSWR<
    { id: number; categoria: string }[]
  >(token ? "/busca_categorias_despesas_geral_usuario" : null, (url) =>
    api.post(url, { token })
  );
  const { data: registeredCategories, isLoading: registeredCategoriesLoading } =
    useSWR<any[]>("/categorias_despesas_geral", (url) => api.get(url));
  console.log("registeredCategories", registeredCategories);
  console.log("allCategories", allCategories);

  // Função para alternar a seleção de um item
  const toggleItem = (category: Category) => {
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
    }
    // Caso contrário, se o item não estiver selecionado
    else {
      // Encontrar o objeto do item selecionado na lista de categorias filtradas
      const newItem = filteredCategories.find(
        (item) => item.id === category.id
      );

      // Se o objeto do item selecionado existir
      if (newItem) {
        // Adicionar o item à lista de seleção
        setSelectedItems([...selectedItems, newItem]);
      }
    }

    setInput("");
  };

  // const filteredCategories = allCategories.filter(filterCategory);

  // function filterCategories() {
  //   const updatedCategories = allCategories
  //     .map(updateCategory)
  //     .sort(sortCategories);
  //   return updatedCategories;
  // }

  // function updateCategory(categoryItem: any): any {
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

  return (
    <Result
      status="error"
      title="Pagina sob construção..."
      subTitle="Desculpe, mas a pagina de categorias esta sendo construida."
      // extra={<Button type="primary">Back Home</Button>}
    />
  );
}

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
//         {/* {loading ? (
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
//         )} */}
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
function CreateCategory({ input }: { input: string }) {
  return (
    <div>
      <p>Nenhuma categoria - {input}</p>
      <p>Criar categoria</p>
    </div>
  );
}
