const JWT_SECRET_STR =
    "0f350ee0f7fae11cf9bd517f2db0a510353e17f37fc0658fd9f76fb604c6631899f2cd05d9e1fcd08a30ba0e31270325693c3b1ae247f83077a57b6fb6462d00"; /* = config.jwtSecret; */
/* import jwt from "jsonwebtoken";
    
const authenticateJWT = (req, res, next) => {
    
    const token = req.cookies['jwt'];
    
    if (token) {
        jwt.verify(token, JWT_SECRET_STR, (err, user) => {
            if (err) return res.sendStatus(403); // Token no válido o expirado
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401); // No se encontró token, no autorizado
    }
};
export default authenticateJWT; */
import jwt from "jsonwebtoken";

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET_STR, (err, user) => {
            if (err) return res.sendStatus(403); // Token no válido o expirado
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401); // No se encontró token, no autorizado
    }
};

export default authenticateJWT;
