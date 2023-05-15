const {validationResult} = require('express-validator')
const {Utils} = require('../../../../utils')
class Validator{
    static validate(req, res, next){
        const error = validationResult(req)
        if(!error.isEmpty()){
            return Utils.apiResponse(res, Promise.resolve(
                {
                    error: true,
                    status: 422,
                    message: "body incorrect",
                    data: error
                }
            ))
        }
        next()
    }
}
module.exports = Validator