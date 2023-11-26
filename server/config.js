export default {
    port: 3010,
    jwtSecret: process.env.JWT_SECRET,
    db: {
        host: process.env.HOST_DB /* '192.168.250.228', */,
        port: 3306,
        user: "root",
        password: "" /* 'revista', */,
        database: "Guia_Empresarial_1",
    },
};
