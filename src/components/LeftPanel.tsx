import Calendar from './Calendar'
import '../styles/LeftPanel.css'
import naverLogo from '../assets/to-do-list.png';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useViewNoteStore } from '../store';

function LeftPanel() {
    const { typeView, setView } = useViewNoteStore();

    return (
        <div className="left-panel-container">
            <div className="left-panel-heading">
                To-Do-List App
            </div>
            <img src={naverLogo} className="to-do-list-image" alt="To-do-list logo" />
            <div className="left-panel-date-container">
                <div className="my-planned">My Planned</div>
                <Calendar />
                <div className="calendar-legend">
                    <div className="legend-item">
                        <span className="legend-color unfinished"></span>
                        <span className="legend-text">Unfinished Day</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-color finished"></span>
                        <span className="legend-text">Finished Day</span>
                    </div>
                </div>
            </div>
            <div className='display-checkbox'>
                <FormControlLabel
                    control={
                        <Checkbox
                            color="secondary"
                            checked={typeView === 1}
                            onChange={() => setView(1)}
                        />
                    }
                    label="Done"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            color="secondary"
                            checked={typeView === 2}
                            onChange={() => setView(2)}
                        />
                    }
                    label="Undone"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            color="secondary"
                            checked={typeView === 3}
                            onChange={() => setView(3)}
                        />
                    }
                    label="All"
                />
            </div>
        </div>
    );
}
export default LeftPanel;