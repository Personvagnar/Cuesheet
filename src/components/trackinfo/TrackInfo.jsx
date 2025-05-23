import './trackInfo.css';

function TrackInfo({ file, duration }) {

  if (!file) {
    return <h4>Upload a track</h4>;
  }

  const fileSizeConverter = (file.size / (1024 * 1024)).toFixed(2);
  const fileType = file.type || "Unknown";

  const formatDuration = (seconds) => {
    if (!seconds) return "Loading...";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <section className="trackinfo-container">
      <article className="trackinfo__name">
        <h3>Name:</h3>
        <p>{file.name}</p>
      </article>
      <article className="trackinfo__size">
        <h3>File-Size:</h3>
        <p>{fileSizeConverter}mb</p>
      </article>
      <article className="trackinfo__type">
        <h3>Type:</h3>
        <p>{fileType}</p>
      </article>
      <article className="trackinfo__length">
        <h3>Length:</h3>
        <p>{formatDuration(duration)} min</p>
      </article>
    </section>
  )
}

export default TrackInfo