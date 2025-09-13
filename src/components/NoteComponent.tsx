import React, { useEffect, useRef } from 'react'
import type { Note } from '../utils/interface'
import { deleteNote, updataMarkNote } from '../models/firebase'
import { useVisibilityStore, useListTimestamp, useUserUIDStore, useListNoteStore } from '../store'
import { useCurrentNoteStore, useCacheNoteStore, useProgressStore, useRedDateStore, useGreenDateStore } from '../store'
import dayjs from 'dayjs'

type NoteProps = Note & {
    deleteNote: (timestamp: number) => void
}

function NoteComponent(props: NoteProps) {
    const { popTimestamp } = useListTimestamp();
    const { currentNote, setNote } = useCurrentNoteStore();
    const { setCache } = useCacheNoteStore();
    const { setShow } = useVisibilityStore();
    const { unDone, dec, inc, done } = useProgressStore();
    const { pushFinishedDate, popFinishedDate } = useGreenDateStore();
    const { pushUnfinishedDate, popUnfinishedDate } = useRedDateStore();
    const { userUID } = useUserUIDStore();
    const unDonePrev = useRef<number>(unDone);
    const { setNoteInList } = useListNoteStore();

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

    useEffect(() => {
        if (unDone === 0 && done === 0) {
            if (unDonePrev.current === 0)
                popFinishedDate(dayjs(props.timestamp));
            else
                popUnfinishedDate(dayjs(props.timestamp));
            return;
        }
        if (unDone === 0) {
            popUnfinishedDate(dayjs(props.timestamp));
            pushFinishedDate(dayjs(props.timestamp));
        }
        else {
            if (unDonePrev.current === 0) {
                popFinishedDate(dayjs(props.timestamp))
            }
            pushUnfinishedDate(dayjs(props.timestamp));
        }
        unDonePrev.current = unDone
    }, [unDone, done])
    const handleClickDeleteButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        try {
            const isChecked = props.marked
            if (isChecked)
                dec('done');
            else
                dec('unDone');

            const respond = await deleteNote(userUID, props.timestamp);

            if (respond) {
                popTimestamp(props.timestamp);
                props.deleteNote(props.timestamp);

            } else {
                console.error('Failed to delete note from database');
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };
    const getCategoryClass = () => {
        if (props.timestamp === currentNote?.timestamp) {
            return `note-container note-container-${currentNote.type}`;
        }
        else if (props.type) {
            return `note-container note-container-${props.type}`;
        }
        return "note-container";
    };

    const handleCheckBox = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
        const checked = (e.currentTarget as HTMLInputElement).checked;
        updataMarkNote(userUID, props.timestamp, checked);
        if (checked) {
            inc('done');
            dec('unDone');
        }
        else if (!checked) {
            dec('done');
            inc('unDone');
        }
        setNoteInList({
            title: props.title,
            description: props.description,
            timestamp: props.timestamp,
            type: props.type,
            marked: checked
        })
    };

    return (
        <li key={props.timestamp} className={getCategoryClass()} onClick={() => handleClickNote()}>
            <div className="note-content">
                <div className="note-title">
                    {props.timestamp === currentNote?.timestamp ? currentNote.title : props.title}
                </div>
                <div className="note-preview">
                    {props.timestamp === currentNote?.timestamp ? currentNote.description : props.description}
                </div>
            </div>
            <div className="note-action">
                <button className="delete-button" onClick={(e) => handleClickDeleteButton(e)} >
                    🗑️
                </button>
            </div>
            <input type="checkbox" defaultChecked={props.marked} className='note-check-box' onClick={(e) => handleCheckBox(e)} />
        </li>
    );
}

export default NoteComponent;