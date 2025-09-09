import './App.css'
import hackathonGraphic from './assets/hackathon-graphic.svg'
import naverLogo from './assets/naver-logo.svg'
import LeftPanel from './components/LeftPanel.tsx'
import MainDisplay from './components/MainDisplay.tsx'
import RightPanel from './components/RightPanel.tsx'

function App() {
  return (
    <>
      <LeftPanel/>  
      <MainDisplay/>
      <RightPanel/>
    </>
  )
}

export default App