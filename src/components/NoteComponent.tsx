import React, { use } from 'react'
import type{Note} from '../utils/interface'
import '../styles/Note.css'
import {deleteNote} from '../models/firebase'
import {useVisibilityStore} from '../store'
import {useCurrentNoteStore} from '../store'

type NoteProps = Note & {
    deleteNote: (timestamp: number) => void
}

function NoteComponent(props: NoteProps){
    const {setNote} = useCurrentNoteStore();
    const {setShow} = useVisibilityStore();
    
    const handleClickNote = () => {
        setNote({
            title: props.title, 
            description: props.description,
            timestamp: props.timestamp
        });
        setShow();    
    };

    const handleClickDeleteButton = async (timestamp: number) => {
        const respond = await deleteNote('phuc', timestamp);
        if (respond) props.deleteNote(timestamp);
    };

    return (
        <li key = {props.timestamp} className = "note-container" onClick = {() => handleClickNote()}>
            <div className = "note-content">
                <div className = "note-title">
                    {props.title}
                </div>
                <div className = "note-preview"> 
                    {props.description}
                </div>
            </div>
            <div className = "note-action">
                <button className = "delete-button" onClick = {() => handleClickDeleteButton(props.timestamp)} >
                    🗑️
                </button>
            </div>
        </li>
    );
}

export default NoteComponent;