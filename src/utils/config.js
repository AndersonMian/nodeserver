require('dotenv').config()

const envVariables = process.env

const config = {
    apiPath : envVariables.API_PATH,

    dbHost : 
        envVariables.ENV === 'PROD' 
        ? envVariables.DB_URL_PROD 
        : envVariables.DB_URL_DEV,

    dbName: 
        envVariables.ENV === 'PROD' 
        ? envVariables.DB_NAME_PROD 
        : envVariables.DB_NAME_DEV,

    dbUserName :
        envVariables.ENV === 'PROD' 
        ? envVariables.DB_USERNAME_PROD 
        : envVariables.DB_USERNAME_DEV,

    dbUserPassword:
        envVariables.ENV === 'PROD' 
        ? envVariables.DB_PASSWORD_PROD 
        : envVariables.DB_PASSWORD_DEV,

    dbPort:
        envVariables.ENV === 'PROD' 
        ? envVariables.DB_PORT_PROD 
        :envVariables.DB_PORT_DEV,

    appName: envVariables.API_NAME,

    serverhost: 
        envVariables.ENV === 'PROD'
        ? envVariables.SERVER_HOST_PROD
        :envVariables.SERVER_HOST_DEV,

    serverport:
        envVariables.ENV === 'PROD'
        ? envVariables.SERVER_PORT_PROD
        :envVariables.SERVER_PORT_DEV,
    

    jwt: {
        secret: envVariables.JWT_SECRET,
        public: envVariables.JWT_PUBLIC
    },

    auth:{
        secret: envVariables.AUTH_SECRET,
        public: envVariables.AUTH_PUBLIC,
        key: envVariables.AUTH_KEY,
    }
}

module.exports = config