const {mysqlHelper} = require('../../../../core/db')
const {query, cdg}=require('../../../model')

const connexion = mysqlHelper.getInstance()

const interventionController={
    create:async(intervention)=>{
        const sql = 'INSERT INTO interventions (interlocuteur_id, technicien_id, status_intervention, dateCreation,dateModification) VALUES(?,?,?,NOW(),NOW())';
        const result = await query(connexion, sql, [
            intervention.interlocuteur_id,
            intervention.technicien_id,
            intervention.status_intervention
        ])
        return Promise.resolve({status:200, error: false, message: "Ajout d'un nouvel interlocuteur", data: result.data})
    },
    getAllInterventions: async()=>{
        const sql = `
        SELECT 
            tech.idTech as id_technicien, 
            tech.nom as technicien_nom, 
            tech.prenom as technicien_prenom, 
            terl.idInterl as interlocuteur_id, 
            terl.nom as interlocuteur_nom, 
            terl.prenom as interlocuteur_prenom, 
            terl.service as interlocuteur_service, 
            clt.nomEntreprie as nom_entreprise,
            intrv.idinterv as intervention_id, 
            intrv.motif_intervention as intervention_motif, 
            intrv.status_intervention as intervention_status,
            intrv.dateCreation as date_intervention_add, 
            intrv.dateModification as date_intervention_modif 
        FROM interventions intrv
        INNER JOIN technicien tech ON intrv.technicien_id = tech.idTech
        INNER JOIN interlocuteur terl ON intrv.interlocuteur_id = terl.idInterl
        INNER JOIn client clt ON terl.idClient = clt.idClt`

        const lignesInterventions = await query(connexion, sql)
        return Promise.resolve({status:200, error: false, message: 'lignes Interventions', data: lignesInterventions.data})
    },
    getOneInterventionsLine: async(id_intervention)=>{
        const sql = `
        SELECT 
            tech.idTech as id_technicien, 
            tech.nom as technicien_nom, 
            tech.prenom as technicien_prenom, 
            terl.idInterl as interlocuteur_id, 
            terl.nom as interlocuteur_nom, 
            terl.prenom as interlocuteur_prenom, 
            terl.service as interlocuteur_service, 
            clt.nomEntreprie as nom_entreprise,
            intrv.idinterv as intervention_id, 
            intrv.motif_intervention as intervention_motif, 
            intrv.status_intervention as intervention_status,
            intrv.dateCreation as date_intervention_add, 
            intrv.dateModification as date_intervention_modif 
        FROM interventions intrv
        INNER JOIN technicien tech ON intrv.technicien_id = tech.idTech
        INNER JOIN interlocuteur terl ON intrv.interlocuteur_id = terl.idInterl
        INNER JOIn client clt ON terl.idClient = clt.idClt
        WHERE intrv.idinterv=?`

        const ligneIntervention = await query(connexion, sql,[id_intervention])
        return Promise.resolve({status:200, error: false, message: 'Recherche Intervention', data: ligneIntervention.data})

    }

}
module.exports = interventionController