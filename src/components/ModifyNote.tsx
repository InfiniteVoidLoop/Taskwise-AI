import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import '../styles/ModifyNote.css'
import type { ModifyNotePos } from '../utils/interface';
import { useVisibilityStore, useCurrentNoteStore, useListNoteStore, useCacheNoteStore, useListTimestamp} from '../store';
import { addNote } from '../models/firebase';
import { useProgressStore } from '../store';
import { useRedDateStore} from '../store';
import { useGreenDateStore } from '../store';
import { useDateMonthStore } from '../store';

import dayjs from 'dayjs'

function ModifyNote(props: ModifyNotePos) {
    const { visibility, setHide } = useVisibilityStore()
    const { currentNote, setTitle, setDescription, setNote, setType} = useCurrentNoteStore();
    const { setNoteInList } = useListNoteStore();
    const {cacheNote} = useCacheNoteStore();
    const {pushTimestamp} = useListTimestamp();

    const {inc, unDone} = useProgressStore();
    const {pushUnfinishedDate} = useRedDateStore();
    const { popFinishedDate} = useGreenDateStore();

    const handleCancel = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (cacheNote)
            setNote(cacheNote);
        setHide();
    };

    const handleTitleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(target.value);
    };
    const handleDescriptionChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(target.value)
    };
    const handleSave = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentNote?.title && currentNote?.description && currentNote?.timestamp) {
            pushTimestamp(currentNote.timestamp);
            const response = await addNote(
                'phuc',
                currentNote.title,
                currentNote.description,
                currentNote.timestamp,
                currentNote.type, 
            );
            if (response !== 3) {
                setHide();
                setNoteInList({
                    title: currentNote.title,
                    description: currentNote.description,
                    timestamp: currentNote.timestamp, 
                    type: currentNote.type,
                    marked: currentNote.marked
                });
                if (response === 2){
                    if (unDone === 0){
                        popFinishedDate(dayjs(currentNote.timestamp));
                        pushUnfinishedDate(dayjs(currentNote.timestamp));
                    }
                    inc('unDone');
                }
            }
        } else {
            console.error('Missing required note data');
            return;
        }
    };

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'draggable',
    });

    const style = {
        position: "absolute" as const,
        left: props.x + (transform?.x || 0),
        top: props.y + (transform?.y || 0),
    };

    if (!visibility) return null;
    return (
        <div className={`modify-note-container large modify-note-${currentNote?.type}`}
            style={style}
            ref={setNodeRef}
            {...attributes}
        >
            <div
                className="drag-handle"
                style={{
                    cursor: 'grab',
                    padding: '8px',
                    backgroundColor: '#f0f0f0',
                    borderBottom: '1px solid #ddd'
                }}
                {...listeners}
            >
                ⋮⋮ Drag to move
            </div>
            <input className="modify-note-title" onChange={handleTitleChange}
                value={currentNote?.title || ""} />
            <textarea className="modify-note-description" onChange={handleDescriptionChange}
                value={currentNote?.description || ""} 
                placeholder="Write your note description here..."
            />
            <select className = "select-note-type" onChange = {(e) => setType(e.target.value)}>
                <option value = 'working'>Working</option>
                <option value = 'learning'>Learning</option>
                <option value = 'health'>Health</option>
                <option value = 'entertaining' >Entertaining</option>
                <option value = 'others'>Others</option>
            </select>
            <button className="modify-note-save-button"
                onClick={handleSave}>
                Save
            </button>
            <button className="modify-note-cancel-button"
                onClick={handleCancel}
                style={{ cursor: 'pointer' }}>
                Cancel
            </button>
        </div>
    );
}
export default ModifyNote;