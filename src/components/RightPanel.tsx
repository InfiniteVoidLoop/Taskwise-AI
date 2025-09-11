import { useEffect, useState } from 'react'
import '../styles/RightPanel.css';
import { useListNoteStore } from '../store';

function RightPanel() {
    const { listNote } = useListNoteStore();

    const [counter, setCounter] = useState<Record<string, number>>({
        working: 0,
        learning: 0,
        health: 0,
        entertaining: 0,
        others: 0
    });

    useEffect(() => {
        const newCounter: Record<string, number> = {
            working: 0,
            learning: 0,
            health: 0,
            entertaining: 0,
            others: 0
        };

        listNote.forEach((note) => {
            newCounter[note.type] = newCounter[note.type] + 1;
        });

        setCounter(newCounter); 
    }, [listNote]); 
    return (
        <div className="right-panel-container">
            <div className='right-panel-categories'>
                Categories
            </div>
            <div className='categories-grid'>
                <div className="right-panel-working">
                    Working
                    <div className='count'>
                        {counter['working']}
                    </div>
                </div>
                <div className='right-panel-learning'>
                    Learning
                    <div className='count'>
                        {counter['learning']}
                    </div>
                </div>
                <div className='right-panel-health'>
                    Health
                    <div className='count'>
                        {counter['health']}
                    </div>
                </div>
                <div className='right-panel-entertaining'>
                    Entertaining
                    <div className='count'>
                        {counter['entertaining']}
                    </div>
                </div>
                <div className='right-panel-others'>
                    Others
                    <div className='count'>
                        {counter['others']}
                    </div>
                </div>
            </div>
            <div className='progress-container'>
                <div className='right-panel-progress'>
                    Progress
                </div>
                <div className='right-panel-finish-task'>
                    4/7
                </div>
            </div>
        </div>
    );
};

export default RightPanel;