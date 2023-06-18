const multer = require('multer')
const path = require('path') 
const {resole} = require('path')
const fs =require('fs')
const cdg = require('./cdg')
const Utils = require('./utils')
const config= require('./config')
const mime= require('mime-types')

// interface File{
//     path: string,
//     mimetype: string,
//     filename: string,
//     originalname: string,
//     encoding: string,
//     destination: string,
//     size: number,
// }

class MulterMiddleware{
    static uploadPathTmp = path.join(""+process.env.UPLOAD_TMP_PATH)
    static uploadImagePath = path.join(""+process.env.UPLOAD_IMG_PATH)
    static uploadSongPath = path.join(""+process.env.UPLOAD_SIGNATURE_PATH)
    static uploadVideoPath = path.join(""+process.env.UPLOAD_VIDEO_PATH)

    //static host = config.serverhost +":"+config.serverport;

    static async singleImage(req, res, next){
        await MulterMiddleware.buildUploadPath(); 
        let allowedExtension = ['png', 'jpeg', 'jpg', 'gif', 'PNG','JPEG', 'JPG', 'GIF'];
        const upload= multer({
            dest: MulterMiddleware.uploadPathTmp,
            fileFilter: (req, file, cb)=>{
                if(!cdg.inArray(MulterMiddleware.buildExt(file.mimetype), allowedExtension)){
                    req.fileValidationError = 'Type de fichier non autorisé';
                    return Utils.apiResponse(res, new Promise((resolve)=>{
                        resolve({
                            status:422,
                            message: 'error',
                            data: cdg.buildApiError({msg: 'Type de fichier non autorisé'})
                        });
                    }))
                }
                cb(null, true);
            }
        }).single("file");

        upload(req, res, function (err){
            if(req.file){
                if(err instanceof multer.MulterError){
                    if(err.code === 'LIMIT_FILE_SIZE') {
                        err.message = "Fichier trop volumineux"
                    } else if (err.code === 'LIMIT_FILE_COUNT') {
                        err.message = "Nombre maximum de fichier atteint"
                    }
                    return Utils.apiResponse(res, new Promise((resolve)=>{
                        resolve({
                            status: 401,
                            message: 'error',
                            data: cdg.buildApiError({msg: [err]})
                        });
                    }));
                }else if(req.fileValidationError){
                    return Utils.apiResponse(res, new Promise((resolve)=>{
                        resolve({
                            status: 401,
                            message: 'error',
                            data: cdg.buildApiError({msg: req.fileValidationError})
                        });
                    }));
                }else if(err){
                    return Utils.apiResponse(res, new Promise((resolve)=>{
                        resolve({
                            status: 401,
                            message: 'error',
                            data: cdg.buildApiError({msg: err.message})
                        });
                    }));
                }
            }else{
                req.file = ''
            }

            next()
        })
    }

    static async multipleImage(req, res, next){
        await MulterMiddleware.buildUploadPath();
        let allowedExtension = ['png', 'jpeg', 'jpg', 'gif', 'PNG','JPEG', 'JPG', 'GIF'];
        const upload = multer({
            dest: MulterMiddleware.uploadPathTmp,
            fileFilter: (req, file, cb)=>{
                if(!cdg.inArray(MulterMiddleware.buildExt(file.mimetype), allowedExtension)){
                    req.fileValidationError = 'Type de fichier non autorisé';
                    return Utils.apiResponse(res, new Promise((resolve)=>{
                        resolve({
                            status:422,
                            message: 'error',
                            data: cdg.buildApiError({msg: 'Type de fichier non autorisé'})
                        });
                    }))
                }
                cb(null, true)
            }
        }).array("files", 10);

        upload(req, res, function (err){
            if(err instanceof multer.MulterError){
                if(err.code === 'LIMIT_FILE_SIZE') {
                    err.message = "Fichier trop volumineux"
                } else if (err.code === 'LIMIT_FILE_COUNT') {
                    err.message = "Nombre maximum de fichier atteint"
                }
                return Utils.apiResponse(res, new Promise((resolve)=>{
                    resolve({
                        status: 401,
                        message: 'error',
                        data: cdg.buildApiError({msg: [err]})
                    });
                }));
            }else if(req.fileValidationError){
                return Utils.apiResponse(res, new Promise((resolve)=>{
                    resolve({
                        status: 401,
                        message: 'error',
                        data: cdg.buildApiError({msg: req.fileValidationError})
                    });
                }));
            }else if(err){
                return Utils.apiResponse(res, new Promise((resolve)=>{
                    resolve({
                        status: 401,
                        message: 'error',
                        data: cdg.buildApiError({msg: err.message})
                    });
                }));
            }
            next()
        })
    }

    static async saveImage(file, destination){
        return new Promise((resolve, reject)=>{
            try {
                const tempPath = file.path

                let destinationPath
                if(!destination){
                    destinationPath = MulterMiddleware.uploadImagePath
                }
                else{
                    destinationPath = destination
                }

                let fileExt = MulterMiddleware.buildExt(file.mimetype);
                let fullFilePath = destinationPath+"/" + file.filename+"-" +cdg.getDate()+ '.' + fileExt ;

                fs.rename(tempPath, fullFilePath, err=>{
                    if(err) reject({status:1, data: err})

                    if(cdg.file.exists(tempPath)){
                        fs.rmdirSync(tempPath);
                    }
                    fullFilePath = path.join(destinationPath+"/"+file.filename+"-"+cdg.getDate()+"."+fileExt)

                    return resolve({ error: false, status: 302, message: "Image sauvegardée", data: fullFilePath})
                })

            } catch (error) {
                return reject({error:true, status: 500, message:"💀☠💀Une erreur interne s'est produite à l'envoie de l'image❗❗❗💀☠💀", data:null})
            }
        })
    }

    static async saveMultipleImage(files, destination){
        return new Promise((resolve, reject)=>{
            try {
                let results = [];

                let destinationPath = destination ? destination : MulterMiddleware.uploadImagePath 

                for(let file of files){
                    const tempPath = file.path
                    
                    let fileExt = MulterMiddleware.buildExt(file.mimetype)
                    let fullFilePath = destinationPath + "/" + file.filename + "-" + cdg.getDate() + '.' + fileExt;

                    fs.renameSync(tempPath, fullFilePath);
                    if(cdg.file.exists(tempPath)){
                        fs.rmdirSync(tempPath)
                    }

                    fullFilePath= path.join(destinationPath+"/"+file.filename + "-" + cdg.getDate() + '.' + fileExt);
                    results.push(fullFilePath);
                }

                return resolve({ error: false, status: 200, message: "Images envoyées.", data: results });
            } catch (error) {
                return reject({ error: true, status: 500, message: "💀☠💀Une erreur interne s'est produite à la sauvegarde de plusieures images❗❗❗💀☠💀", data: null })
            }
        })
    }

    static buildExt(mimetype) {
        return mime.extension(mimetype);
    }

    static async buildUploadPath(){
        // CREATE TEMPORY UPLOAD PATH
        if(!fs.existsSync(this.uploadPathTmp)){
            await fs.promises.mkdir(this.uploadPathTmp, { recursive: true })
        }
        // CREATE UPLOAD IMAGE PATH
        if(!fs.existsSync(this.uploadImagePath)){
            await fs.promises.mkdir(this.uploadImagePath, {recursive: true})
        }

        // CREATE UPLOAD SONG PATH
        if(!fs.existsSync(this.uploadSongPath)){
            await fs.promises.mkdir(this.uploadSongPath, {recursive: true})
        }

        // CREATE UPLOAD VIDEO PATH
        if(!fs.existsSync(this.uploadVideoPath)){
            await fs.promises.mkdir(this.uploadVideoPath, {recursive: true})
        }
    }
}

module.exports = MulterMiddleware