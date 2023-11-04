import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

function PdfExtractor({ pdfArrayBuffer }) {
  const [selectedPages, setSelectedPages] = useState([]);
  const [pdfDoc, setPdfDoc] = useState(null);

  if (pdfArrayBuffer) {
    // Load the PDF document if the pdfArrayBuffer is available
    PDFDocument.load(pdfArrayBuffer).then((loadedPdf) => {
      setPdfDoc(loadedPdf);
    });
  }

  // Function to handle page selection (checkbox)
  const handlePageSelection = (pageNumber) => {
    if (selectedPages.includes(pageNumber)) {
      setSelectedPages(selectedPages.filter((page) => page !== pageNumber));
    } else {
      setSelectedPages([...selectedPages, pageNumber]);
    }
  };

  // Function to extract and download selected pages as a new PDF
  const handleExtraction = async () => {
    if (pdfDoc && selectedPages.length > 0) {
      const newPdfDoc = await PDFDocument.create();
      for (const pageNumber of selectedPages) {
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
        newPdfDoc.addPage(copiedPage);
      }

      const newPdfBytes = await newPdfDoc.save();
      const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      // Create a hidden anchor element and trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'extracted.pdf';
      a.click();

      // Revoke the URL to release the object URL resource
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      {pdfDoc && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Select pages to extract:</h2>
          {Array.from({ length: pdfDoc.getPageCount() }).map((_, index) => (
            <label key={index} className="flex items-center mt-2">
              <input
                type="checkbox"
                onChange={() => handlePageSelection(index + 1)}
                checked={selectedPages.includes(index + 1)}
                className="mr-2"
              />
              Page {index + 1}
            </label>
          ))}
          <button
            onClick={handleExtraction}
            className="mt-4 bg-blue-600 text-white rounded-md p-2 text-center font-semibold"
          >
            Extract & download
          </button>
        </div>
      )}
    </div>
  );
}

export default PdfExtractor;
