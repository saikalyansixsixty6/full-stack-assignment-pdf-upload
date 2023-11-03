// PdfViewer.js

const PdfViewer = ({ pdfArrayBuffer }) => {
    const renderPdf = () => {
      const tempBlob = new Blob([new Uint8Array(pdfArrayBuffer)], {
        type: 'application/pdf',
      });
      const docUrl = URL.createObjectURL(tempBlob);
  
      return <iframe id="pdfFrame"
      title="PDF Viewer"
      src={docUrl}
      className="w-full lg:w-2/3 h-96 lg:h-500" />;
    };
  
    return renderPdf();
  };
  
export default PdfViewer;
  