import produtoServices from "../services/produtoServices.js";

async function listarProdutosController(req, res) {
    try {
        const produtos = await produtoServices.listarProdutosService();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(404).json(error);
    }
}

async function buscarProdutosController(req, res) {
    const { buscar } = req.query;

    try {
        const produtos = await produtoServices.buscarProdutosService(buscar);
        res.status(200).json(produtos);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

async function cadastrarNovoProdutoController(req, res) {
    const novoProduto = req.body;

    try {
        const produto = await produtoServices.cadastrarNovoProdutoService(novoProduto);
        res.status(201).json({produto});
    } catch (error) {
        res.status(409).json(error.message);
    }      
}

async function atualizarProdutoController(req, res) {
    const idProduto = req.params.id;
    const produtoAtualizado = req.body;

    try {
        const produtoEstaAtualizado = await produtoServices.atualizarProdutoService(idProduto, produtoAtualizado);
        res.status(200).json(produtoEstaAtualizado);
    } catch (error) {
        res.status(409).json(error.message);
    }
}

async function deletarProdutoController(req, res) {
    const idProduto = req.params.id;

    try {
        const produtoDeletado = await produtoServices.deletarProdutoService(idProduto);
        res.status(200).json(produtoDeletado);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export default {
    listarProdutosController,
    buscarProdutosController,
    cadastrarNovoProdutoController,
    atualizarProdutoController,
    deletarProdutoController
};