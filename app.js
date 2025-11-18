import express from 'express';
import iniciarBd from './src/configs/baseDeDados.js';


const app = express();
const porta = 3000;

app.use(express.json());

app.listen(porta, async () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);

  try {
    await iniciarBd();
  } catch (error) {
    console.log(error);
  }
  
});