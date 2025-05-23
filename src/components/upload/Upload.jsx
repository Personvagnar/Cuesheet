import './upload.css'

function Upload({ onFileSelect }) {
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <figure className="upload-container">
        <label htmlFor="music-upload" className='upload-icon'>
          <i class="fa-solid fa-upload"></i>
        </label>
        <input 
          type="file"
          id='music-upload'
          accept='audio/*'
          onChange={handleChange}
          style={{ display: 'none'}} 
        />
    </figure>
  )
}

export default Upload;