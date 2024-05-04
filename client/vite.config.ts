import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // depending on your application, base can also be "/"
  base: "/",
  plugins: [react(), viteTsconfigPaths()],
  server: {
    proxy: {
      // Proxying API requests to the backend server running on localhost:5500
      "/api": {
        target: "http://localhost:3010",
        changeOrigin: true,
        secure: false,
      },
    },
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 5173,
  },
});
