import React from 'react'
import type{Note} from '../utils/interface'
import '../styles/NoteComponent.css'
import {deleteNote, updataMarkNote} from '../models/firebase'
import {useVisibilityStore} from '../store'
import {useCurrentNoteStore, useCacheNoteStore, useProgressStore, useRedDateStore, useGreenDateStore} from '../store'
import dayjs from 'dayjs'

type NoteProps = Note & {
    deleteNote: (timestamp: number) => void
}

function NoteComponent(props: NoteProps){
    const {currentNote, setNote} = useCurrentNoteStore();
    const {setCache} = useCacheNoteStore();
    const {setShow} = useVisibilityStore();
    const {unDone, dec, inc} = useProgressStore();
    const {pushFinishedDate, popFinishedDate} = useGreenDateStore();
    const {pushUnfinishedDate, popUnfinishedDate} = useRedDateStore();

    const handleClickNote = () => {
        setNote({
            title: props.title, 
            description: props.description,
            timestamp: props.timestamp,
            type: props.type,
            marked: props.marked
        });
        setCache({
            title: props.title, 
            description: props.description,
            timestamp: props.timestamp,
            type: props.type, 
            marked: props.marked
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

    const handleCheckBox = (e: React.MouseEvent<HTMLInputElement>, timestamp: number) => {
        e.stopPropagation();
        const checked = (e.currentTarget as HTMLInputElement).checked;
        updataMarkNote('phuc', timestamp, checked);
        if (checked){
            inc('done');
            dec('unDone');
            if (unDone === 0){
                popUnfinishedDate(dayjs(timestamp));
                pushFinishedDate(dayjs(timestamp));
            }
        }
        else if (!checked) {
            dec('done');
            inc('unDone');
            pushUnfinishedDate(dayjs(timestamp));
            if (unDone != 1){
                popFinishedDate(dayjs(timestamp))
            }
        }
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
            <input type="checkbox" defaultChecked={props.marked} className='note-check-box' onClick = {(e) => handleCheckBox(e, props.timestamp)} />
        </li>
    );
}

export default NoteComponent;