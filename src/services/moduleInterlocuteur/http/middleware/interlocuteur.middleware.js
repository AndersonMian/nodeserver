const { body } = require('express-validator');
const {mysqlHelper} = require('../../../../core/db')
const {query}=require('../../../model')
const {Utils} = require('../../../../utils')

class interlocuteurData{
    static register(){
        return[
            body('nom').not().isEmpty().withMessage('veuillez entrer un nom'),
            body('prenom').not().isEmpty().withMessage('veuillez entrer un prenom'),
            body('email').isEmail().withMessage('veuillez entrer un email'),
            body('contact').isEmail().withMessage('veuillez entrer un contact'),
            body('service').isEmail().withMessage('veuillez entrer un service'),
            body('idClient').isEmail().withMessage('veuillez spécifier le client auquel appartient l\'interlocuteur'),
            
        ]
    }

    static async existInterlocuteur(req, res, next){
        const connexion = mysqlHelper.getInstance()
        let newInterlocuteur = req.body.contact
        if(!newInterlocuteur)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Veuillez renseigner le champs: contact",
                data: null,
                error: true
            }))
        const sql = 'SELECT * FROM client WHERE nomEntreprie = ?';
        const oneInterlocuteur = await query(connexion, sql, [newInterlocuteur]);
        
        if(oneInterlocuteur.data)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Le client exist déja",
                data: null,
                error: true
            }))
        
        next()
    }
    
}
module.exports = interlocuteurData