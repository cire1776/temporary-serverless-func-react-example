import React from 'react';
import {useParams,Link} from 'react-router-dom';
import axios from 'axios';

function Product(props) {
    const [product, setProduct] = React.useState(null)
    const [error, setError] = React.useState(false);

    const id = useParams().productID;

    async function fetchProduct (id) {
        try {
            const record = await axios.get(`api/product?id=${id}`);
            const product = record.data;
            setProduct(product);            
        } catch (error) {
            setError(error)
        }
    }

    React.useEffect(() => {
        fetchProduct(id);
    },[id])

    if (!product) {
        return (
            <section className='section section-center'>
                <h2>Loading...</h2>
            </section>
        )
    } 

    if (error) {
        return <h5>There was an error loading product: {id}.  {JSON.stringify(error)}</h5>
    }

    const {name, description, price, imageUrl} = product;

    return <section className='section section-center'>
        <Link to='/' className='link'>
            Back Home
        </Link>
        <div>
            <div className="title">
                <h2>{name}</h2>
                <div className="title-underline"></div>
            </div>
            <article className='single-product'>
                <img className='single-product-img' src={imageUrl} alt={name}/>
                <div>
                    <h5>{name}</h5>
                    <h5 className='price'>{price}</h5>
                    <p>{description}</p>
                </div>
            </article>
        </div>
    </section>

}

export default Product
