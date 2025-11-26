// npm install express -> To install Express

// Import Express module
const express = require('express');

// Create an Express application
const app = express();

const PORT = 3000;

// Middleware to serve static files from the 'public' folder
app.use(express.static('public'));

// Set up view engine (EJS) -> dynamic file rendering (npm install ejs)
app.set('view engine', 'ejs');


// Define routes
app.get('/', (req, res) => 
  res.send('Hello, World from Express!')); // Send a response to the client

app.get('/home', (req, res) => res.send('Home page'));

app.get('/about', (req, res) => res.send('About page'));

app.get('/contact', (req, res) => res.send('<h1>This is the Contact page</h1>'));

app.get('/user', (req, res) =>  res.json({name: 'Vedha', age: 21, 
  place: 'kozhikode', role: 'Developer'}));


// EJS Template Route
// app.get('/ejs', (req, res) => { 
//   res.render('index', { title: 'Home Page', name: 'Vedha', 
//     role: 'Mern Stack Developer' });
// });

// Student ejs route
app.get('/student', (req, res) => {
  const students = ['Alice', 'Bob', 'Charlie', 'David', 'Eva'];
  res.render('student', { title: 'Student Page', students: students});
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});