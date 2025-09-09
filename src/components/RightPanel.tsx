import React from 'react'
import '../styles/RightPanel.css'
function RightPanel(){
    return(
        <div className = "right-panel-container">
            <div className = "right-panel-header">
                <div className = 'right-panel-title'>
                    Your list
                </div>
                <button className = 'right-panel-add-button'>+</button>
            </div>
            <div className = "right-panel-list">

            </div>
        </div>
    );
}
export default RightPanel;