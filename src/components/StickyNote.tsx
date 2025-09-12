import { useEffect } from 'react'
import '../styles/StickyNote.css'
import {fetchNote, getDateState } from '../models/firebase'
import {useProgressStore, useListNoteStore, useDateMonthStore, useGreenDateStore, useRedDateStore} from '../store';
import NoteComponent from './NoteComponent'
import dayjs from 'dayjs'

function StickyNote() {
    const { listNote, setListNote, addListNote, deleteListNote} = useListNoteStore();
    const {dateMonth} = useDateMonthStore();
    const {inc, reset} = useProgressStore();
    const {pushFinishedDate} = useGreenDateStore();
    const {pushUnfinishedDate} = useRedDateStore();

    const fetchData = async () => {
        const response = await fetchNote('phuc', dateMonth);  
        reset();
        response.forEach((note) => {
            if (note.marked) inc('done');
            else inc('unDone');
        })     
        setListNote(response);
    };
    
    useEffect(() => {
        const fetchDateStates = async () => {
            try {
                const res = await getDateState('phuc');
                // Handle the response data
                res.finishedDate.forEach(date => pushFinishedDate(dayjs(date)));
                res.unFinishedDate.forEach(date => pushUnfinishedDate(dayjs(date)));
            } catch (error) {
                console.error('Error fetching date states:', error);
            }
        };

        fetchDateStates();
    }, []);

    useEffect(() => {
        fetchData();
    }, [dateMonth]);

    const handleClickAddButton = () => {
        addListNote({title: '', description: '', timestamp: Date.now(), type: 'working', marked: false});
    };
    return (
        <div className="sticky-note-container">
            <div className="sitcky-note-header">
                <div className='sticky-note-title'>
                    My To-Do-List
                </div>
                <button className='sticky-note-add-button'
                   onClick = {handleClickAddButton}
                >+</button> 
            </div>
            {listNote.map((note) => (
                <NoteComponent title={note.title}
                    description={note.description}
                    timestamp={note.timestamp}
                    type={note.type}
                    marked={note.marked}
                    deleteNote={deleteListNote}
                />
            ))}
        </div>
    );
}
export default StickyNote;