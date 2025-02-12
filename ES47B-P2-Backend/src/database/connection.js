const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connect = async () => {
    const maxRetries = process.env.MAX_DB_CONN_RETRIES || 5;
    const maxPoolSize = process.env.DB_POOL_SIZE || 10;
    let retryCount = 0;

    while (retryCount < maxRetries) {
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                dbName: process.env.DB_NAME,
                maxPoolSize: parseInt(maxPoolSize, 10),
            });

            console.log('MongoDB conectado com sucesso');
            return;
        } catch (error) {
            console.log(`Tentativa de conexão ${retryCount + 1} falhou: ${error}`);
            retryCount++;
        }
    }

    console.log(`Número máximo de tentativas (${maxRetries}) excedido. Fechando servidor.`);
    process.exit(1);
};

module.exports = connect;