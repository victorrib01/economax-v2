import { Spin } from "antd";

export default function Loader() {
  return (
    <Spin tip="Loading">
      <div className="content" />
    </Spin>
  );
}
