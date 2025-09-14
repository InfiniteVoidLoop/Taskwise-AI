import express from 'express';
import {addNoteHandler, updateMarkNoteHandler, deleteNoteHandler, fetchNoteHandler, getDateStateHandler, deleteAccountDataHandler} from './handlers.js';

const noteRouter = express.Router();

noteRouter.post('/addNote', addNoteHandler);
noteRouter.post('/updateMarkNote', updateMarkNoteHandler);
noteRouter.post('/deleteNote', deleteNoteHandler);
noteRouter.post('/fetchNote', fetchNoteHandler);
noteRouter.post('/getDateState', getDateStateHandler);
noteRouter.delete('/deleteAccount', deleteAccountDataHandler);

export {noteRouter};