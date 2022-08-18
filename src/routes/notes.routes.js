const {Router} = require('express');
const router = Router();
const {renderNoteForm,
      createNewNote, 
      renderAllNotes,
      renderEditNote,
      updateNote,
      deleteNote
   } = require('../controllers/notes.controller');


const {isAuthenticated} = require('../helpers/auth');

router.get('/notes/add',isAuthenticated,renderNoteForm);
router.post('/notes/new-note',isAuthenticated,createNewNote);
//ALL NOTES
router.get('/notes',isAuthenticated,renderAllNotes);
// edit note 
router.get('/notes/edit/:id',isAuthenticated,renderEditNote);
router.put('/notes/edit/:id',isAuthenticated,updateNote);
// borrar note
router.delete('/notes/delete/:id',isAuthenticated,deleteNote);

module.exports = router;