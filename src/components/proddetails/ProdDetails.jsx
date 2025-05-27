import './prodDetails.css'
import { useState, useEffect } from 'react';

function ProdDetails({ file }) {

    const initial = (() => {
        const stored = localStorage.getItem('prodDetails');
        return stored ? JSON.parse(stored) : {
            productionTitle: '',
            client: '',
            clientemail: '',
            type: '',
            runTime: '',
            productionCompany: '',
            productionemail: '',
        };
    })();

    const [fields, setFields] = useState(initial);

   useEffect(() => {
        localStorage.setItem('prodDetails', JSON.stringify(fields));
    }, [fields]);

    const handleChange = (field, value) => {
        setFields(prev => ({ ...prev, [field]: value }));
    };

    if (!file) return null;

  return (
    <section className="prod-container">
        <form action="#" method='post' className='prod-form'>
            <section className='prod-item'>
                <label for="productionTitle">Production Title:</label>
                <input type="text" 
                    id="productionTitle" 
                    name="productionTitle" 
                    placeholder='title'
                    value={fields.productionTitle}
                    onChange={e => handleChange('productionTitle', e.target.value)}
                    required/>
            </section>
            <section className='prod-item'>
                <label for="client">Client:</label>
                <input
                    type="text"
                    id="client"
                    name="client"
                    placeholder="client"
                    value={fields.client}
                    onChange={e => handleChange('client', e.target.value)}
                    required
                />
            </section>
            <section className='prod-item'>
                <label for="clientemail">Email Address:</label>
                <input
                    type="email"
                    id="clientemail"
                    name="clientemail"
                    placeholder="email"
                    value={fields.clientemail}
                    onChange={e => handleChange('clientemail', e.target.value)}
                    required
                />
            </section>
            <section className='prod-item'>
                <label for="type">Type:</label>
                <input
                    type="text"
                    id="type"
                    name="type"
                    placeholder="type"
                    value={fields.type}
                    onChange={e => handleChange('type', e.target.value)}
                    required
                />
            </section>
            <section className='prod-item'>
                <label for="runTime">RunTime:</label>
                <input
                    type="text"
                    id="runTime"
                    name="runTime"
                    placeholder="runtime"
                    value={fields.runTime}
                    onChange={e => handleChange('runTime', e.target.value)}
                    required
                />
            </section>
            <section className='prod-item'>
                <label for="productionCompany">Production Company:</label>
                <input
                    type="text"
                    id="productionCompany"
                    name="productionCompany"
                    placeholder="company"
                    value={fields.productionCompany}
                    onChange={e => handleChange('productionCompany', e.target.value)}
                    required
                />
            </section>
            <section className='prod-item'>
                <label for="productionemail">Email Address (Production Company):</label>
                <input
                    type="email"
                    id="productionemail"
                    name="productionemail"
                    placeholder="email"
                    value={fields.productionemail}
                    onChange={e => handleChange('productionemail', e.target.value)}
                    required
                />
            </section>
        </form>
    </section>
  )
}

export default ProdDetails;