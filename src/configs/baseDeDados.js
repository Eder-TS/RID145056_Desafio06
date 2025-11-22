import mysql from 'mysql2';
import 'dotenv/config';

// Neste ponto o banco de dados já deve ter sido criado no servidor MySQL.
const bd = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
});

export default bd;