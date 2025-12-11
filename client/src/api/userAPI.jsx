import { useEffect, useState } from 'react'
import axios from 'axios'

const UserAPI = (token) => {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/information', {
                        headers: { Authorization: token }
                    })
                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    setCart(res.data.cart)
                }
                catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    }, [token])

    const addCart = async(product) =>{
        if(!isLogged) return alert("Please login to add to cart");
        const checkProductInCart = cart.every(item => item._id !== product._id);
        if(checkProductInCart){
            setCart([...cart,{...product,quantity:1}])
        }else{
            alert("Product already in cart");
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        addCart: addCart,
        cart: [cart,setCart]
    }
}

export default UserAPI