import React, { useState } from 'react'
import Calendar from './Calendar'
import '../styles/LeftPanel.css'

function LeftPanel() {      
    return (    
        <div className="left-panel-container">
            <div className="left-panel-heading">
                Hackathon To-Do-List App
            </div>
            <div className="left-panel-date-container">
                <div className="my-planned">My Planned</div>
                <Calendar />
            </div>
        </div>  
    );
}
export default LeftPanel;