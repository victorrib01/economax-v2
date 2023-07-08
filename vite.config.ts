import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import tsconfigPaths from "vite-tsconfig-paths";
import EnvironmentPlugin from "vite-plugin-environment";

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [react(), tsconfigPaths(), EnvironmentPlugin({ USE_MSW: "" })],
});
