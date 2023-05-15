const {Routerjs}= require('../../../core/router')
const {Utils} = require('../../../utils')
const { technicienController} = require('../http/controller')
const { body } = require('express-validator')
const {Validator, UserData} = require('../http/middleware')


class UserRoutes extends Routerjs{
    constructor(app){
        super(app)
    }
    getRoutes(){
        this.app.get('/test/technicien', (_req, res)=>{

                return Utils.apiResponse(res, technicienController.create({
                    nom: "test",
                    prenom: "C'est le test",
                    email: "test@test.fr",
                    contact:"002250707070707",
                    nomUser: "admin",
                    motDePasse: "azerty",
                    accesLvl:"c-r-u-d-crud"
                }))
        })

        this.app.post(
            '/technicien/register',
            UserData.register(),
            Validator.validate,
            (req, res)=>{
                const data = req.body
                delete data.confirmMotDePasse
                return Utils.apiResponse(res, technicienController.create(data))
            }
        )
        this.app.get(
            '/techniciens/all',
            (req, res)=>{
                return Utils.apiResponse(res, technicienController.getAllusers())
            }
        )
        
        this.app.post(
            '/techniciens/login',
            (req, res)=>{
                let userData = req.body
                return Utils.apiResponse(res, technicienController.login(userData))
            }
        )

    }
}
module.exports = UserRoutes