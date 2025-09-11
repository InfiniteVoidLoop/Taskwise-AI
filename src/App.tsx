import './App.css'
import hackathonGraphic from './assets/hackathon-graphic.svg'
import naverLogo from './assets/naver-logo.svg'
import LeftPanel from './components/LeftPanel.tsx'
import StickyNote from './components/StickyNote.tsx'
import RightPanel from './components/RightPanel.tsx'
import ModifyNote from './components/ModifyNote.tsx'
import {DndContext} from '@dnd-kit/core';
import {useState} from 'react'
import type{ DragEndEvent } from '@dnd-kit/core'

function App() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta } = event;
    setPos((prev) => ({
      x: prev.x + delta.x,
      y: prev.y + delta.y,
    }));
  };

  return (
    <>
      <LeftPanel/>  
      <RightPanel/>
      <StickyNote/>
      <DndContext onDragEnd={handleDragEnd}>
        <ModifyNote x={pos.x} y={pos.y}/>
      </DndContext>
    </>
  )
}

export default App