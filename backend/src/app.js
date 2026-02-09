import express from "express";

const app = express(); // Crear una aplicación de Express

app.use(express.json()); // Middleware para parsear JSON en las solicitudes

// Importar rutas

import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

// Declaración de rutas

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// Ejemplo de ruta raiz: http://localhost:4000/api/v1/users/register

export default app;