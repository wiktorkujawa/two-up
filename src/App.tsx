import React, { 
  useState 
} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import CHeader from './components/organisms/CHeader';
import CNavMenu from './components/organisms/CNavMenu';
import { ReactComponent as MenuIcon} from './assets/icons/menu.svg'

function App() {

  const [ isOpened, setIsOpened ] = useState(false);
  return (
      <Router>
      <CHeader />
      <CNavMenu isOpened={isOpened}/>

      <button onClick={() => setIsOpened(!isOpened)} className="md:hidden absolute top-4 right-4 w-8"> 
      {
        isOpened ? <div className="text-h3">&times;</div> : <MenuIcon/>
      }
        
      </button>
        <main className='min-h-screen'>
        <div className='h-16'/> 
          <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="about" element={ <About/> }/>
          </Routes>
          <div className='h-10'/>
        </main>
      {/* <CFooter/> */}
      </Router>
  );
}

export default App;