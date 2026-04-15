import express from "express";
import usuarioRouter from "./routes/usuarioRoutes.js";
import jogosRouter from "./routes/jogosRoutes.js";
import playersRoutes from "./routes/playersRoutes.js";
import rankingRoutes from './routes/rankingRoutes.js';
import partidasRoutes from "./routes/partidasRoutes.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";

import cors from "cors";


const app = express();
app.use(cors());

app.get("/", (req, res)=>{
    res.status(200).json({ ok: true, api: "Top Players API" });
}); 


app.use(express.json());
app.use("/usuarios", usuarioRouter);
app.use("/jogos", jogosRouter);
app.use("/players", playersRoutes);
app.use("/rankings", rankingRoutes);
app.use("/partidas", partidasRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;