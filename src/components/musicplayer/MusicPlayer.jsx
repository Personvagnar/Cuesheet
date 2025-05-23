import './MusicPlayer.css';
import { useState, useRef, useEffect } from 'react';

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function MusicPlayer({ file, duration, selectedTimeIn }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState('');
  

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      
      return() => {
        URL.revokeObjectURL(url);
      }
    }
  }, [file]);

    useEffect(() => {
    if (selectedTimeIn != null && audioRef.current) {
      const audio = audioRef.current;
      audio.currentTime = selectedTimeIn;

      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      }
    }
  }, [selectedTimeIn]);



  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return null;

    if(isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }


  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && duration) {
      setCurrentTime(audio.currentTime);
      const percent = (audio.currentTime / duration) * 100;
      setProgress(percent);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (audio && duration) {
      const newProgress = parseFloat(e.target.value);
      const newTime = (newProgress / 100) * duration;
      audio.currentTime = newTime;
      setProgress(newProgress);
    }
  };

  if (!file) return null;

  return (
    <section className="audio-player" aria-label='Audio player'>
      <audio 
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        />
      <button className='audioBtn' onClick={togglePlay}>
        <i class={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
        aria-label="Playback progress"
      />
      <section className="audioTime">
        <p>{formatTime(currentTime)}</p>
        <p>/</p>
        <p>{formatTime(duration)}</p>
      </section>
    </section>
  );
}

export default MusicPlayer;