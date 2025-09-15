import { useEffect, useState } from 'react'
import type { Note } from '../utils/interface';

import { useListTimestamp, useProgressStore, useListNoteStore, useDateMonthStore, useGreenDateStore, useRedDateStore, useUserUIDStore } from '../store';
import NoteComponent from './NoteComponent'
import dayjs from 'dayjs'
import generateTimestamp from '../utils/generateTimestamp';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useViewNoteStore } from '../store';

function StickyNote() {
    const { typeView } = useViewNoteStore();
    const { listNote, setListNote, addListNote, deleteListNote } = useListNoteStore();
    const { dateMonth } = useDateMonthStore();
    const { inc, reset } = useProgressStore();
    const { pushFinishedDate } = useGreenDateStore();
    const { pushUnfinishedDate } = useRedDateStore();
    const { pushTimestamp, listTimestamp } = useListTimestamp();
    const { userUID } = useUserUIDStore();
    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        const response = await axios.post('https://taskwise-ai.onrender.com/note/fetchNote', {
            username: userUID,
            dateMonth: dateMonth
        })
        reset();
        response.data.forEach((note: Note) => {
            if (note.marked) inc('done');
            else inc('unDone');
            pushTimestamp(note.timestamp);
        })
        setListNote(response.data);

        setLoading(false);
    };
    const fetchDateStates = async () => {
        try {
            setLoading(true);
            const res = await axios.post('https://taskwise-ai.onrender.com/note/getDateState', {
                username: userUID
            })
            res.data.finishedDate.forEach((date: string) => pushFinishedDate(dayjs(date)));
            res.data.unFinishedDate.forEach((date: string) => pushUnfinishedDate(dayjs(date)));

            setLoading(false);
        } catch (error) {
            console.error('Error fetching date states:', error);
            navigate('/login');
        }
    };
    useEffect(() => {
        fetchDateStates();
    }, []);

    useEffect(() => {
        fetchData();
    }, [dateMonth]);

    const handleClickAddButton = () => {
        addListNote({ title: '', description: '', timestamp: generateTimestamp(dateMonth, listTimestamp), type: 'working', marked: false });
    };
    if (isLoading) {
        return (
            <div className='sticky-note-loading'>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </div>
        )
    }
    return (
        <div className="sticky-note-container">
            <div className="sticky-note-header">
                <div className='sticky-note-title'>
                    {dateMonth?.format('DD MMMM YYYY')}
                </div>
                <button className='sticky-note-add-button'
                    onClick={handleClickAddButton}
                >Add New Note</button>
            </div>
            {listNote.map((note) => {
                if (typeView === 1 && note.marked === true) {
                    return (
                        <NoteComponent title={note.title}
                            description={note.description}
                            timestamp={note.timestamp}
                            type={note.type}
                            marked={note.marked}
                            deleteNote={deleteListNote}
                        />
                    )
                }
                else if (typeView === 2 && note.marked === false) {
                    return (
                        <NoteComponent title={note.title}
                            description={note.description}
                            timestamp={note.timestamp}
                            type={note.type}
                            marked={note.marked}
                            deleteNote={deleteListNote}
                        />
                    )
                }
                else if (typeView === 3) {
                    return (
                        <NoteComponent title={note.title}
                            description={note.description}
                            timestamp={note.timestamp}
                            type={note.type}
                            marked={note.marked}
                            deleteNote={deleteListNote}
                        />
                    )
                }
            })}
        </div>
    );
}
export default StickyNote;