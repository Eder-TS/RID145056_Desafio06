import bd from '../configs/baseDeDados.js';

export default async function migrations() {
  
    await criarTabelaProdutos();
    await criarTabelaClientes();
    await criarTabelaPedidos();
    await criarTabelaVendas();
    await criarTabelaEnderecos();
    await adicionarChavesEstrangeiras();

    return 'Tabelas criadas e configuradas.';
}

async function criarTabelaProdutos() {
    return new Promise ((resolve, reject) => {
        bd.query(
            `
                CREATE TABLE IF NOT EXISTS produtos 
                ( 
                    id INT AUTO_INCREMENT PRIMARY KEY,  
                    nome_produto VARCHAR(100) NOT NULL UNIQUE,
                    descricao VARCHAR(255) NOT NULL,  
                    preco DECIMAL(8, 2) NOT NULL,
                    quantidade_estoque INT NOT NULL
                )
            `,
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
};

async function criarTabelaClientes() {
    return new Promise ((resolve, reject) => {
        bd.query(
            `
                CREATE TABLE IF NOT EXISTS clientes 
                ( 
                    id INT AUTO_INCREMENT PRIMARY KEY,  
                    nome_cliente VARCHAR(60) NOT NULL,  
                    email_cliente VARCHAR(40) NOT NULL UNIQUE,  
                    telefone_cliente VARCHAR(22) NOT NULL,  
                    endereco1_id INT,  
                    endereco2_id INT,  
                    endereco3_id INT
                ) 
            `,
            (err) => {
                if (err) {
                    reject(err);
                } else {
                   resolve();
                }
            }
        );
    });
};

async function criarTabelaPedidos() {
    return new Promise ((resolve, reject) => {
        bd.query(
            `
                CREATE TABLE IF NOT EXISTS pedidos 
                ( 
                    id INT AUTO_INCREMENT PRIMARY KEY,  
                    numero_pedido INT NOT NULL,  
                    data_pedido TIMESTAMP DEFAULT NOW(),
                    desconto INT NOT NULL DEFAULT '0',  
                    cliente_id INT NOT NULL,  
                    produto_id INT NOT NULL,
                    quantidade_produto INT NOT NULL,
                    total_produto_pedido DECIMAL(8, 2) NOT NULL
                )
           `,
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
};

async function criarTabelaVendas() {
    return new Promise ((resolve, reject) => {
        bd.query(
            `
                CREATE TABLE IF NOT EXISTS vendas 
                ( 
                    id INT AUTO_INCREMENT PRIMARY KEY,  
                    data_venda TIMESTAMP DEFAULT NOW(),  
                    total_venda INT NOT NULL,  
                    meio_pagamento VARCHAR(25) NOT NULL,  
                    pedido_id INT NOT NULL UNIQUE
                ) 
           `,
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
};

async function criarTabelaEnderecos() {
    return new Promise ((resolve, reject) => {
        bd.query(
            `
                CREATE TABLE IF NOT EXISTS enderecos 
                ( 
                    id INT AUTO_INCREMENT PRIMARY KEY,  
                    logradouro VARCHAR(60) NOT NULL,  
                    numero INT NOT NULL,  
                    cep INT NOT NULL,  
                    bairro VARCHAR(60) NOT NULL,  
                    cidade VARCHAR(60) NOT NULL,  
                    uf VARCHAR(2) NOT NULL,  
                    complemento VARCHAR(60),  
                    cliente_id INT NOT NULL  
                )
           `,
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
};

// async function adicionarChavesEstrangeiras() {
//     return new Promise ((resolve, reject) => {
//         bd.query(
//             `
//                 ALTER TABLE clientes 
//                 ADD CONSTRAINT cliente_endereco1_FK 
//                 FOREIGN KEY (endereco1_id) 
//                 REFERENCES enderecos(id)
//            `,
//             (err) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve();
//                 }
//             }
//         );

//         bd.query(
//             `
//                 ALTER TABLE clientes 
//                 ADD CONSTRAINT cliente_endereco2_FK 
//                 FOREIGN KEY (endereco2_id) 
//                 REFERENCES enderecos(id)
//            `,
//             (err) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve();
//                 }
//             }
//         );

//         bd.query(
//             `
//                 ALTER TABLE clientes 
//                 ADD CONSTRAINT cliente_endereco3_FK 
//                 FOREIGN KEY (endereco3_id) 
//                 REFERENCES enderecos(id)
//            `,
//             (err) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve();
//                 }
//             }
//         );

//         bd.query(
//             `
//                 ALTER TABLE pedidos 
//                 ADD CONSTRAINT pedido_cliente_FK 
//                 FOREIGN KEY(cliente_id) 
//                 REFERENCES clientes (id);
//            `,
//             (err) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve();
//                 }
//             }
//         );

//         bd.query(
//             `
//                 ALTER TABLE pedidos 
//                 ADD CONSTRAINT pedido_produto_FK 
//                 FOREIGN KEY(produto_id) 
//                 REFERENCES produtos (id);
//            `,
//             (err) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve();
//                 }
//             }
//         );

//         bd.query(
//             `
//                 ALTER TABLE vendas 
//                 ADD CONSTRAINT venda_pedido_FK 
//                 FOREIGN KEY(pedido_id) 
//                 REFERENCES pedidos (id);
//            `,
//             (err) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve();
//                 }
//             }
//         );

//         bd.query(
//             `
//                 ALTER TABLE enderecos 
//                 ADD CONSTRAINT endereco_cliente_FK 
//                 FOREIGN KEY(cliente_id) 
//                 REFERENCES clientes (id);
//            `,
//             (err) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve();
//                 }
//             }
//         );  
//     });
// };

async function adicionarChavesEstrangeiras() {
    const queries = [
        `
            ALTER TABLE clientes 
            ADD CONSTRAINT cliente_endereco1_FK 
            FOREIGN KEY (endereco1_id) 
            REFERENCES enderecos(id)
        `,
        `
            ALTER TABLE clientes 
            ADD CONSTRAINT cliente_endereco2_FK 
            FOREIGN KEY (endereco2_id) 
            REFERENCES enderecos(id)
        `,
        `
            ALTER TABLE clientes 
            ADD CONSTRAINT cliente_endereco3_FK 
            FOREIGN KEY (endereco3_id) 
            REFERENCES enderecos(id)
        `,
        `
            ALTER TABLE pedidos 
            ADD CONSTRAINT pedido_cliente_FK 
            FOREIGN KEY(cliente_id) 
            REFERENCES clientes (id)
        `,
        `
            ALTER TABLE pedidos 
            ADD CONSTRAINT pedido_produto_FK 
            FOREIGN KEY(produto_id) 
            REFERENCES produtos (id)
        `,
        `
            ALTER TABLE vendas 
            ADD CONSTRAINT venda_pedido_FK 
            FOREIGN KEY(pedido_id) 
            REFERENCES pedidos (id)
        `,
        `
            ALTER TABLE enderecos 
            ADD CONSTRAINT endereco_cliente_FK 
            FOREIGN KEY(cliente_id) 
            REFERENCES clientes (id)
        `
    ];

    for (const sql of queries) {
        await new Promise((resolve, reject) => {
            bd.query(sql, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
};