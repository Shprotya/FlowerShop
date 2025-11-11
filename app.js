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
    state={'home' : true, contact : false}
    // set specifics for <head>
    head={'title': "Petal Poetry", description: "Explore different flowers for sale", 
    keywords: "flower shop, buy flowers, floral arrangements, bouquets"}
    res.render('index', {state:state, head:head});
    // send this to terminal where node app is running
    console.log('home')
});


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});