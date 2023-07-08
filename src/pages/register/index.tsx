import React from "react";
import { Logo } from "../../components/Logo";
import { Form, Input, Button, Space, Alert, Modal } from "antd";
import { SubTitle, Title } from "./styles";
import useSWRMutation from "swr/mutation";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/fetcher";
import { useAuth } from "../../contexts/auth";

export function Register() {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [form] = Form.useForm();

  const [errorAlert, setErrorAlert] = React.useState(false);
  // @ts-ignore
  const success = (res) => {
    // Salvar a chave res.jwt
    const { jwt } = res;

    sessionStorage.setItem("token", jwt); // Salvar no sessionStorage

    setToken(jwt); // Armazenar o JWT no contexto de autenticação
    navigate("/home");
  };
  // @ts-ignore
  const error = (modal) => (error) => {
    modal.error({
      title: "Usuário ou senha inválidos",
      content:
        "Devido à um erro de autenticação, não foi possível autorizar o seu acesso.",
      centered: true,
      className: "modal-button-ok",
    });
    return;
  };

  const useRegisterMutation = (modal) =>
    useSWRMutation("/cadastro", (url, { arg }) =>
      api.post(url, arg).then(success).catch(error(modal))
    );
  const [modal, contextHolder] = Modal.useModal();
  const { trigger: triggerRegister, isMutating } = useRegisterMutation(modal);

  function valitadePassword(_: any, value: any) {
    const password = form.getFieldValue("senha");
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
      {errorAlert && (
        <Alert
          message="Erro"
          type="warning"
          afterClose={() => setErrorAlert(false)}
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
        onFinish={triggerRegister}
      >
        <Form.Item
          name={"usuarioBody"}
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
          name={"senha"}
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
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isMutating}
            >
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
