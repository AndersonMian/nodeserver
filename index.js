const express = require('express');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//Routes 
app.use(require('./routes/user'));

//middlewares
app.use(express.json());

//Starting the server
app.listen(app.get('port'), ()=>{
  console.log('listening on port', app.get('port'));
});



 /* connection.connect();
   
  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
   
  connection.end();*/