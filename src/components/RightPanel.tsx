import React, { useEffect } from 'react'
import '../styles/RightPanel.css'
import { addNote, deleteNote, fetchNote } from '../models/firebase'
import { useListNoteStore } from '../store';
import NoteComponent from './NoteComponent'

function RightPanel() {
    const { listNote, setListNote, addListNote } = useListNoteStore();

    const fetchData = async () => {
        const response = await fetchNote('phuc');
        setListNote(response);
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="right-panel-container">
            <div className="right-panel-header">
                <div className='right-panel-title'>
                    Your list
                </div>
                <button className='right-panel-add-button'
                    onClick={() => addListNote({
                        title: '',
                        description: '',
                        timestamp: Date.now()
                    })}
                >+</button>
            </div>
            {listNote.map((note) => (
                <NoteComponent title={note.title}
                    description={note.description}
                    timestamp={note.timestamp}
                />
            ))}
        </div>
    );
}
export default RightPanel;