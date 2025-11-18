// load express
const express = require('express');
// load handlebars
const exphbs = require('express-handlebars');

// instantiate express
const app = express();

// configure express to use handlebars as templating engine
app.engine(
    'hbs',
    exphbs.engine({
    extname: '.hbs',
    // use this layout by default - if you have different layout
    // for say home page - you can toggle this in your code
    defaultLayout: 'default',
    // set location of layouts
    layoutsDir: 'views/layouts',
    // set location of partials - header, footer, etc
    partialsDir: 'views/partials',
    })
);

// set the view engine to handlebars
app.set('view engine', 'hbs');
// where to find all of the view
app.set('views',  'views');
// where to find static files - css, images, js
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

// home page or home route
app.get('/', (req, res) => {
    // set active or not for navigation
    const state = {home: true, shop: false, about: false, contact: false, login: false, checkout: false};
    // set specifics for <head>.
    const head = {title: "Petal Poetry", description: "Explore different flowers for sale", 
    keywords: "flower shop, buy flowers, floral arrangements, bouquets"};
    res.render('index', {state: state, head: head});
    // send this to terminal where node app is running
    console.log('home');
});

// shop page route
app.get('/shop', (req, res) => {
    const state = {home: false, shop: true, about: false, contact: false, login: false, checkout: false};
    const head = {title: "Shop - Petal Poetry", description: "Browse our flower collection", 
    keywords: "flower shop, buy flowers, floral arrangements, bouquets"};
    res.render('shop', {state: state, head: head});
    console.log('shop');
});

// about page route
app.get('/about', (req, res) => {
    const state = {home: false, shop: false, about: true, contact: false, login: false, checkout: false};
    const head = {title: "About - Petal Poetry", description: "Learn about Petal Poetry", 
    keywords: "about us, flower shop, Petal Poetry"};
    res.render('about', {state: state, head: head});
    console.log('about');
});

// contact page route
app.get('/contact', (req, res) => {
    const state = {home: false, shop: false, about: false, contact: true, login: false, checkout: false};
    const head = {title: "Contact - Petal Poetry", description: "Contact us", 
    keywords: "contact, flower shop, Petal Poetry"};
    res.render('contact', {state: state, head: head});
    console.log('contact');
});

// login page route
app.get('/login', (req, res) => {
    const state = {home: false, shop: false, about: false, contact: false, login: true, checkout: false};
    const head = {title: "Login - Petal Poetry", description: "Login to your account", 
    keywords: "login, account, Petal Poetry"};
    res.render('login', {state: state, head: head});
    console.log('login');
});

// checkout page route
app.get('/checkout', (req, res) => {
    const state = {home: false, shop: false, about: false, contact: false, login: false, checkout: true};
    const head = {title: "Checkout - Petal Poetry", description: "Complete your purchase", 
    keywords: "checkout, cart, purchase, Petal Poetry"};
    res.render('checkout', {state: state, head: head});
    console.log('checkout');
});

// user details page route
app.get('/userdetails', (req, res) => {
    const state = {home: false, shop: false, about: false, contact: false, login: false, checkout: false, userdetails: true};
    const head = {title: "User Details - Petal Poetry", description: "Your saved details", 
    keywords: "user details, account, Petal Poetry"};
    // Render the `userDetails.hbs` view (file is named `userDetails.hbs` in views/)
    res.render('userdetails', {state: state, head: head});
    console.log('userdetails');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});