import React from "react";
import { Logo } from "../../components/Logo";
import { Form, Input, Button, Space, Alert } from "antd";
import { SubTitle, Title } from "./styles";
import { useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // const [disabled, setDisabled] = React.useState(true);
  // const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  function onFieldsChange() {
    // const responseForm = form.getFieldValue();
    // const condition =
    //   responseForm?.username !== undefined &&
    //   responseForm?.password !== undefined;
    // if (condition) {
    //   setDisabled(false);
    // } else {
    //   if (!disabled) setDisabled(true);
    // }
  }
  function onFinishFailed(err: any) {
    alert("deu ruim");
    setError(true);
    console.error(err);
    // setLoading(false);
  }

  function onSubmit() {
    // setLoading(true);
    const values = form.getFieldsValue();

    console.log(values);
  }

  function valitadePassword(_: any, value: any) {
    const password = form.getFieldValue("password");
    console.log(value, password);
    if (value && value !== password) {
      return Promise.reject("As senhas não correspondem");
    }
    return Promise.resolve();
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
          message="Erro"
          type="warning"
          afterClose={() => setError(false)}
          style={{ marginBottom: "32px" }}
        />
      )}
      <Logo />
      <Title>Registre-se</Title>
      <SubTitle>Preencha os campos abaixo</SubTitle>
      <Form
        name="login"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        style={{ width: "100%" }}
        initialValues={{ remember: true }}
        form={form}
        onFinish={onSubmit}
        onFieldsChange={onFieldsChange}
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
        <Form.Item
          name={"re-password"}
          rules={[
            {
              whitespace: true,
              message: "É necessário o preenchimento desse campo",
            },
            { validator: valitadePassword },
          ]}
        >
          <Input.Password size="large" placeholder="Repita sua Senha" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" size="large">
              Registrar
            </Button>
            <Button size="large" onClick={() => navigate("/")}>
              Voltar
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <p>v 2.0.0</p>
    </div>
  );
}
