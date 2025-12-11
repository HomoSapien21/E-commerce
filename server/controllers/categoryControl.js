const Category = require('../models/categoryModels.js');

const categoryControl = {
    getCategory: async (req, res) => {
        try {
            const categories = await Category.find();
            res.json(categories);
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createCategory: async (req, res) => {
        try {
            console.log('Request body:', req.body); // Debug log
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({
                    msg: "Category name is required",
                    receivedBody: req.body
                });
            }

            const category = await Category.findOne({ name });
            if (category) return res.status(400).json({ msg: "Category already exists" });

            const newCategory = new Category({ name });
            await newCategory.save();
            res.json({ msg: "Category created successfully", category: newCategory });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.findByIdAndDelete(id);
            if (!category) return res.status(404).json({ msg: "Category not found" });
            res.json({ msg: "Category deleted successfully", category });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const category = await Category.findById(id);
            if (!category) return res.status(404).json({ msg: "Category not found" });
            category.name = name;
            await category.save();
            res.json({ msg: "Category updated successfully", category });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = categoryControl;
