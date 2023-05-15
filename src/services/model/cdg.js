const bcrypt = require('bcrypt')

const cdg = {
    encryptPassword: (payload)=>{
        const saltRounds =10

        return new Promise((resolve)=>{
            bcrypt.genSalt(saltRounds, function(_err, salt){
                bcrypt.hash(payload, salt, function(_err,hash){
                    if(_err) resolve(false)
                    return resolve(hash)
                })
            })
        })
    },
    verifyPassword: (payload, hash)=>{
        return new Promise((resolve)=>{
            bcrypt.compare(payload, hash, function(err, result){
                if(err) resolve(false)
                resolve(result)
            })
        })
    }
}
module.exports=cdg