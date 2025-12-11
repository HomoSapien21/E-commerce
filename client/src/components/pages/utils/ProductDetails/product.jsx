import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'


const Product = () => {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productAPI.products
    const [detailProduct, setDetailProduct] = useState({})
    useEffect(() => {
        if (params.id) {
            products.forEach(product => {
                if (product._id === params.id) setDetailProduct(product)
            })
        }
    }, [params.id, products])

    if (Object.keys(detailProduct).length === 0) return null;

    return (
        <div className="product-details">
            <img src={detailProduct.images?.url} alt="" />
            <div className="product-box">
                <h2 className="product-title">{detailProduct.title}</h2>
                <h4>Product ID: {detailProduct.product_id}</h4>
                <p className='category'>Category: {detailProduct.category}</p>
                <p className="product-description">{detailProduct.description}</p>
                <p className="product-price">${detailProduct.price}</p>
                <p className="content">{detailProduct.content}</p>
                <p className="sold">Sold: {detailProduct.sold}</p>
                <Link to="/cart" className="cart">Buy Now</Link>
            </div>
        </div>
    )
}

export default Product