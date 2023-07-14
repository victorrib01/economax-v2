import { Form, InputNumber, Input, Select, Button, Divider, Space } from "antd";
import { SpendCard } from "../../components/SpendCard";
import Loader from "../../components/Loader";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { api } from "../../utils/fetcher";
import { useAuth } from "../../contexts/auth";
import { convertToCents } from "../../utils/convertToCents";

type LastRegister = {
  categoria: string;
  data: string;
  descricao: string;
  valor: string;
};

export function Home() {
  const [form] = Form.useForm();
  const { token } = useAuth();

  const {
    data: lastRegisters,
    error: lastRegistersError,
    isLoading: lastRegistersLoading,
    mutate: lastRegistersFetch,
  } = useSWR<LastRegister[]>(
    token ? "/ultimas_5_despesas_usuario" : null, // Verifica se o token existe antes de fazer a chamada
    (url) => api.post(url, { token })
  );

  const {
    data: userCategories,
    error: userCategoriesError,
    isLoading: userCategoriesLoading,
  } = useSWR<[]>(
    token ? "/busca_categorias_despesas_geral_usuario" : null, // Verifica se o token existe antes de fazer a chamada
    (url) => api.post(url, { token })
  );

  const { trigger: registerSpend, isMutating: registerSpendLoading } =
    useSWRMutation(token ? "/cadastro_gastos_usuario" : null, async (url) => {
      const values = form.getFieldsValue();

      await api.post(url, {
        token,
        gastos: [
          {
            id_categoria: values.category,
            valor: `${convertToCents(String(values.value))}`,
            descricao: values.description || "",
          },
        ],
      });

      await lastRegistersFetch();
    });

  const formatValue = (value: string): string => {
    const sanitizedValue = value.replace(/[^0-9]/g, "");
    const floatValue = parseFloat(sanitizedValue) / 100;
    return floatValue.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    const formatted = formatValue(inputValue);
    form.setFieldsValue({ value: `R$ ${formatted}` });
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
        initialValues={{ value: "R$ 0,00" }}
        form={form}
        onFinish={registerSpend}
      >
        <Form.Item name="value">
          <Input
            size="large"
            style={{ width: "100%" }}
            min={0}
            step={1}
            // type="tel"
            // pattern="[0-9]*"
            onChange={handleInputChange}
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
            loading={userCategoriesLoading}
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toLowerCase()
                .includes((input as string).toLowerCase())
            }
            disabled={userCategoriesError}
            size="large"
            options={userCategories?.map((item) => ({
              // @ts-ignore
              value: item.id,
              // @ts-ignore
              label: item.categoria,
            }))}
          />
        </Form.Item>

        <Form.Item name="description">
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
            loading={registerSpendLoading}
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
          height: "50%",
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
          {lastRegistersLoading ? (
            <Loader />
          ) : lastRegistersError ? (
            <p>Erro ao carregar, tente novamente mais tarde.</p>
          ) : (
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              {lastRegisters?.length === 0 ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Sem registros
                </div>
              ) : (
                lastRegisters?.map((item) => (
                  // @ts-ignore
                  <SpendCard item={item} key={item.data} />
                ))
              )}
            </Space>
          )}
        </div>
      </div>
    </div>
  );
}
