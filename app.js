// load express
const express = require('express');
// load handlebars
const exphbs = require('express-handlebars');
// for reading JSON files
const fs = require('fs');
// load path module for absolute directory references
const path = require('path');

// instantiate express
const app = express();

// configure express to use handlebars as templating engine
app.engine(
    'hbs',
    exphbs.engine({
        extname: '.hbs',
        defaultLayout: 'default',
        layoutsDir: path.join(__dirname, 'views/layouts'),
        partialsDir: path.join(__dirname, 'views/partials'),
    })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// helper function to read products to avoid repetition
const getProducts = () => {
    const productsPath = path.join(__dirname, 'public', 'data', 'products.json');
    return JSON.parse(fs.readFileSync(productsPath, 'utf8'));
};

// home page or home route
app.get('/', (req, res) => {
    const state = { home: true, shop: false, about: false, contact: false, login: false, checkout: false };
    const head = {
        title: "Petal Poetry - Dublin's Premier Florist | Fresh Flower Delivery",
        description: "Petal Poetry offers fresh flower delivery across Dublin. Browse beautiful bouquets, wedding flowers, plants, and gifts. Order online for same-day delivery.",
        keywords: "Dublin florist, flower delivery Dublin, fresh flowers Ireland, wedding flowers Dublin, bouquets Dublin"
    };

    try {
        const allProducts = getProducts();
        const featuredProducts = allProducts.filter(product => product.featured === true);
        res.render('index', { state: state, head: head, products: featuredProducts });
    } catch (err) {
        console.error("Error reading products:", err);
        res.status(500).send("Internal Server Error: Missing Data");
    }
});

// shop page route
app.get('/shop', (req, res) => {
    const state = { home: false, shop: true, about: false, contact: false, login: false, checkout: false };
    const head = {
        title: "Shop Flowers Online - Petal Poetry Dublin",
        description: "Shop our complete collection of fresh flowers, elegant bouquets, wedding arrangements, indoor plants, and floral gifts.",
        keywords: "buy flowers online Dublin, flower bouquets, wedding flowers"
    };

    try {
        const products = getProducts();
        res.render('shop', { state: state, head: head, products: products });
    } catch (err) {
        res.status(500).send("Internal Server Error: Missing Data");
    }
});

// about page route
app.get('/about', (req, res) => {
    const state = { home: false, shop: false, about: true, contact: false, login: false, checkout: false };
    const head = { title: "About Petal Poetry", description: "Learn about Dublin's trusted florist." };
    res.render('about', { state: state, head: head });
});

// contact page route
app.get('/contact', (req, res) => {
    const state = { home: false, shop: false, about: false, contact: true, login: false, checkout: false };
    const head = { title: "Contact Us", description: "Get in touch with Petal Poetry." };
    res.render('contact', { state: state, head: head });
});

// login page route
app.get('/login', (req, res) => {
    const state = { home: false, shop: false, about: false, contact: false, login: true, checkout: false };
    const head = { title: "Login", description: "Sign in to your account.", robots: "noindex, nofollow" };
    res.render('login', { state: state, head: head });
});

// checkout page route
app.get('/checkout', (req, res) => {
    const state = { home: false, shop: false, about: false, contact: false, login: false, checkout: true };
    const head = { title: "Checkout", description: "Complete your order.", robots: "noindex, nofollow" };
    res.render('checkout', { state: state, head: head });
});

// user details page route
app.get('/userdetails', (req, res) => {
    const state = { home: false, shop: false, about: false, contact: false, login: false, checkout: false, userdetails: true };
    const head = { title: "Your Account Details", description: "Manage your details.", robots: "noindex, nofollow" };
    res.render('userdetails', { state: state, head: head });
});

// Start the server
if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}

module.exports = app;