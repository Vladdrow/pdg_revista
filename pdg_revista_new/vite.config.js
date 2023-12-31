import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: "0.0.0.0",
        https: {
            key: fs.readFileSync("../server/localhost-key.pem"),
            cert: fs.readFileSync("../server/localhost.pem"),
        },
    },
});

/* key: fs.readFileSync(path.resolve(__dirname, "./localhost-key.pem")),
    cert: fs.readFileSync(path.resolve(__dirname, "./localhost.pem")), */
