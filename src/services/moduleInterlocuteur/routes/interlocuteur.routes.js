const {Routerjs}= require('../../../core/router')
const {Utils} = require('../../../utils')
const {interlocuteurController} = require('../http/constroller')
const {Validator} = require('../../moduleUser/http/middleware')
const {interlocuteurData}= require('../http/middleware')

class InterlocuteurRoutes extends Routerjs{
    constructor(app){
        super(app)
    }

    getRoutes(){
        this.app.get(
            '/test/interlocuteur', 
            interlocuteurData.existInterlocuteur
            ,(_req, res)=>{
            return Utils.apiResponse(res, interlocuteurController.create({
                nom: "test",
                prenom: "interlocuteur",
                email: "interlocuteur@test.fr",
                contact:"002250707070708",
                service: "technique",
                idClient: 1,
            }))
        })

        this.app.post(
            '/interlocuteur/register',
            interlocuteurData.register(),
            (req, res)=>{
                const data = req.body
                const idClient = data.idClient
                if(!idClient)
                    return Utils.apiResponse(res, Promise.resolve({
                        error: true,
                        message: "Aucun client spécifier pour cet interlocuteur",
                        data: null,
                        status: 422
                    }))
                return Utils.apiResponse(res, interlocuteurController.create(data))
            }
        )
    }
}
module.exports = InterlocuteurRoutes

