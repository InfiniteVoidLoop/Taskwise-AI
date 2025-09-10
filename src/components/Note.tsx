import React from 'react'
import type{Note} from '../utils/interface'
import '../styles/Note.css'

function NoteComponent(props: Note){
    return (
        <li key = {props.timestamp} className = "note-container">
            <div className = "note-content">
                <div className = "note-title">
                    {props.title}
                </div>
                <div className = "note-preview"> 
                    {props.description}
                </div>
            </div>
            <div className = "note-action">
                <button className = "delete-button">
                    🗑️
                </button>
            </div>
        </li>
    );
}

export default NoteComponent;