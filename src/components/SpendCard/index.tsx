// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { formatCentsToReal } from "../../utils/formatCentsToReal";
interface SpendCardProps {
  item: {
    data: string;
    categoria: string;
    valor: number;
    descricao: string;
  };
}

export function SpendCard({ item }: SpendCardProps) {
  return (
    <Row style={{ width: "100%" }}>
      <Col style={{ width: "100%" }}>
        <Card
          title={item.data}
          style={{ width: "100%" }}
          actions={
            [
              // <DeleteOutlined key="delete" />,
              // <EditOutlined key="edit" />,
            ]
          }
        >
          <p>Categoria: {item.categoria}</p>
          <p>Valor: {formatCentsToReal(item.valor)}</p>
          <p>Descrição: {item.descricao || "Sem descrição"}</p>
        </Card>
      </Col>
    </Row>
  );
}
