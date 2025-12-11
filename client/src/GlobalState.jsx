import { createContext } from "react";
import ProductAPI from "./api/productAPI";
import UserAPI from "./api/userAPI";
import CategoriesAPI from "./api/CategoriesAPI";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
export const GlobalState = createContext();

export const DataProvider = ({ children }) => {

    const [token, setToken] = useState(false);
    const refreshToken = async () => {
        const res = await axios.get('/user/refresh_token');
        setToken(res.data.accesstoken);
    }
    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if (firstLogin) refreshToken();
    }, [])
    const state = {
        token: [token, setToken],
        productAPI: ProductAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}