import './export.css';

function Export({ file }) {
  if (!file) return null;

  const handleExport = () => {
    const cues = Object.keys(localStorage)
      .filter(key => key.startsWith('cue_'))
      .map(key => {
        const data = localStorage.getItem(key);
        try {
          return JSON.parse(data);
        } catch {
          return null;
        }
      })
      .filter(Boolean); // remove nulls

    console.log('Exported Cue Data:', cues);
  };

  return (
    <section className="export-container">
      <button onClick={handleExport}>
        <i className="fa-solid fa-file-excel"></i>
      </button>
      <button onClick={handleExport}>
        <i className="fa-regular fa-file"></i>
      </button>
    </section>
  );
}

export default Export;