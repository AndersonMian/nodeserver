const {Routerjs}= require('../../../core/router')
const {Utils} = require('../../../utils')
const { interventionController} = require('../http/controller')
const  {InterventionData}=require('../http/middleware')
const {JwtMiddleware} = require('../../../utils')

class InterventionsRoutes extends Routerjs{
    constructor(app){
        super(app)
    }
    getRoutes(){
        this.app.get('/test/interventions', (_req, res)=>{
            return Utils.apiResponse(res, interventionController.create({
                interlocuteur_id:2,
                technicien_id: 4,
                status_intervention: 1
            }))
        })

        this.app.get(
            '/interventions/ligne-interventions', 
            JwtMiddleware.checktoken,
            (req, res)=>{
            return Utils.apiResponse(res, interventionController.getAllInterventions())
        })
        this.app.get(
            '/interventions/ligne-intervention/:id_intervention', 
            JwtMiddleware.checktoken,
            (req, res)=>{
                let id_intervention = req.params.id_intervention
                return Utils.apiResponse(res, interventionController.getOneInterventionsLine(id_intervention))
        })

        this.app.post(
            '/interventions/add/:idTechnicien/:idInterlocuteur',
            InterventionData.existTechnicien, 
            InterventionData.existInterlocuteur,
            InterventionData.verificationStatus, 
            (req, res)=>{
                let data = req.body
                let onTechnicien = req.params.idTechnicien
                let oneInterlocuteur = req.params.idInterlocuteur
            return Utils.apiResponse(res, interventionController.create({
                interlocuteur_id:oneInterlocuteur,
                technicien_id: onTechnicien,
                status_intervention: data.status_intervention
            }))
        })
    }
}
module.exports = InterventionsRoutes
