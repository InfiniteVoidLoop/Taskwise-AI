import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { ModifyNotePos, Note } from '../utils/interface';
import { useVisibilityStore, useCurrentNoteStore, useListNoteStore, useCacheNoteStore, useListTimestamp } from '../store';
import { useDateMonthStore, useProgressStore, useRedDateStore, useGreenDateStore, useUserUIDStore } from "../store";
import { addNote } from '../models/firebase';
import dayjs, { Dayjs } from 'dayjs'

export const onSaveForTool = async (
    userUID: string,
    note: Note,
    dateMonth: Dayjs,
    actions: {
        addListNote: (note: Note) => void;
        pushTimestamp: (timestamp: number) => void;
        pushUnfinishedDate: (date: dayjs.Dayjs) => void;
        popFinishedDate: (date: dayjs.Dayjs) => void;
        setHide: () => void;
        inc: (type: 'done' | 'unDone') => void;
        setNoteInList: (note: Note) => void;
        unDone: number;
    }
): Promise<string> => {
    try {
        actions.pushTimestamp(note.timestamp);

        const response = await addNote(
            userUID,
            note.title,
            note.description,
            note.timestamp,
            note.type
        );

        if (response !== 3) {
            actions.setHide();
            actions.setNoteInList({ ...note });

            if (response === 2) {
                actions.popFinishedDate(dayjs(note.timestamp));
                actions.pushUnfinishedDate(dayjs(note.timestamp));
                if (dayjs(note.timestamp).isSame(dateMonth, 'day')){
                    actions.inc("unDone");
                    actions.addListNote(note);
                }
            }

            return `Note "${note.title}" successfully saved!`;
        } else {
            return `Failed to save note "${note.title}".`;
        }
    } catch (error) {
        console.error("Error saving note:", error);
        throw new Error(`Failed to save note: ${error}`);
    }
};

function ModifyNote(props: ModifyNotePos) {
    const { visibility, setHide } = useVisibilityStore()
    const { currentNote, setTitle, setDescription, setNote, setType } = useCurrentNoteStore();
    const { setNoteInList, addListNote } = useListNoteStore();
    const { cacheNote } = useCacheNoteStore();
    const { pushTimestamp } = useListTimestamp();
    const { userUID } = useUserUIDStore();
    const { dateMonth } = useDateMonthStore();

    const { inc, unDone } = useProgressStore();
    const { pushUnfinishedDate } = useRedDateStore();
    const { popFinishedDate } = useGreenDateStore();

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
        if (!currentNote?.title || !currentNote?.timestamp || !currentNote?.type) {
            console.error("Missing required note fields");
            return;
        }
        await onSaveForTool(
            userUID,
            currentNote,
            dateMonth,
            {
                addListNote,
                pushTimestamp,
                pushUnfinishedDate,
                popFinishedDate,
                setHide,
                inc,
                setNoteInList,
                unDone
            }
        );
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
                Drag to move
            </div>
            <input className="modify-note-title" onChange={handleTitleChange}
                value={currentNote?.title || ""} />
            <textarea className="modify-note-description" onChange={handleDescriptionChange}
                value={currentNote?.description || ""}
                placeholder="Write your note description here..."
            />
            <select className="select-note-type" onChange={(e) => setType(e.target.value)}>
                <option value='working'>Working</option>
                <option value='learning'>Learning</option>
                <option value='health'>Health</option>
                <option value='entertaining' >Entertaining</option>
                <option value='others'>Others</option>
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
