const {Routerjs}= require('../../../core/router')
const {Utils} = require('../../../utils')
const {clientController}= require('../http/controller')
const { body } = require('express-validator')
const {Validator} = require('../../moduleUser/http/middleware')
const {ClientData} = require('../http/middleware')
const cors = require('cors')

class clientRoutes extends Routerjs{
    constructor(app){
        super(app)
    }

    getRoutes(){
        this.app.use(cors)
        this.app.get(
            '/test/client', 
            (_req, res)=>{
            return Utils.apiResponse(res, clientController.create({
                nomEntreprie: "test",
                localisation: "Il se trouve au test",
                
            }))
        }),

        this.app.get(
            '/client/all',
            (req, res)=>{
                return Utils.apiResponse(res, clientController.getAllClient())
            }
        ),
        this.app.get(
            '/client/get/:id',
            (req, res)=>{
                let idClient = req.params.id
                return Utils.apiResponse(res, clientController.getOneClientbyId(idClient))
            }
        ),

        this.app.post(
            '/client/add',
            ClientData.register(),
            ClientData.existClient,
            (req, res)=>{
                let newClient = req.body

                return Utils.apiResponse(res, clientController.create(newClient))
            }
        )

        this.app.post(
            '/client/update/:id',
            ClientData.existClientTrue,
            (req, res)=>{
                let newClientData = req.body
                let idClient = req.params.id
                return Utils.apiResponse(res, clientController.update(newClientData, idClient))
            }
        )

        this.app.get(
            '/client/delete/:id',
            ClientData.existClientId,
            (req, res)=>{
                let idClient = req.params.id
                return Utils.apiResponse(res, clientController.deleteClientbyId(idClient))
            }
        )
    }
}
module.exports = clientRoutes