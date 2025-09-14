import { addNote, deleteNote, fetchNote,  updataMarkNote, getDateState, deleteAccountData} from './controllers.js';

async function addNoteHandler(req, res){
    try{
        const {username, title, description, timestamp, type} = req.body;
        const response = await addNote(username, title, description, timestamp, type);
        if (response !== 3 ){
            res.status(200).json(response);
        }
        else{
            res.status(500).json({error: 'Failed to add note'});
        }
    }catch(error){
        console.error('Error in add note');
        throw error;
    };
}

async function updateMarkNoteHandler(req, res){
    try{
        const {username, timestamp, marked} = req.body;
        const response = await updataMarkNote(username, timestamp, marked);
        if (response){
            res.status(200).json({message: 'Update marked note sucessfully'});
        }
        else{
            res.status(500).json({message: 'Failed to update marked note'});
        }
    }catch(error){
        console.error(error);
        throw error;
    }
    
}
async function deleteNoteHandler(req, res){
    try{
        const {username, timestamp} = req.body;
        const response = await deleteNote(username, timestamp);
        if (response){
            res.status(200).json({message: 'Note delete successfully'});
        }
        else{
            res.status(500).json({message: 'Failed to delete note'});
        }
    }catch(error){
        console.error(error);
        throw error;
    }
}

async function fetchNoteHandler(req, res){
    try{
        const {username, dateMonth} = req.body;
        const response = await fetchNote(username, dateMonth);
        if (response){
            res.status(200).json(response);
        }
        else{
            res.status(500).json({message: 'Failed to fetch note'});
        }
    }catch(error){
        console.error(error);
        throw error;
    }
}

async function getDateStateHandler(req, res){
    try{
        const {username} = req.body;
        const response = await getDateState(username);
        if (response){
            res.status(200).json(response);
        }
        else{
            res.status(500).json({message: 'Failed to get state of dates'});
        }
    }catch(error){
        throw error;
    }
}

async function deleteAccountDataHandler(req, res){
    try{
        const response = await deleteAccountData();
        if (response){
            res.status(200).json({message: 'Delete account successfully'});
        }
        else{
            res.status(400).json({message: 'Failed to delete account'});
        }
    }catch(error){
        throw error;
    }
}

export {addNoteHandler, updateMarkNoteHandler, deleteNoteHandler, fetchNoteHandler, getDateStateHandler, deleteAccountDataHandler};