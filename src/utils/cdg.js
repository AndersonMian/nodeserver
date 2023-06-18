const bcrypt = require('bcrypt')
const fs = require('fs')
const {v4} = require('uuid')
const path = require('path')


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
    },
    inArray: function (needle, haystack) {
        let length = haystack.length;
        for (let i = 0; i < length; i++) {
          if (haystack[i] === needle) return true;
        }
        return false;
    },
    string: {
        is_empty: function(value) {
            return (value === undefined || value === null || value.length <= 0 || value === '');
        },
        is_email: function(value) {
            return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
        },
        is_url: function(value) {
            return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
        },
        is_number: function(value) {
            return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
        },
        is_date: function(value) {
            if (Object.prototype.toString.call(value) === "[object Date]") {
                return !isNaN(value.getTime());
            } else {
                return false
            }
        },
    },
    getDate: () => {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        let hour = today.getHours();
        let minutes = today.getMinutes();
        let second = today.getSeconds();
        let millisecond = today.getMilliseconds()
        return year + "-" + month + "-" + day+ "-" +hour+ "-" +minutes+ "-" +second;
    },
    buildApiError: (payload) => {
        return {
            errors: {
                value: cdg.string.is_empty(payload.value) ? '' : payload.value,
                msg: payload.msg,
                param: cdg.string.is_empty(payload.param) ? '' : payload.param,
                location: cdg.string.is_empty(payload.location) ? '' : payload.location,
            }
        };
    },
    file: {
        remove: function (filePath) {
          return fs.unlinkSync(filePath);
        },
        extension: function (filename) {
          return path.extname(filename).toLowerCase();
        },
        toBase64: (filename) => {
          return fs.readFileSync(filename, { encoding: "base64" });
        },
        exists: (filePath) => {
          return fs.existsSync(filePath);
        },
    }
}
module.exports=cdg