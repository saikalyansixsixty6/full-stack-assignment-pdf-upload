// PdfViewer.js

const PdfViewer = ({ pdfArrayBuffer }) => {
    const renderPdf = () => {
      const tempBlob = new Blob([new Uint8Array(pdfArrayBuffer)], {
        type: 'application/pdf',
      });
      const docUrl = URL.createObjectURL(tempBlob);
  
      return <iframe id="pdfFrame" title="PDF Viewer" src={docUrl} width="70%" height="500" />;
    };
  
    return renderPdf();
  };
  
export default PdfViewer;
  