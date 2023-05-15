const { response } = require("express")

class Utils{
    static async apiResponse(res, promise){
        try {
            const response = await promise
            const {error, message, data, status} = response
            return res.status(status).json({error, message, data})
        } catch (error) {
            console.error(error)
            return res.status(500)
                      .json({
                        error:true,
                        message: "Une erreur interne s'est produite",
                        data: error
                      })
        }
    }
}

module.exports = Utils