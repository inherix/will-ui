import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
     federation({
      name: "beneficiary",
      filename: "remoteEntry.js",
      exposes: {
        "./Routes": "./src/BeneficiaryRoutes.jsx",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
 
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    outDir: "dist",
  },
});
