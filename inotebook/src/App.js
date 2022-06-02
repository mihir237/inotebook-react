import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import About from "./components/About"
import Home from "./components/Home"
import NoteState from "./context/notes/NoteState"
import Alert from './components/Alert';
import Signin from './components/Signin';
import Login from './components/Login';

function App() {
const [alert, setAlert] = useState(null)  
const  showAlert = (message, type)=>{
  setAlert({
    msg:message,
    type: type
  }) 
  setTimeout(()=>{
    setAlert(null);
  },1500)
}
  return (
    <BrowserRouter>
      <NoteState>

        <Navbar />
        <Alert alert={alert}/>
        <div className='container my-4'>

          <Routes>
            <Route path='/' element={<Home showAlert={showAlert} />} />
            <Route path='/about' element={<About />} />
            <Route path='/signin' element={<Signin showAlert={showAlert}/>}/>
            <Route path='/login' element={<Login showAlert={showAlert}/>}/>            
          </Routes>
        </div>
      </NoteState>
    </BrowserRouter>

  );
}

export default App;
