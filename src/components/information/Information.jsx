import './information.css';

function Information({ onClick }) {

    const handleClick = () => {
        onClick();
    }

  return (
    <section className="information-container">
      <h2>Information</h2>
      <button className='information-CloseBtn' onClick={handleClick}><i class="fa-solid fa-x"></i></button>

      <article className='information-header'>
        <h3>About This Application</h3>
        <p>
          This web application allows users to upload music tracks, analyze their structure, and organize cue sheets with precise timing and usage data. It's designed to simplify music supervision workflows by integrating audio playback, timing controls, and metadata editing into one streamlined interface.
        </p>
      </article>
        <h3>Definitions</h3>
      <section className='information-definitions'>
        <article className='definitions-block'>
            <h4>Provider</h4>
            <ul>
                <li><strong>C</strong> - Composer</li>
                <li><strong>P</strong> - Publisher</li>
                <li><strong>A</strong> - Arranger</li>
            </ul>
        </article>

        <article className='definitions-block'>
            <h4>Use</h4>
            <p>Describes how the music is used in a production. Common use codes include:</p>
          <ul>
            <li><strong>BI</strong> – Background Instrumental</li>
            <li><strong>BV</strong> – Background Vocal</li>
            <li><strong>VI</strong> – Visual Instrumental (music is seen being performed)</li>
            <li><strong>VV</strong> – Visual Vocal</li>
            <li><strong>MT</strong> – Main Title</li>
            <li><strong>ET</strong> – End Title</li>
          </ul>
        </article>
        <article className='definitions-block'>
            <h4>Killer Tracks</h4>
            <p> A well-known production music library, often used as a placeholder or example for cue sheets and licensing references.</p>
        </article>

      </section>
    </section>
  );
}


export default Information