const { Router } = require('express');
const router = Router();

const Connection = require('../config/database');

router.get('/', (req, res) =>{
    res.status(200).json('Server on port 3000 and database is connected');

});

router.get('/:users', (req, res) =>{
    Connection.query("select * from users;", (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/:users/:idusers', (req, res) =>{
    const {idusers} = req.params;
    Connection.query('select * from users where idusers = ?;', [idusers], (error, rows, fields) =>{
        if(error){
            res.json(rows);
        }else{
            console.log(error);
        }
    });
});

router.post('/:users', (req, res) =>{
    const {nom_users, mail_users, password_users, fonctionUsers}= req.body;
    console.log(req.body);
    Connection.query('INSERT INTO `users`(`nom_users`, `mail_users`, `password_users`, `fonctionUsers`) VALUES (?, ?, SHA1(?), ?)',
    [nom_users, mail_users, password_users, fonctionUsers], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Utilisateur Enregistré'});
        }else{
            console.log(err);
        }
    });
});

router.put('/:users/:idusers', (req, res) => {
    const {idusers, nom_users, mail_users, password_users, fonctionUsers}= req.body;
    console.log(req.body);
    Connection.query('UPDATE `users` SET `nom_users` = ?, `mail_users` = ?, `password_users` = ?, `fonctionUsers` = ? WHERE `users`.`idusers` = ?)',
    [nom_users, mail_users, password_users, fonctionUsers, idusers], (err, rows, fields) => {
        if(err){
            res.json({Status: 'Information mis à jour'});
        }else {console.log(err);}
    });
});

router.delete('/:users/:idusers', (req, res) => {
    const {id} = req.params;
    Connection.query('delete from users where id = ?', [id], (error, rows, fields) =>{
        if(!error){
            res.json({Status: 'Utilisateur éffacé'});
        }else{
            res.json({Status: error});
        }
    });
});

module.exports = router;