import crypto from 'crypto';

const generateSalt = () => {
    return crypto.randomBytes(16).toString('hex');
};

export const generateKeyWithSalt = (userId, timestamp) => {
    /* timestamp, es la fecha en que se registro el usuario */
    const salt = generateSalt();
    const data = userId + timestamp + salt;

    const hash = crypto.createHash('sha256').update(data).digest('hex');
    return { key: hash, salt: salt };
};