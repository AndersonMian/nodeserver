const {mysqlHelper} = require('../../../../core/db')
const {query, cdg}=require('../../../model')
const bcrypt = require('bcrypt')

const connexion = mysqlHelper.getInstance()

const clientController ={
    create: async(client)=>{

        const sql = 'INSERT INTO client (nomEntreprie, localisation, dateCreation,dateModification) VALUES(?,?,NOW(),NOW())';
        const result = await query(connexion, sql, [
            client.nomEntreprie,
            client.localisation
        ])

        return Promise.resolve({status:200, error: false, message: "Ajout d'un nouveau client", data: result.data})
    },

    update: async(client, idClt)=>{
        const sql = 'UPDATE client SET nomEntreprie=?, localisation=?,dateModification=NOW() WHERE idClt=?';
        
        const result = await query(connexion, sql, [
            client.nomEntreprie,
            client.localisation,
            idClt
        ])

        return Promise.resolve({status:200, error: false, message: "Client Modifier", data: result.data})
    },
    getAllClient: async()=>{
        const sql = 'SELECT * FROM client ORDER BY dateCreation DESC';
        const clients = await query(connexion, sql)
        return Promise.resolve({status:200, error: false, message: 'Liste des clients', data: clients.data})
    },
    getOneClientbyId: async(idClt)=>{
        const sql ='SELECT * FROM client WHERE idClt=? ORDER BY dateCreation DESC'
        const oneClient = await query(connexion, sql, [idClt])
        return Promise.resolve({status:200, error: false, message: 'Client', data: oneClient.data})

    }
}

module.exports = clientController