import bd from "../../configs/baseDeDados.js";

async function listarProdutosRepository() {
    return new Promise((resolve, reject) => {
        bd.query(
            `
                SELECT * FROM produtos
            `,
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })        
    })
}

async function buscarProdutoPorIdRepository(idProduto) {
    return new Promise((resolve, reject) => {
        bd.query(
            `
                SELECT * FROM produtos WHERE id = ?
            `,
            [idProduto],
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })        
    })
}

async function buscarProdutosRepository(buscar) {
    return new Promise((resolve, reject) => {
        bd.query(
            `
                SELECT * FROM produtos WHERE nome_produto LIKE ? OR descricao LIKE ?
            `,
            [`%${buscar}%`, `%${buscar}%`],
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })        
    })
}

async function cadastrarNovoProdutoRepository(novoProduto) {
    const {nome_produto, descricao, preco, quantidade_estoque} = novoProduto;
    return new Promise((resolve, reject) => {
        bd.query(
            `
                INSERT INTO produtos(nome_produto, descricao, preco, quantidade_estoque)
                VALUES (?, ?, ?, ?)
            `,
            [nome_produto, descricao, preco, quantidade_estoque],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({id: results.insertId, ...novoProduto });
                }
            })        
    })
}

async function atualizarProdutoRepository(idProduto, produtoAtualizado) {
    return new Promise((resolve, reject) => {
        const campos = ["nome_produto", "descricao", "preco", "quantidade_estoque"];
        let consulta = "UPDATE produtos SET";
        let valores = [];

        campos.forEach((campo) => {
        if (produtoAtualizado[campo] !== undefined) {
            consulta += ` ${campo} = ?,`;
            valores.push(produtoAtualizado[campo]);
        }
        });

        consulta = consulta.slice(0, -1);
        consulta += " WHERE id = ?";
        valores.push(idProduto);

        bd.query(consulta, valores, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve({id: idProduto, ...produtoAtualizado});
            }
        });
    });
}

async function deletarProdutoRepository(idProduto) {
  return new Promise((resolve, reject) => {
    bd.query(
      `
      DELETE FROM produtos
      WHERE id = ?  
    `,
      [idProduto],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ message: "Produto deletado com sucesso.", idProduto });
        }
      });
  });
}

export default {
    listarProdutosRepository,
    buscarProdutoPorIdRepository,
    buscarProdutosRepository,
    cadastrarNovoProdutoRepository,
    atualizarProdutoRepository,
    deletarProdutoRepository
}