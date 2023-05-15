const { mysqlHelper } = require('../../../../core/db')
const {query, cdg}=require('../../../model')
const bcrypt = require('bcrypt')

const connexion = mysqlHelper.getInstance()

const technicienController={
    getAllusers: async ()=>{
    
        const sql = 'SELECT * FROM technicien ORDER BY dateCreation DESC';
        const techniciens = await query(connexion, sql)
        //connexion.end();
        return Promise.resolve({status:200, error: false, message: 'Liste des techniciens', data: techniciens.data})
    },
    create: async(user)=>{
        const sql = 'INSERT INTO technicien (nom, prenom, email, contact, nomUser, motDePasse, accesLvl, dateCreation,dateModification) VALUES(?,?,?,?,?,?,?,NOW(),NOW())';
        let encpass = await cdg.encryptPassword(user.motDePasse)
        if(typeof encpass ==='boolean')
            return Promise.resolve({status:500, error: true, message: "Une erreur interne s'est produite", data: result})

        user.motDePasse= encpass
        const result = await query(connexion, sql, [
            user.nom,
            user.prenom,
            user.email,
            user.contact,
            user.nomUser,
            user.motDePasse,
            user.accesLvl,
        ])
        //connexion.end()
        return Promise.resolve({status:200, error: false, message: "Ajout d'un nouveau techniciens", data: result})
    },
    login:async (userData)=>{
        const sql = 'SELECT * FROM technicien WHERE nomUser = ?';
        const onTechnicien = await query(connexion, sql, [userData.nomUser]);
        const passwordIsValid = bcrypt.compareSync(userData.motDePasse, onTechnicien.data[0].motDePasse)

        if(!onTechnicien || !passwordIsValid)
            return Promise.resolve({status:402, error: true, message: "Email ou mot de passe incorrect", data: null})

        return Promise.resolve({status:200, error: false, message: "Un utilisateur", data: onTechnicien})
    }
}

module.exports = technicienController