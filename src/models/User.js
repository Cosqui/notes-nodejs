const { Schema, model } = require('mongoose');
const  bcryptjs =  require('bcryptjs');

const UserSchema = new Schema({
   name:{
      type:String,
      required:true
   },
   email:{
      type:String,
      required:true,
      unique:true
   },
   password:{
      type:String,
      required:true
   }
},{
   //agregar por default fecha de created y update
   timestamps:true
});

// definir metodos
UserSchema.methods.encryptPassword = async function(password){
  const salt = await bcryptjs.genSalt(10);
  return  await bcryptjs.hash(password,salt);
};

UserSchema.methods.matchPassword = async function(password){
   // returno True o False si la contraseña es correcta
   return await bcryptjs.compare(password, this.password);
}

module.exports = model('User',UserSchema);