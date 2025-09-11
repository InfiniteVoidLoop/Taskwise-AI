import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import '../styles/ModifyNote.css'
import type { ModifyNotePos } from '../utils/interface';
import { useVisibilityStore, useCurrentNoteStore } from '../store';
import { addNote } from '../models/firebase';

function ModifyNote(props: ModifyNotePos) {
    const { visibility, setHide } = useVisibilityStore()
    const { currentNote, setTitle, setDescription } = useCurrentNoteStore();

    const handleCancel = (e: React.MouseEvent) => {
        e.stopPropagation();
        setHide();
    };
    const handleTitleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(target.value);
    };
    const handleDescriptionChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(target.value)
    };
    const handleSave = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentNote?.title && currentNote?.description && currentNote?.timestamp) {
            const response = await addNote(
                'phuc',
                currentNote.title,
                currentNote.description,
                currentNote.timestamp
            );
            if (response) setHide();
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
        <div className='modify-note-container large'
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
            value={currentNote?.title || ""}/>
            <input className="modify-note-description" onChange={handleDescriptionChange} 
            value={currentNote?.description || ""} />
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