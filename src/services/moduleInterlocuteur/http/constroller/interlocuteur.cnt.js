const { mysqlHelper } = require('../../../../core/db')
const {query, cdg}=require('../../../model')

const connexion = mysqlHelper.getInstance()

const interlocuteurController={
    create:async(interlocuteur)=>{
        const sql = 'INSERT INTO interlocuteur (nom, prenom, email, contact, service, idClient, dateCreation,dateModification) VALUES(?,?,?,?,?,?,NOW(),NOW())';
        const result = await query(connexion, sql, [
            interlocuteur.nom,
            interlocuteur.prenom,
            interlocuteur.email,
            interlocuteur.contact,
            interlocuteur.service,
            interlocuteur.idClient
        ])

        return Promise.resolve({status:200, error: false, message: "Ajout d'un nouvel interlocuteur", data: result.data})
    }

}
module.exports = interlocuteurController

