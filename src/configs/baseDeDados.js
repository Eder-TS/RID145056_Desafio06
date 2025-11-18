import sqlite3 from 'sqlite3'

const bd = new sqlite3.Database('bd_dncommerce.db', (erro) => {
    if (erro) {
        console.log('Erro ao conectar a base de dados.', erro.message)
    } else {
        console.log('Base de dados DNC Commerce conectada.')
    }
})

export default async function iniciarBd() {
    return new Promise ((resolve, reject) => {
        bd.run(
            `
                CREATE TABLE ecommerce (column TEXT)
            `,
            (err) => {
                if (err) {
                    if (err.message === 'SQLITE_ERROR: table ecommerce already exists') {
                        reject({message: 'Tabela ecommerce já existe, banco de dados já está operacional.'});
                    } else {
                        reject({message: `Comunique o suporte, ${err.message} `})
                    }
                } else {
                    resolve({message: 'Tabela criada com sucesso.'});
                }
            }
        );
    });
};