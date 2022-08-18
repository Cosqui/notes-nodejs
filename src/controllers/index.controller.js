const indexCtrl = {};

indexCtrl.renderIndex = function(request,response){
   // send enviar string o json
   //response.send('Hola mundo');
   // renderizar a plantillas 
   response.render('index');
}
indexCtrl.renderAbout = function(request, response){
   response.render('about')
}

// siempre debe exportarse para acceder desde otros archivos
module.exports = indexCtrl;