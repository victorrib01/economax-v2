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
  return (
    <Card
      key={item.id}
      style={
        toggleItem && {
          cursor: "pointer",
        }
      }
      bodyStyle={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
      }}
      onClick={() => toggleItem && toggleItem(item)}
    >
      <div style={isSelected ? { color: "blue" } : { color: "black" }}>
        {item.name}
      </div>
      {isSelected && <CloseOutlined />}
    </Card>
  );
}
