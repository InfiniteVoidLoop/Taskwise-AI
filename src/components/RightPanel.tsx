import React from 'react';
import '../styles/RightPanel.css';

function RightPanel(){
    return (
        <div className = "right-panel-container">
            <div className = 'right-panel-categories'>
                Categories
            </div>
            <div className = 'categories-grid'>
                <div className = "right-panel-working">
                    Working
                    <div className = 'count'>
                        12
                    </div>
                </div>
                <div className = 'right-panel-learning'>
                    Learning
                     <div className = 'count'>
                        12
                    </div>
                </div>
                <div className = 'right-panel-health'>
                    Health
                     <div className = 'count'>
                        12
                    </div>
                </div>
                <div className= 'right-panel-entertaining'>
                    Entertaining
                     <div className = 'count'>
                        12
                    </div>
                </div>
                <div className='right-panel-others'>
                    Others
                     <div className = 'count'>
                        12
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightPanel;