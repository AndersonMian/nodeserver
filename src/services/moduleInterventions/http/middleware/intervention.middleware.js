const { body } = require('express-validator');
const {mysqlHelper} = require('../../../../core/db')
const {query}=require('../../../model')
const {Utils} = require('../../../../utils')

class InterventionData{
    static register(){
        return[
            body('status_intervention').not().isEmpty().withMessage('veuillez entrer status correspondant à l\'étape de l\'intervention'),
        ]
    }

    static async existTechnicien(req, res, next){
        const connexion = mysqlHelper.getInstance()
        let onTechnicien = req.params.idTechnicien
        if(!onTechnicien)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Pas de technicien sélectionné",
                data: null,
                error: true
            }))
        
        /*if(typeof(onTechnicien)!==Number)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: " ID technicien invalide",
                data: null,
                error: true
            }))*/

        const sql = 'SELECT idTech FROM technicien WHERE idTech = ?';
        const selectedTechnicien = await query(connexion, sql, [onTechnicien]);
        
        if(!selectedTechnicien.data.length)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Pas de technicien pour cet ID dans la base de données",
                data: null,
                error: true
            }))
            
        next()
    }

    static async existInterlocuteur(req, res, next){
        const connexion = mysqlHelper.getInstance()
        let oneInterlocuteur = req.params.idInterlocuteur
        if(!oneInterlocuteur)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Pas de technicien sélectionné",
                data: null,
                error: true
            }))

        /*if(typeof(oneInterlocuteur)!='number')
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: " ID Interlocuteur invalide",
                data: null,
                error: true
            }))*/

        const sql = 'SELECT idInterl FROM interlocuteur WHERE idInterl = ?';
        const selectedInterlocuteur = await query(connexion, sql, [oneInterlocuteur]);
        //console.log(selectedInterlocuteur.data.lenght)
        
        if(!selectedInterlocuteur.data.length)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Pas d'interlocuteur pour cet ID dans la base de données",
                data: null,
                error: true
            }))
            
        next()
    }

    static async verificationStatus(req, res, next){
        const connexion = mysqlHelper.getInstance()
        let oneStatus= req.body.status_intervention
        if(!oneStatus)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Erreur de statut",
                data: null,
                error: true
            }))
        
            const sql_status =  'SELECT id_status FROM status_intervention WHERE id_status=?'
            const result_status = await query(connexion, sql_status, [oneStatus])

        if(!result_status.data)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Erreur de statut",
                data: null,
                error: true
            }))
            
        next()
         
        
    }
}
module.exports = InterventionData