import './export.css';

function Export({ file }) {
  if (!file) return null;

  const handleExport = () => {
    const defaultDetails = {
      productionTitle: '',
      client: '',
      clientemail: '',
      type: '',
      runTime: '',
      productionCompany: '',
      productionemail: '',
    };
    const stored = localStorage.getItem('prodDetails');

    let details = {};
    try {
      details = stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error parsing details in local Storage', error);
    }
    details = { ...defaultDetails, ...details};

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
      .filter(Boolean);
    
    const rows = [];

    rows.push(['Music Cue Sheet']);
    rows.push([]);
    for (const[key, value] of Object.entries(details)) {
      rows.push([key, value]);
    }
    rows.push([]);
    rows.push([], ['Cue Data']);
    if (cues.length > 0) {
      const cueOrder = ['cueNumber', 'title', 'use', 'timeIn', 'timeOut', 'duration', 'provider', 'trackId#'];
      rows.push(cueOrder);

      const sortedCues = cues.sort((a, b) => (a.cueNumber ?? 0) - (b.cueNumber ?? 0));

      sortedCues.forEach(cue => {
        rows.push(cueOrder.map(field => cue[field] ?? ''));
      });
    }

    rows.push([]);
    rows.push(['Information'])
    rows.push(['Use'])
    rows.push(['BI = Background Instrumental']);
    rows.push(['BV = Background Vocal']);
    rows.push(['VI = Visual Instrumental (music is seen being performed)']);
    rows.push(['VV = Visual Vocal']);
    rows.push(['MT = Main Title']);
    rows.push(['ET = End Title']);
    rows.push([]);
    rows.push(['Provider'])
    rows.push(['C - Composer']);
    rows.push(['P - Publisher']);
    rows.push(['A - Arranger']);

    const csvContent = rows.map(row => row.join(';')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'cuesheet_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('Exported Cue Data:', cues);
    console.log('Exported Cue Data:', details);
  };

  return (
    <section className="export-container">
      <button onClick={handleExport}>
        <i className="fa-solid fa-file-excel"></i>
      </button>
    </section>
  );
}

export default Export;