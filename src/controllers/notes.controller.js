
const Note = require('../models/Note');
const notesCtrl = {}


notesCtrl.renderNoteForm = function(request, response){
   response.render('notes/new_note');
}

notesCtrl.createNewNote = async function(request,response){
   const { title, descripcion } = request.body
   const newNote =new Note({
      title:title,
      descripcion:descripcion
   });
   newNote.user = request.user.id;
   await newNote.save();
   request.flash('success_msg', 'Nota Agregada Correctamente');
   response.redirect('/notes');
}

notesCtrl.renderAllNotes = async function(request,response){
   const notes =   await Note.find({user:request.user.id}).sort({createdAt:'desc'}).lean();
   console.log(notes);
   response.render('notes/all-notes',{notes});
}

notesCtrl.renderEditNote = async function(request,response){
   const note = await Note.findById(request.params.id).lean();
   if(note.user != request.user.id){
      request.flash('error_msg','No autorizado');
      return response.redirect('/notes');
   }
   response.render('notes/edit-note',{note});
}

notesCtrl.updateNote = async function(request,response){
   const {title,descripcion} = request.body
   await Note.findByIdAndUpdate(request.params.id,{title:title,descripcion:descripcion});
   request.flash('success_msg', 'Nota Editada Correctamente');
   response.redirect('/notes');
}

notesCtrl.deleteNote = async function(request,response){
   await Note.findByIdAndDelete(request.params.id);
   request.flash('success_msg', 'Nota Eliminada Correctamente');
   response.redirect('/notes');
}

module.exports = notesCtrl;