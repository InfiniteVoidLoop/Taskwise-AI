import React from 'react'
import '../styles/RightPanel.css'
import {addNote, deleteNote} from '../models/firebase'

function RightPanel(){
    return(
        <div className = "right-panel-container">
            <div className = "right-panel-header">
                <div className = 'right-panel-title'>
                    Your list
                </div>
                <button className = 'right-panel-add-button'
                        onClick={() => deleteNote('phuc', 323131)}
                >+</button>
            </div>  
            <div className = "right-panel-list">

            </div>
        </div>
    );
}
export default RightPanel;