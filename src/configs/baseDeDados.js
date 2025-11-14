import sqlite3 from 'sqlite3'

const bd = new sqlite3.Database('bd_dncommerce.db', (erro) => {
    if (erro) {
        console.log('Erro ao conectar a base de dados.', erro.message)
    } else {
        console.log('Base de dados DNC Commerce conectada.')
    }
})

export default bd;