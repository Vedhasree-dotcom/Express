// Mongoose is for MongoDB connectivity and operations

// Import Express module
const express = require('express');
const mongoose = require('mongoose');
const User = require('./Mongoose/Models/User');  //import user model
// const Product = require('./Mongoose/Models/Product');  //import product model


// import product routes
const productRoutes = require('./routes/productRoute');

const app2 = express();

const PORT = 3001;

// Middlewares is a function that uses between req and res 
// Middleware to parse JSON 
app2.use(express.json()); 

// MongoDB connection string
const mongoURL = 'mongodb://localhost:27017/mydatabase';

//Connect to mongoDB
mongoose.connect(mongoURL, { 
    useNewUrlParser: true, useUnifiedTopology: true,
 }).then(() => {
    console.log('Connected to MongoDB');
 }).catch((error) => {
    console.error('Error connecting to mongoDB:', error);
 });

 // Middleware to parse URL-encoded data
app2.use(express.urlencoded({ extended: true })); 


// Serve static files from 'public' directory( images, files)
app2.use(express.static('public')); 


// Serve uploaded files statically
app2.use('/uploads', express.static('uploads')); 


// middleware to give requested url and it's method
app2.use((req, res, next) => {
    console.log(`Request URL: ${req.url}, Method: ${req.method}`);
    next(); // next-> Pass control to next middleware or route
});


// Set EJS as the templating engine
app2.set('view engine', 'ejs');

// Use product routes for /products path
app2.use('/product', productRoutes);


// Route to display form to add new user
app2.get('/users/new', (req, res)=> {
    res.render('add-user', { title: 'Add Student'});
});


// Define routes
// app2.get('/', (req, res) => 
//   res.send('Hello, World from Express with Mongoose!')); // Send a response to the client


// app2.get('/student', (req, res) => {
//   const students = ['Alice', 'Bob', 'Charlie', 'David', 'Eva'];
//   res.render('student', { title: 'Student Page', students: students});
// });


// create a user document
// Route to handle form submission and add new user
app2.post('/users', async (req, res) => {
    try {
        const { name, email, age} = req.body;
        const user = new User({ name, email, age }); //req.body = {name,email,age}
        await user.save(); // Save user to mongoDB
        res.redirect("/"); // Redirect to home page after saving
    } catch (error) {
      res.status(400).send(error);
    }
});

// Route to display all users from mongoDB
app2.get('/', async (req, res) => {
    try {
        const students = await User.find(); // Fetch all users from mongoDB

        res.render('student', {       // res.render for page rendering
            title: 'Student Page',
            students: students      // send DB users to EJS
        }); 
    } 
    catch (err) {
      console.error(err);
      res.status(500).send("Error fetching students");
    }
});


// Edit user route
app2.get('/users/edit/:id', async (req, res) => {
    try {
        const student = await User.findById(req.params.id);
        res.render('edit-user', { title: "Edit Student", student})
    }
    catch (err) {
        res.status(400).send("Error loading student");
    }
})


// Update user route
app2.post('/users/update/:id', async (req, res) => {
    try {
        // req.body means the updated data from the form
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/');
    }
    catch (err){
        res.status(400).send("Update failed");
    }
});



// Delete user route
app2.post('/users/delete/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/');
    }
    catch (err){
        res.status(400).send("Delete failed");
    }
});







// Start the server
app2.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});