import './prodDetails.css'

function ProdDetails({ file }) {

    if (!file) return null;

  return (
    <section className="prod-container">
        <form action="#" method='post' className='prod-form'>
            <section className='prod-item'>
                <label for="productionTitle">Production Title:</label>
                <input type="text" id="productionTitle" name="productionTitle" placeholder='title' required/>
            </section>
            <section className='prod-item'>
                <label for="client">Client:</label>
                <input type="text" id="client" name="client" placeholder='client' required />
            </section>
            <section className='prod-item'>
                <label for="email1">Email Address:</label>
                <input type="email" id="email1" name="email1" placeholder='email' required />
            </section>
            <section className='prod-item'>
                <label for="type">Type:</label>
                <input type="text" id="type" name="type" placeholder='type' required />
            </section>
            <section className='prod-item'>
                <label for="runTime">RunTime:</label>
                <input type="text" id="runTime" name="runTime" placeholder='runtime' required />
            </section>
            <section className='prod-item'>
                <label for="productionCompany">Production Company:</label>
                <input type="text" id="productionCompany" name="productionCompany" placeholder='company' required />
            </section>
            <section className='prod-item'>
                <label for="email2">Email Address (Production Company):</label>
                <input type="email" id="email2" name="email2" placeholder='email' required />
            </section>
        </form>
    </section>
  )
}

export default ProdDetails;