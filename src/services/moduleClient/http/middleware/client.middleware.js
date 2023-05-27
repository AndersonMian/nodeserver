const { body } = require('express-validator');
const {mysqlHelper} = require('../../../../core/db')
const {query}=require('../../../model')
const {Utils} = require('../../../../utils')


class ClientData{
     
    static register(){
        return[
            body('nomEntreprie').not().isEmpty().withMessage('veuillez entrer le nom de l\'entreprise'),
            body('prelocalisationnom').not().isEmpty().withMessage('veuillez entrer la localisation de l\'entreprise'),
        ]
    }

    static async existClient(req, res, next){
        const connexion = mysqlHelper.getInstance()
        let newClient = req.body.nomEntreprie
        if(!newClient)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Veuillez renseigner le champs: nomEntreprie",
                data: null,
                error: true
            }))
        const sql = 'SELECT * FROM client WHERE nomEntreprie = ?';
        const oneClient = await query(connexion, sql, [newClient]);

        
        if(oneClient.data)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Le client exist déja",
                data: null,
                error: true
            }))
        
        next()
    }

    static async existClientId(req, res, next){
        const connexion = mysqlHelper.getInstance()
        let idclient = req.params.id

        if(!idclient || idclient==':id')
            return Utils.apiResponse(res, Promise.resolve({
                status: 422 ,
                message: "Id invalide",
                data: null,
                error: true
            }))
        
        const sql = 'SELECT * FROM client WHERE idClt = ?';
        const oneClient = await query(connexion, sql, [idclient]);
        if(!oneClient.data)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Le client n'exist pas",
                data: null,
                error: true
            }))
        
        next()
    }

    static async existClientTrue(req, res, next){
        const connexion = mysqlHelper.getInstance()
        let oldClient = req.body.nomEntreprie
        if(!oldClient)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Veuillez renseigner le champs: nomEntreprie",
                data: null,
                error: true
            }))
        const sql = 'SELECT * FROM client WHERE nomEntreprie = ?';
        const oneClient = await query(connexion, sql, [oldClient]);
        
        if(!oneClient.data)
            return Utils.apiResponse(res, Promise.resolve({
                status: 422,
                message: "Le client n'exist pas",
                data: null,
                error: true
            }))
        
        next()
    }
}
module.exports = ClientData