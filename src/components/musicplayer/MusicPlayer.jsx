import './MusicPlayer.css';
import { useState, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function MusicPlayer({ file, selectedTimeIn }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  const [audioUrl, setAudioUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Create audio URL from uploaded file
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  // Initialize WaveSurfer
  useEffect(() => {
    if (!audioUrl || !waveformRef.current) return;

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#f0f0f0',
      progressColor: '#ffd700',
      height: 80,
      responsive: true,
    });

    wavesurfer.current.load(audioUrl);

    wavesurfer.current.on('ready', () => {
      setDuration(wavesurfer.current.getDuration());
      setIsReady(true);
    });

    wavesurfer.current.on('audioprocess', () => {
      const current = wavesurfer.current.getCurrentTime();
      setCurrentTime(current);
    });

    wavesurfer.current.on('seek', () => {
      const current = wavesurfer.current.getCurrentTime();
      setCurrentTime(current);
    });

    return () => {
      wavesurfer.current.destroy();
      setIsReady(false);
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    };
  }, [audioUrl]);

  // When selectedTimeIn changes, seek WaveSurfer (only if ready)
  useEffect(() => {
    if (
      selectedTimeIn != null &&
      isReady &&
      wavesurfer.current &&
      wavesurfer.current.getDuration() > 0
    ) {
      const duration = wavesurfer.current.getDuration();
      const seekRatio = Math.min(selectedTimeIn / duration, 1);
      wavesurfer.current.seekTo(seekRatio);
      wavesurfer.current.play();
      setIsPlaying(true);
    }
  }, [selectedTimeIn, isReady]);

  // Play/Pause toggle
  const togglePlay = () => {
    if (!wavesurfer.current) return;
    wavesurfer.current.playPause();
    setIsPlaying(wavesurfer.current.isPlaying());
  };

  if (!file) return null;

  return (
    <section className="audio-player" aria-label="WaveSurfer audio player">
      <button className="audioBtn" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
        <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
      </button>

      <div ref={waveformRef} className="wavesurfer-container" />

      <section className="audioTime" aria-live="polite">
        <p>{formatTime(currentTime)}</p>
        <p>/</p>
        <p>{formatTime(duration)}</p>
      </section>
    </section>
  );
}

export default MusicPlayer;
