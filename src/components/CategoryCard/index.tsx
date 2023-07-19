import { Card } from "antd";

import { CloseOutlined } from "@ant-design/icons";
import { Category } from "../../pages/categories/add";

export interface CategoryCardProps {
  item: Category;
  isSelected?: boolean;
  toggleItem?: (category: Category) => void;
}

export function CategoryCard({
  item,
  isSelected = false,
  toggleItem,
}: CategoryCardProps) {
  const clickable = !item?.registered && toggleItem;
  const dynamicStyle = {
    ...(clickable ? { cursor: "pointer" } : {}),
  };
  return (
    <Card
      key={item.id}
      style={dynamicStyle}
      bodyStyle={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
      }}
      onClick={clickable ? () => toggleItem(item) : undefined}
    >
      <div style={isSelected ? { color: "blue" } : { color: "black" }}>
        {item?.registered && `registrado - `}
        {item.name}
      </div>
      {isSelected && <CloseOutlined />}
    </Card>
  );
}
