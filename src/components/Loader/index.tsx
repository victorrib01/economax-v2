import { Spin } from "antd";

export default function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Spin tip="Carregando..." size="large">
        <div className="content" />
      </Spin>
    </div>
  );
}
