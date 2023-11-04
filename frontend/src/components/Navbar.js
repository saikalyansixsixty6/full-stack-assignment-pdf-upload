import React from 'react';
import { Link } from 'react-router-dom';
// import { usePdfContext } from '../context/PdfContext';



function Navbar() {
  // const {setAllPdfs} = usePdfContext()
  
  

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-white text-2xl font-bold">Home</Link>
        <Link to="/uploadedfiles" className="text-white text-xl font-bold">Uploaded Files</Link>
        <Link to="/"><button className='text-white text-xl font-bold'>logout</button></Link>
      </div>
    </nav>
  );
}

export default Navbar;
