import { Router } from "express";
import produtoControllers from "../controllers/produtoControllers.js";

const router = Router();

router.get('/', produtoControllers.listarProdutosController);

router.get('/busca', produtoControllers.buscarProdutosController);

router.post('/', produtoControllers.cadastrarNovoProdutoController);

router.patch('?idProduto', produtoControllers.atualizarProdutoController);

router.delete('/id', produtoControllers.deletarProdutoController);

export default router;