import './cueTrack.css';
import { useState, useEffect } from 'react';

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return [hrs, mins, secs]
    .map(unit => String(unit).padStart(2, '0'))
    .join(':');
}

function CueTrack({ cueSheet, onCueClick }) {
  if (!cueSheet || cueSheet.length === 0) return null;

  return (
    <table className="table-container">
      <tbody className="table-itemParent">
        {cueSheet.map((cue, idx) => (
          <CueRow
            key={idx}
            cue={cue}
            idx={idx}
            onCueClick={onCueClick}
          />
        ))}
      </tbody>
    </table>
  );
}

function CueRow({ cue, idx, onCueClick }) {
  // Load initial from localStorage if available
  const stored = localStorage.getItem(`cue_${idx}`);
  const initial = stored ? JSON.parse(stored) : {
    title: '',
    use: 'BI',
    provider: '',
    trackId: '',
  };

  const [fields, setFields] = useState(initial);

  useEffect(() => {
    localStorage.setItem(`cue_${idx}`, JSON.stringify({
      ...fields,
      cueNumber: idx + 1,
      timeIn: formatTime(cue.timeIn),
      timeOut: formatTime(cue.timeOut),
      duration: cue.duration
    }));
  }, [fields, idx, cue]);


  const handleChange = (field, value) => {
    setFields(prev => ({ ...prev, [field]: value }));
  };

  const handleClick = () => {
    if (onCueClick) onCueClick(cue.timeIn);
  };

  return (
    <tr className="table-item" onClick={handleClick}>
      <td>{idx + 1}</td>
      <td className="table-item__input">
        <input
          type="text"
          value={fields.title}
          onChange={e => handleChange('title', e.target.value)}
        />
      </td>
      <td>
        <select
          name="use"
          value={fields.use}
          onChange={e => handleChange('use', e.target.value)}
        >
          <option value="BI">BI</option>
          <option value="BV">BV</option>
          <option value="VI">VI</option>
          <option value="VV">VV</option>
          <option value="MT">MT</option>
          <option value="ET">ET</option>
        </select>
      </td>
      <td>{formatTime(cue.timeIn)}</td>
      <td>{formatTime(cue.timeOut)}</td>
      <td>{cue.duration}</td>
      <td>
        <input
          type="text"
          placeholder="C."
          value={fields.provider}
          onChange={e => handleChange('provider', e.target.value)}
        />
      </td>
      <td className="table-item__input">
        <input
          type="text"
          value={fields.trackId}
          onChange={e => handleChange('trackId', e.target.value)}
        />
      </td>
    </tr>
  );
}

export default CueTrack;
