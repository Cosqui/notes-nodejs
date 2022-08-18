
// para correr proyecto 
// "start": "node src/index.js"    y en consola solo correr npm start  
// "start": "nodemon src/index.js"  y en consola solo correrer npm run dev

// codigo del server / Express
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
// method-override permite hacer peticioes DELETE o PUT que desde html o hbs no serian faciles es un meddleware
const methodOverride = require('method-override');

const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');

//inicializaciones
const app = express();


//  settings
app.set('port', process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views'))
app.engine('.hbs',exphbs({
   defaultLayout:'main',
   layoutsDir: path.join(app.get('views'),'layouts'),
   partialsDir:path.join(app.get('views'),'partials'),
   extname:'.hbs',
}));

app.set('view engine', '.hbs');

//  middlewares
//todo datos que llegue de una url llegue en json
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
// ayuda a guardar los msj en el servidor
app.use(session({
   secret:'secret',
   resave:true,
   saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



// variables globales
app.use(function(request,response,next){
   response.locals.success_msg = request.flash('success_msg');
   response.locals.error_msg = request.flash('error_msg');
   response.locals.error = request.flash('error');
   response.locals.user = request.user || null;
   next();
});

// Routes 

// app.get('/',function(request,response){
//    // send enviar string o json
//    //response.send('Hola mundo');
//    // renderizar a plantillas 
//    response.render('index');
// });
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));
//static files

app.use(express.static(path.join(__dirname,'public')));



module.exports = app;