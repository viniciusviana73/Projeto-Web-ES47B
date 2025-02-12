const expressRedisCache = require('express-redis-cache');

const cache = expressRedisCache({
    host: 'localhost',
    port: 6379,
});

const invalidateCache = (key) => {
    return (req, res, next) => {
        cache.del(key, (err, count) => {
            if (err) {
                console.error(`Erro ao invalidar cache para chave ${key}:`, err);
            }
            console.log(`\n\nCACHE DELETADO: '${key}'.. Prosseguindo`);
            next();
        });
    };
};

module.exports = { invalidateCache, cache };