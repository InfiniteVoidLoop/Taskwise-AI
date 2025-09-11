import React, { useEffect } from 'react'
import '../styles/RightPanel.css'
import { addNote, deleteNote, fetchNote } from '../models/firebase'
import { useListNoteStore } from '../store';
import NoteComponent from './NoteComponent'

function RightPanel() {
    const { listNote, setListNote, addListNote, deleteListNote} = useListNoteStore();

    const fetchData = async () => {
        const response = await fetchNote('phuc');   
        setListNote(response);
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleClickAddButton = () => {
        addListNote({title: '', description: '', timestamp: Date.now()});
    };
    return (
        <div className="right-panel-container">
            <div className="right-panel-header">
                <div className='right-panel-title'>
                    Your list
                </div>
                <button className='right-panel-add-button'
                   onClick = {handleClickAddButton}
                >+</button> 
            </div>
            {listNote.map((note) => (
                <NoteComponent title={note.title}
                    description={note.description}
                    timestamp={note.timestamp}
                    deleteNote={deleteListNote}
                />
            ))}
        </div>
    );
}
export default RightPanel;