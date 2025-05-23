import './header.css'
import Information from '../information/Information'
import { useState } from 'react'

function Header() {
  const [modalIsActive, setModalIsActive] = useState(false);

  const closeModal = () => setModalIsActive(false);

  return (
    <>
      <section className="header-container">
        <h1>Cuesheet my music</h1>
        <button className="header-InfoBtn" onClick={() => setModalIsActive(true)}><i class="fa-solid fa-info"></i></button>
        {modalIsActive && <Information onClick={closeModal}/>}
      </section>
    </>
  )
}

export default Header