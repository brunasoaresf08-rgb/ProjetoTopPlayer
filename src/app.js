// const express = require("express");
import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();
app.use(express.json()); //Formato JSON
app.use(cors()); // Conexao back com front

app.get("/", (req,res)=>{
    res.json({mensagem: "Hello World!"})
})

app.use("/usuarios", usuarioRoutes);

export default app