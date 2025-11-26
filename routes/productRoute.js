const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../Controllers/productController');


// Multer config
const storage = multer.diskStorage({  // setting storage engine,  diskstorage is the function
      
    destination: function(req, file, cb) { // Set destination folder 
    // cb-callback
       cb(null, "uploads/"); // Folder to store uploaded images 
       // parameters-error, destination folder
    },
    filename: function (req, file, cb) {   // set file name
        cb(null, Date.now() + "-" + file.originalname); 
        // unique file name   parameters-error, unique file name
    }   
});


// Initialize multer with storage config
 const upload = multer({ storage: storage });

// Routes
router.get("/", productController.home);
router.get("/add", productController.addForm);

// image is the name attribute in the form's file input
// single is the multer function to upload a single file
router.post("/add", upload.single('image'), productController.addProduct);

router.get("/edit/:id", productController.editForm);

router.post("/edit/:id", upload.single('image'), productController.updateProduct);

// function in productController to delete
router.get("/delete/:id", productController.deleteProduct); 


// Export the router
module.exports = router;