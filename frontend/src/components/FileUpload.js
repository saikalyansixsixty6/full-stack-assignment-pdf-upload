// FileUpload.js


const FileUpload = ({ onFileChange }) => {
    return (
      <div>
        <input type="file" id="pdfinput" accept=".pdf" onChange={onFileChange} />
      </div>
    );
  };
  
export default FileUpload;
  
  
  