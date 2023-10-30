
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
    <div className="App">
      <form className="formStyle" onSubmit={onSubmit}>
        <h4>Upload Pdf in React</h4>
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="file"
          class="form-control"
          accept="application/pdf"
          required
          onChange={handleFileChange}
        />
        <br />
        <button class="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      
      {pdfArrayBuffer && <PdfViewer pdfArrayBuffer={pdfArrayBuffer} />}
      {pdfArrayBuffer && (
        <PdfExtractor
          pdfArrayBuffer={pdfArrayBuffer}
          
        />
      )}
    </div>
  );
}

export default App;
