const { body } = require('express-validator');
class UserData{
    static register(){
        return[
            body('nom').not().isEmpty().withMessage('veuillez entrer un nom'),
            body('prenom').not().isEmpty().withMessage('veuillez entrer un prenom'),
            body('email').isEmail().withMessage('veuillez entrer un email'),
            body('accesLvl').not().isEmpty().withMessage('veuillez entrer un niveau d\'accès'),
            body('motDePasse').isLength({min: 4}).withMessage('votre mot de passe doit faire au moins 4 caractère'),
            body('motDePasse').isLength({max: 10}).withMessage('votre mot de passe doit faire au plus 10 caractère'),
            body('motDePasse').not().isEmpty().withMessage('veuillez entrer un password'),
            body('confirmMotDePasse').custom((value, { req }) => {
                return (value !== req.body.motDePasse)? false: true
            }).withMessage('les mots depasses ne correspondent pas'),
            
        ]
    }
}
module.exports = UserData