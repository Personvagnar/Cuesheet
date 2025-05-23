import './cueTrack.css';

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return [hrs, mins, secs]
    .map(unit => String(unit).padStart(2, '0'))
    .join(':');
}

function CueTrack({ cueSheet, onCueClick }) {
    if (!cueSheet || cueSheet.length === 0 ) return null;

  const handleClick = (cue) => {
    if (onCueClick) {
      onCueClick(cue.timeIn);
    }
  };

  return (
    <table className="table-container">
        <tbody className='table-itemParent'>
            {cueSheet.map((cue, idx) => (
                <tr key={idx} className={`table-item`} onClick={() => handleClick(cue)}>
                    <td>{idx + 1}</td>
                    <td className='table-item__input'>
                      <input type="text" />
                    </td>
                    <td>
                      <select name="use" id="use">
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
                        placeholder='C.'
                        />
                    </td>
                    <td className='table-item__input'>
                      <input type="text" />
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default CueTrack;