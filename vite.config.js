import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/loja_diva/", // Nome exato do seu repositório
  plugins: [react()],
});
