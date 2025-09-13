import './App.css'
import LeftPanel from './components/LeftPanel.tsx'
import StickyNote from './components/StickyNote.tsx'
import RightPanel from './components/RightPanel.tsx'
import ModifyNote from './components/ModifyNote.tsx'
import {DndContext} from '@dnd-kit/core';
import {useState} from 'react'
import type{ DragEndEvent } from '@dnd-kit/core'
import AddNote from './components/AddNote.tsx'
import Response from './components/Response.tsx'

function App() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [pos1, setPos1] = useState({x: 300, y: 50}); // Different position so components don't overlap
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { delta, active } = event;
    
    // Handle different draggable items
    if (active.id === 'draggable') {
      // ModifyNote component
      setPos((prev) => ({
        x: prev.x + delta.x,
        y: prev.y + delta.y,
      }));
    } else if (active.id === 'chat-bot-response') {
      // Response component
      setPos1((prev) => ({
        x: prev.x + delta.x,
        y: prev.y + delta.y,
      }));
    }
  };

  return (
    <>
      <AddNote/>
      <LeftPanel/>  
      <RightPanel/>
      <StickyNote/>
      <DndContext onDragEnd={handleDragEnd}>
        <ModifyNote x={pos.x} y={pos.y}/>
        <Response x={pos1.x} y={pos1.y}/>
      </DndContext>
    </>
  )
}

export default App