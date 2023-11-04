import { useState, useEffect } from 'react';
import PdfExtractor from './PdfExtractor';
import PdfViewer from './PdfViewer';
import axios from "axios";
import Navbar from './Navbar';
import { usePdfContext } from '../context/PdfContext';

function Home() {
  const [pdfArrayBuffer, setPdfArrayBuffer] = useState(null);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const { allPdfs, setAllPdfs } = usePdfContext();

  // Fetch PDF files when the component mounts
  useEffect(() => {
    getPdf();
  }, []);

  // Fetch PDF files from the server
  const getPdf = async () => {
    try {
      const result = await axios.get("http://localhost:9000/get-files");
      setAllPdfs(result.data.data);
    } catch (error) {
      console.error("Error fetching PDF files:", error);
    }
  };

  // Handle the form submission to upload a new PDF file
  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post("http://localhost:9000/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (result.data.status === "ok") {
        alert("Uploaded Successfully!!!");
        setTitle("");
        getPdf(); // Fetch updated PDF files after successful upload
      } else {
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading the file:", error);
      alert("An error occurred while uploading the file.");
    }
  }

  // Function to open a PDF file in a new tab
  const showPdf = (pdf) => {
    window.open(`http://localhost:9000/assets/${pdf}`, "_blank", "noreferrer");
  };

  // Function to handle both the file input change and reading the PDF file
  const wholehandle = (e) => {
    onChange(e);
    handleFileChange(e);
  }

  // Handle the file input change
  const onChange = (e) => {
    setFile(e.target.files[0]);
  }

  // Read the selected PDF file and set its content as an ArrayBuffer
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const arrayBuffer = await readAsyncFile(file);
      setPdfArrayBuffer(arrayBuffer);
    }
  };

  // Read the selected file as an ArrayBuffer
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
      <Navbar />
      <div className="flex flex-col items-center">
        <form className="w-full lg:w-2/3 border border-solid border-gray-700 p-6" onSubmit={onSubmit}>
          <h1 className="text-lg font-bold text-center">Upload PDF in React</h1>
          <input
            type="text"
            className="mt-4 p-2 border border-gray-700 rounded-md my-2 w-full"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="file"
            className="mt-2 p-2 border border-gray-700 rounded-md my-2 w-full"
            accept="application/pdf"
            required
            onChange={wholehandle} // Handle file input and PDF reading
          />
          <button className="bg-blue-600 w-20 text-white rounded-md font-bold p-2 text-center" type="submit">
            Upload
          </button>
        </form>
        <div className="w-full lg:w-2/3 mt-4">
          {pdfArrayBuffer && <PdfViewer pdfArrayBuffer={pdfArrayBuffer} />}
        </div>
        <div className="w-full lg:w-2/3 mt-4">
          {pdfArrayBuffer && <PdfExtractor pdfArrayBuffer={pdfArrayBuffer} />}
        </div>
        
        {allPdfs && allPdfs.map((data, index) => (
          <div className="border border-solid border-gray-700 p-4 my-4" key={index}>
            <h6 className="font-bold text-lg">Title: {data.title}</h6>
            <h6 className="text-gray-600">Filename: {data.pdf}</h6>
            <button className="bg-blue-600 text-white rounded-md p-2 text-center mt-2" onClick={() => showPdf(data.pdf)}>
              Show PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
