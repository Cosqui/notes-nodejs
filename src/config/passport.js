const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy({
   usernameField:'email',
   passwordField:'password'
},async function(email,password,done){
      // Validar si existe el correo del ususario
     const user =  await User.findOne({email});
     console.log(user);
     if(!user){
        return done(null,false,{message:"Usuario no encontrado"});
     }else{
        // Validar password USer
        const match =  await user.matchPassword(password);
        if(match){
           return done(null,user);
        }else{
           return done(null,false,{message:"Contraseñña incorrecta"});
        }
     }
   }

));

passport.serializeUser(function(user,done){
   done(null,user.id);
});

passport.deserializeUser(function(id,done){
   User.findById(id,function(error, user){
      done(error,user);
   })
});