const express= require('express');
const bodyparser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const { mysqlHelper }= require('./db')
const { config }= require('../utils');
const Routerjs = require('./router/routerjs');

const app = express()
class Server{
    constructor(){
        this.app = app;
        this.app.use(helmet())
        this.app.use(cors())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(express.json())
        this.app.use(express.static('data/uploads'))
    }

    handle400(){
        this.app.use((err, res, next)=>{
            if(err && err.status===400 && 'body' in err)
                return res.status(400).json({error: true, message:"Mauvaise requete", data: null})
            next()
        })
        return this
    }
    handle404(){
        this.app.use((_err, res)=>{
            return res.status(404).json({error: true, message: "route introuvable ou inexistante", data: null})
        })
        return this
    }
    setRoutes(Routerjs){
        new Routerjs(this.app).getRoutes()
        return this
    }
    startServer(){
        this.app.listen(config.serverport, ()=>{
            console.log(`l'application tourne sur ${config.serverhost}:${config.serverport}`);
            mysqlHelper.getInstance()
        })
    }
}

module.exports = Server