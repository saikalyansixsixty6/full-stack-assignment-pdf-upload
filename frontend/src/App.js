
import { useState } from 'react';
import './App.css';

import PdfExtractor from './components/PdfExtractor';
import PdfViewer from './components/PdfViewer';


function App() {
  const [pdfArrayBuffer, setPdfArrayBuffer] = useState(null);
  const [title,setTitle] = useState("")
  
  const onSubmit = (e)=>{
    e.preventDefault()
  }
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const arrayBuffer = await readAsyncFile(file);
      setPdfArrayBuffer(arrayBuffer);
    }
  };

  const readAsyncFile = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  return (
   <div> 
    <div className="flex flex-row justify-center">
      <form className="flex-column justify-center border-solid border-slate-700 border-2 p-6" onSubmit={onSubmit}>
        <h1 className='text-lg text-black font-bold text-center'>Upload Pdf in React</h1>
        <br />
        <input
          type="text"
          className="mt-2 p-2 border-2 border-black rounded-md my-2 w-100"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="file"
          className='mt-2 p-2 border-2 border-black rounded-md my-2 w-100'
          accept="application/pdf"
          required
          onChange={handleFileChange}
        />
        <br />
        <button class="bg-blue-600 w-20 text-white rounded-sm font-bold p-2 text-center align-center" type="submit">
          upload
        </button>
      </form>
    </div>
    <div className='flex justify-center'>
    {pdfArrayBuffer && <PdfViewer pdfArrayBuffer={pdfArrayBuffer} />}
    </div>
    <div>
    {pdfArrayBuffer && (
      <PdfExtractor
        pdfArrayBuffer={pdfArrayBuffer}/>)}
    </div>
   </div>



    

  

    
    
      );
}

export default App;
