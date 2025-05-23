import './export.css'

function Export({ file }) {

    if (!file) return null;

  return (
    <section className="export-container">
      <button><i class="fa-solid fa-file-excel"></i></button>
      <button><i class="fa-regular fa-file"></i></button>
    </section>
  )
}

export default Export