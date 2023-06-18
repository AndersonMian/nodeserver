const {MulterMiddleware} = require('../../../../utils')
const { mysqlHelper } =require('../../../../core/db')
const {cdg} = require('../../../../utils')
const {query } = require('../../../model')
const { JwtMiddleware } = require('../../../../utils')

class ImageController{

    static async saveImageMultiple(pathFile){
        return new Promise(async (resolve, reject)=>{
            try {
                let saveFilePath = await MulterMiddleware.saveMultipleImage(pathFile, MulterMiddleware.uploadImagePath)

                let results = []
                for(let onePath of saveFilePath.data){
                    results.push(onePath)
                }
                return resolve({
                    error: false,
                    status: 201,
                    message: "Tous c'est bien passe",
                    data: results
                })
            } catch (error) {
                console.warn(error);
                return reject({
                    error: true,
                    status: 500,
                    message: "Erreur d'envoi du fichier💀☠💀",
                    data: error.message
                })
            }
        })
    }

    static async insertImage(idIntervention, cheminImage){
        const connexion = mysqlHelper.connect()
        const sql = 'INSERT INTO images (interventionId, chemin, dateCreation, dateModification) VALUES(?,?,NOW(),NOW())';
        const result = await query(connexion, sql, [
            idIntervention,
            cheminImage
        ])
        connexion.end()
        return Promise.resolve({status:200, error: false, message: "Image enregister", data: result.data})
    }
}

module.exports = ImageController