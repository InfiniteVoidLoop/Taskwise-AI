import React, {useEffect} from 'react'
import '../styles/RightPanel.css'
import {addNote, deleteNote, fetchNote} from '../models/firebase'
import {useListNoteStore} from '../store';
import NoteComponent from './Note'

function RightPanel(){
    const {listNote, setListNote, addListNote} = useListNoteStore();

    const fetchData = async () => {
        const response = await fetchNote('phuc');
        console.log(response);
        setListNote(response);
    }

    useEffect(() => {
       fetchData();
    }, []);

    return(
        <div className = "right-panel-container">
            <div className = "right-panel-header">
                <div className = 'right-panel-title'>
                    Your list
                </div>
                <button className = 'right-panel-add-button'
                        onClick={() => addNote('phuc', 'hi', 'I love you', 132)}
                >+</button>
            </div>  
            {/* <div className = "right-panel-list-container"> */}
                {listNote.map((note) => (
                    <NoteComponent title = {note.title}
                        description = {note.description}
                        timestamp = {note.timestamp}
                    />
                ))}
            {/* </div> */}
        </div>
    );
}
export default RightPanel;