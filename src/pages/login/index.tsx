import { Logo } from "../../components/Logo";
import { Form, Input, Checkbox, Button, Space, Modal } from "antd";
import { SubTitle, Title } from "./styles";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import { endpoints } from "../../config/endpoints";
import type { ModalStaticFunctions } from "antd/es/modal/confirm";
import { api } from "../../utils/fetcher";
import { useAuth } from "../../contexts/auth";
import { LocalStorageItem, setLocalStorage } from "../../utils/localStorage";

type FormValues = {
  login: string;
  password: string;
  // remember: boolean
};

export function Login() {
  const navigate = useNavigate();
  const { setToken, setRemember } = useAuth();
  // @ts-ignore
  const success = (res) => {
    // Salvar a chave res.jwt
    const { jwt } = res;
    const values = form.getFieldsValue();

    if (res["Message"] !== "Usuário autenticado com sucesso!") {
      modal.error({
        title: "Usuário ou senha inválidos",
        content:
          "Devido à um erro de autenticação, não foi possível autorizar o seu acesso.",
        centered: true,
        className: "modal-button-ok",
      });
      return;
    } else if (values.remember) {
      const localStorageObject: LocalStorageItem = {
        token: jwt,
        name: values.usuarioBody,
      };

      setLocalStorage(localStorageObject);
    }

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

  const useLoginMutation = (modal: Omit<ModalStaticFunctions, "warn">) =>
    useSWRMutation(endpoints.login.url, (url, { arg }: { arg: FormValues }) =>
      api.post(url, arg).then(success).catch(error(modal))
    );

  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();
  const { trigger: triggerLogin, isMutating } = useLoginMutation(modal);
  // @ts-ignore
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
          <Input size="large" placeholder="Usuário" autoCapitalize="none" />
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
      <p>v {import.meta.env.VITE_APP_VERSION}</p>
      {contextHolder}
    </div>
  );
}
