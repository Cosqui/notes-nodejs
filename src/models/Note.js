const {Schema,model} = require('mongoose');

const NoteSchema =  new Schema({
   title:{
      type:String,
      required:true
   },
   descripcion:{
      type:String,
      required:true
   },
   user:{
      type:String,
      required:true
   }
},{
   //agregar por default fecha de created y update
   timestamps:true
})

module.exports =   model('Note',NoteSchema);