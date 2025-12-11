import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

const Categories = () => {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    return (
        <div className="categories" style={styleCategories}>
            <h2>Categories</h2>
            <div className="category-list" style={{ marginTop: "20px" }}>
                {
                    categories.map(category => (
                        <div className="row" key={category._id} style={styleRow}>
                            <p>{category.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

const styleCategories = {
    maxWidth: '700px',
    display: 'flex',
    flexDirection: 'column',
    margin: '30px auto'
}

const styleRow = {
    padding: '10px',
    border: '1px solid #ddd',
    margin: '10px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textTransform: 'capitalize'
}

export default Categories
