import express from 'express';
import bd from './src/configs/baseDeDados.js';
import 'dotenv/config';
import rodarMigrations from './src/migrations/rodarMigrations.js';


const app = express();
const porta = process.env.PORTA_SERVIDOR;

app.use(express.json());

bd.getConnection(async (err, conn) => {
  if (err) {
    console.error("Erro no pool:", err);
    return;
  }

  console.log("Base de dados conectada via pool!");
  conn.release();
});

app.listen(porta, async () => {
  console.log(`Servidor rodando em http://localhost:${porta}}`);
});