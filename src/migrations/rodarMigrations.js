import migrations from './migrations.js';
import bd from '../configs/baseDeDados.js';

async function rodarMigrations() {
    try {
        const msg = await migrations();
        console.log(msg);
    } catch (e) {
        console.error("Erro nas migrations:", e);
    } finally {
        bd.end();
    }
}

bd.getConnection(async (err, conn) => {
    if (err) {
        console.error("Erro no pool:", err);
        return;
    }

    console.log("Base de dados conectada via pool!");
    conn.release();

    await rodarMigrations();
});