const helpers = {}

helpers.isAuthenticated = function(request,response,next){
   if(request.isAuthenticated()){
      return next();
   }
   request.flash('error_msg','Acceso no autorizado');
   response.redirect('/users/signin');
}

module.exports = helpers;