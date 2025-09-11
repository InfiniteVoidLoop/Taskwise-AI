import React from 'react'
import type{Note} from '../utils/interface'
import '../styles/NoteComponent.css'
import {deleteNote} from '../models/firebase'
import {useVisibilityStore} from '../store'
import {useCurrentNoteStore, useCacheNoteStore} from '../store'

type NoteProps = Note & {
    deleteNote: (timestamp: number) => void
}

function NoteComponent(props: NoteProps){
    const {currentNote, setNote} = useCurrentNoteStore();
    const {setCache} = useCacheNoteStore();
    const {setShow} = useVisibilityStore();
    
    const handleClickNote = () => {
        setNote({
            title: props.title, 
            description: props.description,
            timestamp: props.timestamp,
            type: props.type
        });
        setCache({
            title: props.title, 
            description: props.description,
            timestamp: props.timestamp,
            type: props.type
        });
        setShow();    
    };

    const handleClickDeleteButton = async (event: React.MouseEvent<HTMLButtonElement>, timestamp: number) => {
        event.stopPropagation();
        const respond = await deleteNote('phuc', timestamp);
        if (respond) props.deleteNote(timestamp);
    };

    const getCategoryClass = () => {
        if (props.timestamp === currentNote?.timestamp){
            return `note-container note-container-${currentNote.type}`;
        }
        else if (props.type) {
            return `note-container note-container-${props.type}`;
        }
        return "note-container";
    };

    return (
        <li key = {props.timestamp} className = {getCategoryClass()} onClick = {() => handleClickNote()}>
            <div className = "note-content">
                <div className = "note-title">
                    {props.timestamp === currentNote?.timestamp ? currentNote.title: props.title}
                </div>
                <div className = "note-preview"> 
                    {props.timestamp === currentNote?.timestamp ? currentNote.description: props.description}
                </div>
            </div>
            <div className = "note-action">
                <button className = "delete-button" onClick = {(e) => handleClickDeleteButton(e, props.timestamp)} >
                    🗑️
                </button>
            </div>
        </li>
    );
}

export default NoteComponent;