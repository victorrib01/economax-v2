import React from "react";
import {
  Form,
  InputNumber,
  Input,
  Select,
  Button,
  Divider,
  Card,
  Col,
  Row,
  Space,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export function Home() {
  const [form] = Form.useForm();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  function onFinishFailed(err: any) {
    setError(true);
    setLoading(false);
  }

  function onSubmit() {
    setLoading(true);
    const values = form.getFieldsValue();

    console.log(values);
  }

  const handleSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onChange = (value: number | string) => {
    console.log("changed", value);
  };

  const formatCurrency = (value: number) => {
    const integerPart = Math.floor(value / 100);
    const decimalPart = value % 100;

    let formattedValue = `R$ ${integerPart},`;

    if (decimalPart < 10) {
      formattedValue += `0${decimalPart}`;
    } else {
      formattedValue += decimalPart;
    }

    return formattedValue;
  };

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
      <Form
        name="login"
        style={{ width: "100%" }}
        initialValues={{ value: 0.0 }}
        form={form}
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name="value">
          <InputNumber
            size="large"
            style={{ width: "100%" }}
            onChange={onChange}
            min={0}
            step={1}
            formatter={formatCurrency}
            parser={(value) =>
              (value as string).replace(/[\D]/g, "").replace("R$ ", "")
            }
          />
        </Form.Item>
        <Form.Item
          name="category"
          rules={[
            {
              required: true,
              message: "É necessário o preenchimento desse campo",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Selecione uma categoria"
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toLowerCase()
                .includes((input as string).toLowerCase())
            }
            onChange={handleSelectChange}
            size="large"
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Input.TextArea
            rows={2}
            placeholder="Descrição"
            maxLength={100}
            showCount
            style={{ marginBottom: 15 }}
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            style={{ width: "100%" }}
          >
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <div
        style={{
          width: "100%",
          height: "40%",
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p style={{ marginBottom: 12 }}>Últimos 5 registros</p>
        <div
          style={{
            overflowY: "auto",
            flexGrow: 1,
            width: "100%",
          }}
        >
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 2, 34, 5, 6, 2, 34].map(() => (
              <Row style={{ width: "100%" }}>
                <Col style={{ width: "100%" }}>
                  <Card
                    title="14:19:39 13/06/2023"
                    style={{ width: "100%" }}
                    actions={[
                      <DeleteOutlined key="delete" />,
                      <EditOutlined key="edit" />,
                    ]}
                  >
                    <p>vivo jhe</p>
                    <p>R$ 14,75</p>
                  </Card>
                </Col>
              </Row>
            ))}
          </Space>
        </div>
      </div>
    </div>
  );
}
