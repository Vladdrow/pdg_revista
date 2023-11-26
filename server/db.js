import mysql from "mysql2/promise";
import config from "./config.js";

const db = config.db;

const pool = new mysql.createPool({
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.password,
    database: db.database,
});

pool.getConnection()
    .then((connection) => {
        pool.releaseConnection(connection);
        console.log("DB connection successful");
    })
    .catch((error) => {
        console.error("DB connection error:", error.message);
    });

export default pool;
