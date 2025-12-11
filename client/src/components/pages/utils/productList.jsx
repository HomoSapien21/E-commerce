import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import BtnRender from './btnRender';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios'

const ProductList = ({ product, isAdmin }) => {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [callback, setCallback] = state.productAPI.callback

    const deleteProduct = async (id, public_id) => {
        try {
            const deleteProduct = axios.delete(`/api/products/${id}`, {
                headers: { Authorization: token }
            })

            await deleteProduct
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

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
            <BtnRender product={product} deleteProduct={() => deleteProduct(product._id, product.images.public_id)} />
        </div>
    )
}

export default ProductList