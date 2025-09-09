import React, {useState} from 'react'
import '../styles/MainDisplay.css'

function MainDisplay(){
    const hours: string[] = [];
    for (let i = 1; i < 12; i++) hours.push(i.toString()+'AM');
    for (let i = 1; i < 11; i++) hours.push(i.toString()+'PM');
    return (
        <div className = 'main-display-container'>
            <div className = 'main-display-date'>
            </div>
            <div className = 'main-display-timeline'>
                {hours.map((hour: string) => (
                    <div className="hours">{hour}</div>  
                ))};
                {/* <div className='events'>
                    <br/> Brush your teeth
                </div> */}
            </div>
        </div>
    );
}
export default MainDisplay;