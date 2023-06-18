const {Routerjs}= require('../../../core/router')
const {Utils,MulterMiddleware,JwtMiddleware} = require('../../../utils')
const { interventionController} = require('../http/controller')
const  {InterventionData}=require('../http/middleware')
const {ImageController}=require('../../moduleImage/http/controller')

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
            '/interventions/add/:idInterlocuteur',
            JwtMiddleware.checktoken,
            InterventionData.existInterlocuteur,
            InterventionData.verificationStatus, 
            (req, res)=>{
                let data = req.body
                let onTechnicien =  req.technicien
                let oneInterlocuteur = req.params.idInterlocuteur
            return Utils.apiResponse(res, interventionController.create({
                interlocuteur_id:oneInterlocuteur,
                technicien_id: onTechnicien,
                status_intervention: data.status_intervention
            }))
        })

        this.app.post(
            '/interventions/update-image/:idIntervention',
            JwtMiddleware.checktoken,
            MulterMiddleware.multipleImage,
            async (req, res)=>{
                let oneIntervention = req.params.idIntervention
                console.log(oneIntervention)

                let resultISaveImage
                const Img = req.files ? req.files: []
                if(Img.length===0){
                    return Utils.apiResponse(res, Promise.resolve({
                        status: 422,
                        message: "Pas d'image sélectionné",
                        data: null,
                        error: true
                    }))
                }

                if(Img.length!==0){
                    resultISaveImage = await ImageController.saveImageMultiple(Img)
                }
                let resultInsertImage =[]
                for(let i =0; i<resultISaveImage.data.length; i++){
                   let result = await ImageController.insertImage(oneIntervention,resultISaveImage.data[i])
                   resultInsertImage.push(result.data)
                }
                console.log(resultInsertImage)

            return Utils.apiResponse(res, Promise.resolve({status: 200, error:false, data: resultInsertImage}))
        })
    }
}
module.exports = InterventionsRoutes
