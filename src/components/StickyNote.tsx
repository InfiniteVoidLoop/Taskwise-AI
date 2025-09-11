import { useEffect } from 'react'
import '../styles/StickyNote.css'
import {fetchNote } from '../models/firebase'
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
        addListNote({title: '', description: '', timestamp: Date.now(), type: 'working', marked: false});
    };
    return (
        <div className="sticky-note-container">
            <div className="sitcky-note-header">
                <div className='sticky-note-title'>
                    My To-Do-List
                </div>
                <button className='sticky-note-add-button'
                   onClick = {handleClickAddButton}
                >+</button> 
            </div>
            {listNote.map((note) => (
                <NoteComponent title={note.title}
                    description={note.description}
                    timestamp={note.timestamp}
                    type={note.type}
                    marked={note.marked}
                    deleteNote={deleteListNote}
                />
            ))}
        </div>
    );
}
export default StickyNote;