import './mainPage.css'
import Upload from '../upload/Upload'
import TrackInfo from '../trackinfo/TrackInfo';
import MusicPlayer from '../musicplayer/MusicPlayer';
import AudioAnalysis from '../audioanalysis/AudioAnalysis';
import ProdDetails from '../proddetails/ProdDetails';
import Export from '../export/Export';
import { useState } from 'react';

function Mainpage() {
  const [file, setFile] = useState(null);
  const [duration, setDuration] = useState(null);
  const [selectedTimeIn, setSelectedTimeIn] = useState(null);

  const handleCueClick = (timeIn) => {
    setSelectedTimeIn(timeIn);
  };

  const handleMusicUpload = (file) => {
    setFile(file);

    const audio = document.createElement('audio');
    const url = URL.createObjectURL(file);
    audio.src = url;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
      URL.revokeObjectURL(url);
    });
    
  };
  
  return (
    <section className="mainpage-container">
      <Upload onFileSelect={handleMusicUpload} />
      <TrackInfo file={file} duration={duration} />
      <MusicPlayer file={file} duration={duration} selectedTimeIn={selectedTimeIn} />
      <AudioAnalysis file={file} onCueClick={handleCueClick} />
      <ProdDetails file={file} />
      <Export file={file} />
    </section>
  )
}

export default Mainpage;