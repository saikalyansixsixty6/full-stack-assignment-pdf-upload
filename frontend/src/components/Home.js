import { useState } from 'react';
import PdfExtractor from './PdfExtractor';
import PdfViewer from './PdfViewer';
import axios from "axios";


function Home() {
  const [pdfArrayBuffer, setPdfArrayBuffer] = useState(null);
  const [title,setTitle] = useState("");
  const [file,setFile] = useState("");
  
  
  
  
  const onSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title,file)
  
    try {
      const result = await axios.post("http://localhost:9000/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (result.data.status === "ok") {
        alert("Uploaded Successfully!!!");
      } else {
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading the file:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  const wholehandle = (e)=>{
    onChange(e);
    handleFileChange(e);
      
  }
  const onChange = (e)=>{
    setFile(e.target.files[0])
  }
  const handleFileChange = async(e) => {
    const file = e.target.files[0]
    
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

    

  }

  

  



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
          onChange={(e)=>setTitle(e.target.value)}
        />
        <br />
        <input
          type="file"
          className='mt-2 p-2 border-2 border-black rounded-md my-2 w-100'
          accept="application/pdf"
          required
          onChange={wholehandle}
          
        />
        <br />
        <button class="bg-blue-600 w-20 text-white rounded-sm font-bold p-2 text-center align-center" type="submit">
          upload
        </button>
      </form>
    </div>

    
    <div className='flex justify-center'>
    {pdfArrayBuffer&& < PdfViewer pdfArrayBuffer={pdfArrayBuffer}/>}
    </div>
    <div>
    {pdfArrayBuffer && (
      <PdfExtractor
        pdfArrayBuffer={pdfArrayBuffer}/>)}
    </div>
   </div>



    

  

    
    
      );
}

export default Home;