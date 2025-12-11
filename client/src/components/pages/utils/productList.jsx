import React from 'react'
import BtnRender from './btnRender';
const productList = ({ product, isAdmin }) => {



    return (
        <div className="product-card">
            {
                isAdmin && <input type='checkbox' checked={product.checked} />
            }
            <img src={product.images.url} alt="" />
            <div className="product-box">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
            </div>
            <BtnRender product={product} />
        </div>
    )
}

export default productList