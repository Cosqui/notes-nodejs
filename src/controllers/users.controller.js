const usersCrtl = {}
const User = require('../models/User');
const passport = require('passport');

usersCrtl.renderSignUpForm = function(request,response){
   response.render('users/signup');

}

usersCrtl.signUp = async function(request,response){
   const errors = [];
   const {name,email,password,confirm_password} = request.body;
   if(password != confirm_password){
      errors.push({text: 'Las contraseñas no coinciden'});
   }
   if(password.length < 4){
      errors.push({text: 'las contraseñas deben ser mayor a 4 caracteres'});
   }
   if(errors.length > 0){
      response.render('users/signup',{errors,name,email,password,confirm_password});
   }else{
      const emailUser =  await User.findOne({email:email});
      if(emailUser){
         request.flash('error_msg', 'El email ya se encuentra registrado');
         response.redirect('/users/signup');
      }else{
         const newUser = new User({name,email,password});
         newUser.password = await newUser.encryptPassword(password);
         await newUser.save();
         request.flash('success_msg','Se registro correctamente');
         response.redirect('/users/signin');
      }
   }
   
   
}

usersCrtl.renderSignInForm = function(request,response){
   response.render('users/signin');
}

// usersCrtl.signIn = function(request,response){

//    response.send('signin');
// }
usersCrtl.signIn = passport.authenticate('local',{
   failureRedirect:'/users/signin',
   successRedirect:'/notes',
   failureFlash:true
})
usersCrtl.logout = function(request,response){
   request.logout();
   request.flash('success_msg','Has cerrado session')
   response.redirect('/users/signin');
}

module.exports = usersCrtl;