import React from "react";
import { Logo } from "../../components/Logo";
import { Form, Input, Checkbox, Button, Space, Alert } from "antd";
import { SubTitle, Title } from "./styles";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  function onFinishFailed(err) {
    setError(true);
    if (!err.values.username || !err.values.password) {
      setErrorMessage("Preencha todos os campos");
    }
    setLoading(false);
  }

  function onSubmit() {
    setLoading(true);
    const values = form.getFieldsValue();

    if (values.username && values.password) {
      navigate("/home");
    }
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {error && (
        <Alert
          message={errorMessage}
          type="warning"
          afterClose={() => setError(false)}
          style={{ marginBottom: "32px" }}
        />
      )}
      <Logo />
      <Title>Login</Title>
      <SubTitle>Preencha os campos abaixo</SubTitle>
      <Form
        name="login"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        style={{ width: "100%" }}
        initialValues={{ remember: true }}
        form={form}
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name={"username"}
          rules={[
            {
              required: true,
              message: "É necessário o preenchimento desse campo",
            },
          ]}
        >
          <Input size="large" placeholder="Usuário" />
        </Form.Item>
        <Form.Item
          name={"password"}
          rules={[
            {
              whitespace: true,
              message: "É necessário o preenchimento desse campo",
            },
          ]}
        >
          <Input.Password size="large" placeholder="Senha" />
        </Form.Item>

        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          // wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
            >
              Login
            </Button>
            <Button size="large" onClick={() => navigate("/register")}>
              Não tem conta? Registre-se
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <p>v 2.0.0</p>
    </div>
  );
}
