import React, { useEffect } from 'react'
import '../styles/StickyNote.css'
import { addNote, deleteNote, fetchNote } from '../models/firebase'
import { useListNoteStore } from '../store';
import NoteComponent from './NoteComponent'

function StickyNote() {
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
        <div className="sticky-note-container">
            <div className="sitcky-note-header">
                <div className='sticky-note-title'>
                    Your list
                </div>
                <button className='sticky-note-add-button'
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
export default StickyNote;