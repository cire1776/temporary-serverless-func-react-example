import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

function Airtable() {
    const [products, setProducts] = React.useState([]);

    async function fetchProducts() {
        try {
            const records = await axios.get('/api/product')
            setProducts(records.data);
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    React.useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <>
            <div className="title">
                <h2>Airtable</h2>
                <div className="title-underline"></div>
            </div>
            <div className="products">
            {
                products.map((product) => {
                    const {id, name, price, imageUrl} = product;
                    return <Link to={`/${id}`} className="product" key={id}>
                        <img src={imageUrl} alt={name}/>
                        <div className="info">
                            <h5>{name}</h5>
                            <h5 className='price'>{price}</h5>
                        </div>
                    </Link>
                })
            }
            </div>
        </>
    )
}
export default Airtable
