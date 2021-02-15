import React, {useEffect, useState} from 'react'
import axios from 'axios'

const url = 'https://temporary-serverless-function-course.netlify.app/api/basic-api'



function Basic() {

    const [products, setProduct] = useState([]);

    const fetchProducts = async () => {
        try {
            const {data} = await axios.get(url);
            setProduct(data);
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <section className='section section-center'>
            <div className="title">
                <h2>basic setup</h2>
                <div className="title-underline"></div>

            </div>
            <div className="products">
                {
                    products.map((product)=>{
                        const {id, image:{url}, price, name} = product
                        return (
                            <article className='product' key={id}>
                                <img src={url} alt={name}/>
                                <div className="info">
                                    <h5>{name}</h5>
                                    <h5 className='price'>${price}</h5>
                                </div>
                            </article>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Basic
