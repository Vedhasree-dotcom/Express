const Product = require('../Mongoose/Models/Product');


module.exports = {
    home: async (req, res) => {
        const products = await Product.find({});
        res.render("index", { products });
    
    },
    addForm: (req, res) => {
        res.render("addProduct");
    },
    addProduct: async (req, res) => {
        const { name, price, description } = req.body;

        // Assuming you're using multer for file uploads
        const image = req.file ? req.file.filename : null; 

        await Product.create({ name, price, description, image });
        res.redirect("/product");

    },

    editForm: async (req, res) => {
        const product = await Product.findById(req.params.id);
        res.render("editProduct", {product});
    },
    
    updateProduct: async (req, res) => {
        const {name, price, description } = req.body;
        let updateData = {name, price, description };

        if(req.file) updateData.image = req.file.filename;

        await Product.findByIdAndUpdate(req.params.id, updateData);
        res.redirect("/product");
    },

    deleteProduct: async (req, res) => {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect("/product")
    }
};

