import produtoRepositories from "../repositories/produtoRepositories.js";

async function listarProdutosService() {
    return await produtoRepositories.listarProdutosRepository();
}

async function buscarProdutosService(buscar) {
    if (!buscar) return await produtoRepositories.listarProdutosRepository();

    const produtos = await produtoRepositories.buscarProdutosRepository(buscar);
    if (!produtos || produtos.length === 0) throw new Error('Nenhum produto encontrado.')
    
    return produtos;
}

async function cadastrarNovoProdutoService(novoProduto) {
    if (novoProduto.nome_produto === '') throw new Error('É necessário inserir um nome para o produto.');
    if (novoProduto.descricao === '') throw new Error('É necessário inserir uma descrição do produto.');
    if (novoProduto.preco < 0 || novoProduto.preco !== Number) throw new Error('Preço deve ser um número maior ou igual a zero.');
    if (novoProduto.quantidade_estoque < 0 || novoProduto.quantidade_estoque !== Number) throw new Error('Quantidade deve ser um número maior ou igual a zero.');    

    const buscarNomeProduto = novoProduto.nome_produto;
    const produtoExiste = await produtoRepositories.buscarProdutosRepository(buscarNomeProduto);
    if (produtoExiste && produtoExiste.length > 0) throw new Error(`O produto ${buscarNomeProduto} já existe na base de dados.`);

    const produtoCadastrado = await produtoRepositories.cadastrarNovoProdutoRepository(novoProduto);
    return produtoCadastrado;
}

async function atualizarProdutoService(idProduto, produtoAtualizado) {
    if (produtoAtualizado.nome_produto === '') throw new Error('É necessário inserir um nome para o produto.');

    if (produtoAtualizado.descricao === '') throw new Error('É necessário inserir uma descrição do produto.');
    
    if (produtoAtualizado.preco) {
        if (produtoAtualizado.preco < 0 || produtoAtualizado.preco === NaN) throw new Error('Preço deve ser um número maior ou igual a zero.');
    }

    if (produtoAtualizado.quantidade_estoque) {
        if (produtoAtualizado.quantidade_estoque < 0 || produtoAtualizado.quantidade_estoque === NaN) throw new Error('Quantidade deve ser um número maior ou igual a zero.');
    }

    if (produtoAtualizado.nome_produto) {
        const novoNomeProduto = produtoAtualizado.nome_produto;
        const nomeProdutoJaExiste = await produtoRepositories.buscarProdutosRepository(novoNomeProduto);
        if (nomeProdutoJaExiste) throw new Error('Já existe um produto com este nome.', nomeProdutoJaExiste.id);
    }

    const produtoExiste = await produtoRepositories.buscarProdutoPorIdRepository(idProduto);
    if (!produtoExiste) throw new Error('Id do produto inválida.');

    const produtoEstaAtualizado = await produtoRepositories.atualizarProdutoRepository(idProduto, produtoAtualizado);
    return produtoEstaAtualizado;
}

async function deletarProdutoService(idProduto) {
    const produtoExiste = await produtoRepositories.buscarProdutoPorIdRepository(idProduto);
    if (!produtoExiste) throw new Error('Id não existe na base de dados.');

    const produtoDeletado = await produtoRepositories.deletarProdutoRepository(idProduto);
    return produtoDeletado;
}

export default {
    listarProdutosService,
    buscarProdutosService,
    cadastrarNovoProdutoService,
    atualizarProdutoService,
    deletarProdutoService
};