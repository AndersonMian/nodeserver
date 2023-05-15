const query = async(connexion, sql, params)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            const [rows] = await connexion.execute(sql, params);
            return resolve({
                error: false,
                message: "Requète exécutée",
                data: rows
            })
        } catch (error) {
            console.warn(error);
            reject({
                error: true,
                data: error,
                message: "erreur lors de l'exécution de la requète",
                status:1
            })
        }
    })
}

module.exports= query