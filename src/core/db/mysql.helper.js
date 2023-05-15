const mysql = require('mysql2/promise');
const { config } = require('../../utils');

//Class permettent la connexion à la base de données
class MysqlHelper{
    constructor(
        host,
        dbname,
        dbport,
        username,
        password
    ){
        this.host = host;
        this.dbname = dbname;
        this.dbport= dbport
        this.username = username;
        this.password = password;
        this.instance = null
    }

    getInstance(){
        if(!this.instance)
            this.instance = this.connect()
        return this.instance
    }

     connect(){
        try {
            this.instance =  mysql.createPool({
                host:`${this.host}`,
                user: this.username,
                password: this.password,
                database: this.dbname
            })
            
            /*this.instance.connect((err)=>{
                if(err){
                    console.error('Erreur de connection à la bd', err)
                    return err
                }
                console.log("Nouvelle instance de base de données crée")
                return this.instance
            })*/
            console.log("Nouvelle instance de base de données crée")
            return this.instance
        } catch (error) {
            console.error('Erreur de connection à la bd',error)
        }
    }
}

const mysqlHelper =new  MysqlHelper(
    config.dbHost,
    config.dbName,
    config.dbPort,
    config.dbUserName,
    config.dbUserPassword
)
module.exports = mysqlHelper