import Calendar from './Calendar'
import '../styles/LeftPanel.css'
import naverLogo from '../assets/to-do-list.png';

function LeftPanel() {      
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
            
        </div>  
    );
}
export default LeftPanel;