import React from "react";
import { Logo } from "../../components/Logo";
import { Form, Input, Checkbox, Button, Space, Alert, Modal } from "antd";
import { SubTitle, Title } from "./styles";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import { CredentialsOutput, endpoints } from "../../config/endpoints";
import type { ModalStaticFunctions } from "antd/es/modal/confirm";
import { api } from "../../utils/fetcher";
import { useAuth } from "../../contexts/auth";

type FormValues = {
  login: string;
  password: string;
  // remember: boolean
};

export function Login() {
  const navigate = useNavigate();
  const { setToken, setRemember, remember } = useAuth();

  const success = (res) => {
    // Salvar a chave res.jwt
    const { jwt } = res;

    if (remember) {
      localStorage.setItem("token", jwt); // Salvar no localStorage
      sessionStorage.setItem("token", jwt); // Salvar no sessionStorage
    } else {
      sessionStorage.setItem("token", jwt); // Salvar no sessionStorage
    }

    setToken(jwt); // Armazenar o JWT no contexto de autenticação
    navigate("/home");
  };

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

  const useLoginMutation = (modal: Omit<ModalStaticFunctions, "warn">) =>
    useSWRMutation(endpoints.login.url, (url, { arg }: { arg: FormValues }) =>
      api.post(url, arg).then(success).catch(error(modal))
    );

  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();
  const { trigger: triggerLogin, isMutating } = useLoginMutation(modal);

  const onChangeRemember = (e) => {
    console.log(e.target.checked);
    setRemember(e.target.checked);
  };

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
        onFinish={triggerLogin}
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
          name="remember"
          valuePropName="checked"
          // wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox onChange={onChangeRemember}>Manter login</Checkbox>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isMutating}
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
      {contextHolder}
    </div>
  );
}
