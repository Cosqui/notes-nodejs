// archivo principal para arrancar la app
require('dotenv').config();
const app = require('./server');
require('./database');

app.listen(app.get('port'), function(){
   console.log("Listen server: ", app.get('port'))
});