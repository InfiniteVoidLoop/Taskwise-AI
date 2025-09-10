import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import '../styles/ModifyNote.css'

interface ModifyNote{
    x: number;
    y: number;
}

function ModifyNote(props: ModifyNote) {        
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'draggable',
    });

    const style = {
        position: "absolute" as const, 
        left: props.x + (transform?.x || 0),
        top: props.y + (transform?.y || 0),
    };


    return (
        <div className = 'modify-note-container'
            ref = {setNodeRef}
            style = {style}
            {...listeners}
            {...attributes}
        >
            <div className = "modify-note-title">
                {props.title}
            </div>
            <div className = "modify-note-description">
                {props.description}
            </div>
            <button className = "modify-note-save-button">
                Save
            </button>
            <button className = "modify-note-cancel-button">
                Cancel
            </button>
        </div>
        // <button ref={setNodeRef}
        //     style={style}
        //     {...listeners}  
        //     {...attributes}
        //     className="modify-note-text">
        //     testing
        // </button>
    );
}
export default ModifyNote;