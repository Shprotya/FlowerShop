// load express
const express = require('express');
// load handlebars
const exphbs = require('express-handlebars');
// for reading JSON files
const fs = require('fs');

// instantiate express
const app = express();

// configure express to use handlebars as templating engine
app.engine(
    'hbs',
    exphbs.engine({
        extname: '.hbs',
        defaultLayout: 'default',
        layoutsDir: 'views/layouts',
        partialsDir: 'views/partials',
    })
);

app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// home page or home route
app.get('/', (req, res) => {
    const state = { home: true, shop: false, about: false, contact: false, login: false, checkout: false };
    const head = {
        title: "Petal Poetry - Dublin's Premier Florist | Fresh Flower Delivery",
        description: "Petal Poetry offers fresh flower delivery across Dublin. Browse beautiful bouquets, wedding flowers, plants, and gifts. Order online for same-day delivery.",
        keywords: "Dublin florist, flower delivery Dublin, fresh flowers Ireland, wedding flowers Dublin, bouquets Dublin"
    };

    const allProducts = JSON.parse(fs.readFileSync('./public/data/products.json', 'utf8'));
    const featuredProducts = allProducts.filter(product => product.featured === true);

    res.render('index', { state: state, head: head, products: featuredProducts });
    console.log('home');
});

// shop page route
app.get('/shop', (req, res) => {
    const state = { home: false, shop: true, about: false, contact: false, login: false, checkout: false };
    const head = {
        title: "Shop Flowers Online - Petal Poetry Dublin",
        description: "Shop our complete collection of fresh flowers, elegant bouquets, wedding arrangements, indoor plants, and floral gifts. Free delivery across Dublin on orders over €30.",
        keywords: "buy flowers online Dublin, flower bouquets, wedding flowers, indoor plants, floral gifts Dublin"
    };

    const products = JSON.parse(fs.readFileSync('./public/data/products.json', 'utf8'));
    
    res.render('shop', { state: state, head: head, products: products });
    console.log('shop');
});

// about page route
app.get('/about', (req, res) => {
    const state = { home: false, shop: false, about: true, contact: false, login: false, checkout: false };
    const head = {
        title: "About Petal Poetry - Dublin's Trusted Florist Since 2004",
        description: "Learn about Petal Poetry, Dublin's family-owned florist with over 20 years of experience. Discover our commitment to fresh, locally-sourced flowers and sustainable practices.",
        keywords: "about Petal Poetry, Dublin florist history, local flower shop, family florist Dublin"
    };
    res.render('about', { state: state, head: head });
    console.log('about');
});

// contact page route
app.get('/contact', (req, res) => {
    const state = { home: false, shop: false, about: false, contact: true, login: false, checkout: false };
    const head = {
        title: "Contact Petal Poetry Dublin | Location, Hours & Delivery Info",
        description: "Get in touch with Petal Poetry. Visit us at 123 Bloom Street, Dublin 2 or call +353 1 234 5678. Open Monday-Sunday with same-day delivery available.",
        keywords: "contact florist Dublin, Petal Poetry location, flower delivery Dublin"
    };
    res.render('contact', { state: state, head: head });
    console.log('contact');
});

// login page route
app.get('/login', (req, res) => {
    const state = { home: false, shop: false, about: false, contact: false, login: true, checkout: false };
    const head = {
        title: "Login - Petal Poetry Customer Account",
        description: "Sign in to your Petal Poetry account to access exclusive member benefits, track orders, and save your delivery details.",
        keywords: "florist login, customer account, Petal Poetry account",
        robots: "noindex, nofollow" // Don't index login pages
    };
    res.render('login', { state: state, head: head });
    console.log('login');
});

// checkout page route
app.get('/checkout', (req, res) => {
    const state = { home: false, shop: false, about: false, contact: false, login: false, checkout: true };
    const head = {
        title: "Checkout - Complete Your Flower Order | Petal Poetry",
        description: "Complete your flower order with secure checkout. Fast delivery across Dublin.",
        keywords: "flower delivery checkout, order flowers Dublin",
        robots: "noindex, nofollow" // Don't index checkout pages
    };
    res.render('checkout', { state: state, head: head });
    console.log('checkout');
});

// user details page route
app.get('/userdetails', (req, res) => {
    const state = { home: false, shop: false, about: false, contact: false, login: false, checkout: false, userdetails: true };
    const head = {
        title: "Your Account Details - Petal Poetry",
        description: "Manage your Petal Poetry account details, delivery addresses, and preferences.",
        keywords: "account settings, user profile, delivery details",
        robots: "noindex, nofollow" // Don't index user account pages
    };
    res.render('userdetails', { state: state, head: head });
    console.log('userdetails');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;