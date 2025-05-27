import './AudioAnalysis.css';
import { useState, useEffect } from 'react';
import CueTrack from '../cuetrack/CueTrack';


function AudioAnalysis({ file, onCueClick }) {
    const [cueSheet, setCueSheet] = useState([]);

    useEffect(() => {
        if (!file) return;

        const audiocontext = new (window.AudioContext || window.webkitAudioContext)();
        const reader = new FileReader();

        reader.onload = async (e) => {
            const arraybuffer = e.target.result;
            const audioBuffer = await audiocontext.decodeAudioData(arraybuffer);

            const channelData = audioBuffer.getChannelData(0);
            const sampleRate = audioBuffer.sampleRate;
            const samplesPerChunk = sampleRate;
            const results = [];

            for (let i = 0; i < channelData.length; i += samplesPerChunk) {
                const chunk = channelData.slice(i, i + samplesPerChunk);
                const rms = Math.sqrt(chunk.reduce((sum, val) => sum + val * val, 0) / chunk.length);
                const dB = 20 * Math.log10(rms);
                results.push({
                    time: Math.floor(i / sampleRate),
                    dB: isFinite(dB) ? dB.toFixed(2) : '-∞',
                    exceeds: dB > -80
                });
            }

            const cues = [];
            let currentCue = null;

            results.forEach((row) => {
                if (row.exceeds && !currentCue) {
                    currentCue = { timeIn: row.time };
                } else if (!row.exceeds && currentCue) {
                    currentCue.timeOut = row.time;
                    currentCue.duration = currentCue.timeOut - currentCue.timeIn;
                    cues.push(currentCue);
                    currentCue = null;
                }
            });

            if (currentCue) {
                currentCue.timeOut = results[results.length - 1].time;
                currentCue.duration = currentCue.timeOut - currentCue.timeIn;
                cues.push(currentCue);
            }

            setCueSheet(cues);
        };

        reader.readAsArrayBuffer(file);
    }, [file]);

    if (!file) {
        return null;
    }

  return (
    <section className="audio-analysis-table">
        <h2>CueSheet</h2>
        <section className="table-header-container">
            <h3>Cue no:</h3>
            <h3>Cue Title</h3>
            <h3>Use</h3>
            <section>
                <h3>Time In:</h3>
                <p>hh: mm: ss</p>
            </section>
            <section>
                <h3>Time Out:</h3>
                <p>hh: mm: ss</p>
            </section>
            <section>
                <h3>Duration:</h3>
                <p>sec</p>
            </section>
            <h3>Provider</h3>
            <h3>Track ID#</h3>
        </section>
        <CueTrack cueSheet={cueSheet} onCueClick={onCueClick} />
    </section>
  )
}

export default AudioAnalysis