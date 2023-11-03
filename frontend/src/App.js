
import Home from './components/Home';
import './App.css';
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadedFiles from './components/UploadedFiles';
import { PdfContextProvider } from './context/PdfContext';





function App() {
  
  return (
   <>
   <PdfContextProvider>
      <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/uploadedfiles" element={<UploadedFiles/>}/>
        </Routes>
      </Router>
    </div>
    </PdfContextProvider>
   </>


    
);
}

export default App;
