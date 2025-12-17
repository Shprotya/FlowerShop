🌸 Overview

Petal Poetry, a fictional e-commerce website for a premier florist in Dublin, Ireland. The application is built using Express.js and utilizes the Handlebars templating engine to render dynamic web pages. Product data is loaded from a local JSON file.

✨ Features

Multi-Page Application: Routes for Home (/), Shop (/shop), About (/about), Contact (/contact), Login (/login), Checkout (/checkout), and User Details (/userdetails).
Dynamic Product Loading: Loads featured products for the home page and all products for the shop page from a products.json file.
Handlebars Templating: Uses express-handlebars for views, layouts, and partials.
Static Asset Serving: Serves static files (CSS, images, etc.) from the public directory.
SEO-Friendly Head Data: Each route dynamically sets its own title, description, and keywords.

🛠️ Technology Stack
- Node.js
- Express.js: Web framework.
- Express Handlebars: Templating engine.
- fs (File System): Used for synchronously reading the local product data (products.json).
- Bootstrap
- SASS