const Products = require("../models/productModel");

// Filtering, Sorting, Pagination
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString };

        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach(el => delete (queryObj[el]));

        // Convert string numbers to actual numbers for comparison operators
        Object.keys(queryObj).forEach(key => {
            if (typeof queryObj[key] === 'object' && queryObj[key] !== null) {

                Object.keys(queryObj[key]).forEach(operator => {
                    const value = queryObj[key][operator];
                    // Try to convert to number if it's a numeric string
                    if (!isNaN(value) && value !== '') {
                        queryObj[key][operator] = Number(value);
                    }
                });
            } else {
                // Handle direct values like { product_id: "p01" }
                const value = queryObj[key];
                if (!isNaN(value) && value !== '') {
                    queryObj[key] = Number(value);
                }
            }
        });

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);



        // Apply the filter to the query - MUST reassign!
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }
    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 9;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;

    }
}

const productControl = {
    getProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Products.find(), req.query).filtering().sorting().pagination();
            const products = await features.query;

            res.json({
                result: products.length,
                products
            });
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    createProducts: async (req, res) => {
        try {
            const { product_id, title, price, description, content, images, category } = req.body;
            if (!images) return res.status(400).json({ message: "Image is required" });

            const product = await Products.findOne({ product_id });
            if (product) return res.status(400).json({ message: "Product already exists" });

            const newProduct = new Products({
                product_id,
                title: title.toLowerCase(),
                price,
                description,
                content,
                images,
                category
            })
            await newProduct.save();
            res.json({ msg: "Created Successfully" });
        } catch (error) {
            return res.status(500).json({ message: error })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id);
            res.json({ msg: "Deleted Successfully" });
        } catch (error) {
            return res.status(500).json({ message: error })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { title, price, description, content, images, category } = req.body;
            if (!images) return res.status(400).json({ message: "Image is required" });

            await Products.findOneAndUpdate({ _id: req.params.id }, {
                title: title.toLowerCase(),
                price,
                description,
                content,
                images,
                category
            })
            res.json({ msg: "Updated Successfully" });
        } catch (error) {
            return res.status(500).json({ message: error })
        }
    }
}

module.exports = productControl;