import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { routes } from "./routes";

dotenv.config();

const app = Fastify({ logger: true });

// Registrar CORS e as rotas
app.register(cors);
app.register(routes);

// Definir um tratador de erros global
app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

// Exportar como uma função handler compatível com Vercel (sem app.listen)
export default async (req: any, res: any) => {
  await app.ready(); // Certifique-se de que o Fastify está pronto
  app.server.emit("request", req, res); // Delegar a requisição para o Fastify
};
