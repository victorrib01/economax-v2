import { Logo } from "../../components/Logo";
import { Form, Input, Button, Space, Modal } from "antd";
import { SubTitle, Title } from "./styles";
import useSWRMutation from "swr/mutation";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/fetcher";
import { useAuth } from "../../contexts/auth";
import { LocalStorageItem, setLocalStorage } from "../../utils/localStorage";

interface RegisterResponse {
  Message: string;
  jwt?: string;
}

export function Register() {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [form] = Form.useForm();

  const success = (res: RegisterResponse) => {
    const { jwt } = res;
    const values = form.getFieldsValue();

    if (res["Message"] === "Usuário já existe!") {
      modal.error({
        title: res["Message"],
        content:
          "Devido à um erro de registro, não foi possível autorizar o seu cadastro.",
        centered: true,
        className: "modal-button-ok",
      });
      return;
    } else {
      const localStorageObject: LocalStorageItem = {
        // @ts-ignore
        token: jwt,
        name: values.usuarioBody,
      };

      setLocalStorage(localStorageObject);
    }
    // @ts-ignore
    setToken(jwt); // Armazenar o JWT no contexto de autenticação
    navigate("/home");
  };

  const useRegisterMutation = () =>
    useSWRMutation("/cadastro", (url, { arg }) =>
      // @ts-ignore
      api.post(url, arg).then((res) => success(res))
    );
  const [modal, contextHolder] = Modal.useModal();
  //@ts-ignore
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
      <p>v {import.meta.env.VITE_APP_VERSION}</p>
      {contextHolder}
    </div>
  );
}
