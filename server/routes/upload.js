const router = require("express").Router();
const cloudinary = require("../config/cloudinary");
const upload = require("../middleware/uploadMiddleware");
const fs = require('fs').promises;

// Upload single image to Cloudinary
router.post('/upload', (req, res) => {
    const uploadSingle = upload.any();

    uploadSingle(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ msg: err.message });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ msg: "No file uploaded. Please select an image file." });
        }

        try {
            // Get the first file
            const file = req.files[0];

            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'ecommerce/products'
            });

            // Delete local file after upload
            await fs.unlink(file.path);

            res.json({
                msg: "Image uploaded successfully",
                public_id: result.public_id,
                url: result.secure_url
            });
        } catch (error) {
            // Clean up local file if upload fails
            if (req.files[0] && req.files[0].path) {
                await fs.unlink(req.files[0].path).catch(() => { });
            }
            return res.status(500).json({ msg: error.message });
        }
    });
});

// Upload multiple images to Cloudinary
router.post('/upload-multiple', (req, res) => {
    const uploadMultiple = upload.any();

    uploadMultiple(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ msg: err.message });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ msg: "No files uploaded. Please select image files." });
        }

        try {
            // Upload all files to Cloudinary
            const uploadPromises = req.files.map(file =>
                cloudinary.uploader.upload(file.path, {
                    folder: 'ecommerce/products'
                })
            );

            const results = await Promise.all(uploadPromises);

            // Delete all local files after upload
            const deletePromises = req.files.map(file => fs.unlink(file.path));
            await Promise.all(deletePromises);

            // Format response
            const images = results.map(result => ({
                public_id: result.public_id,
                url: result.secure_url
            }));

            res.json({
                msg: `${images.length} image(s) uploaded successfully`,
                images: images
            });
        } catch (error) {
            // Clean up local files if upload fails
            const deletePromises = req.files.map(file =>
                fs.unlink(file.path).catch(() => { })
            );
            await Promise.all(deletePromises);

            return res.status(500).json({ msg: error.message });
        }
    });
});

// Delete image from Cloudinary by public_id
router.post('/destroy', async (req, res) => {
    try {
        const { public_id } = req.body;

        if (!public_id) {
            return res.status(400).json({ msg: "public_id is required" });
        }

        // Delete from Cloudinary
        const result = await cloudinary.uploader.destroy(public_id);

        if (result.result === 'ok') {
            res.json({
                msg: "Image deleted successfully",
                public_id: public_id
            });
        } else {
            res.status(404).json({ msg: "Image not found or already deleted" });
        }
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

module.exports = router;
