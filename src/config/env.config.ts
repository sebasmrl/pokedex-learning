export const EnvConfiguration = ()=> ({
    environment: process.env.NODE_ENV || 'dev',
    mongodbCnn: process.env.MONGODB_CNN,
    port: process.env.PORT || 3002,
    defaultLimit: +process.env.DEFAULT_LIMIT|| 7,
})