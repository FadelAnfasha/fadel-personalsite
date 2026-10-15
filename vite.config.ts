import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Simple YAML loader plugin for ?raw queries
const yamlRawPlugin = {
  name: "yaml-raw",
  async transform(_code: string, id: string) {
    if (id.includes("?raw") && id.endsWith(".yaml")) {
      const filepath = id.split("?")[0];
      const fs = await import("fs");
      const content = fs.readFileSync(filepath, "utf-8");
      return {
        code: `export default ${JSON.stringify(content)};`,
        map: null,
      };
    }
  },
};

export default defineConfig({
  plugins: [react(), yamlRawPlugin, tailwindcss()],
  assetsInclude: ["**/*.glb"], // <--- Ditambahkan di sini
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
