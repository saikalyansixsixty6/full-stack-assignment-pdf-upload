import React from 'react'
import Navbar from './Navbar'
import { usePdfContext } from '../context/PdfContext'

function UploadedFiles() {
  const {allPdfs} = usePdfContext()
  
  
  return (
    <div>
      <Navbar/>
      {allPdfs === null
            ? ""
            : allPdfs.map((data, index) => (
              <div className="border border-solid border-gray-700 p-4 my-4" key={index}>
                <h6 className="font-bold text-lg">Title: {data.title}</h6>
                <h6 className="text-gray-600">Filename: {data.pdf}</h6>
                <button className="bg-blue-600 text-white rounded-md p-2 text-center mt-2">
                  Show PDF
                </button>
              </div>
            ))}

    </div>
  )
}

export default UploadedFiles