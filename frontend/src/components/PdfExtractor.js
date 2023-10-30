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

  const handlePageSelection = (pageNumber) => {
    if (selectedPages.includes(pageNumber)) {
      setSelectedPages(selectedPages.filter((page) => page !== pageNumber));
    } else {
      setSelectedPages([...selectedPages, pageNumber]);
    }
  };

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
      const a = document.createElement('a');
      a.href = url;
      a.download = 'extracted.pdf';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      {pdfDoc && (
        <div>
          <h2>Select pages to extract:</h2>
          {Array.from({ length: pdfDoc.getPageCount() }).map((_, index) => (
            <label key={index}>
              <input
                type="checkbox"
                onChange={() => handlePageSelection(index + 1)}
                checked={selectedPages.includes(index + 1)}
              />
              Page {index + 1}
            </label>
          ))}
          <button onClick={handleExtraction}>Extract Selected Pages</button>
        </div>
      )}
    </div>
  );
}

export default PdfExtractor;