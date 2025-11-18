// custom.js 
// some basic functionality for login, checkout, userdetails
// amend and supplement in your project as you see fit



// set the checkout figure
if (localStorage.getItem('checkout') == null) {  
    localStorage.setItem('checkout',0);
}
var checkout=localStorage.getItem('checkout');
var checkoutSpan = document.querySelector('#checkout');
if (checkoutSpan) { checkoutSpan.innerHTML = checkout; }

// attach login/logout click handler if element exists
var loginLogoutEl = document.getElementById('loginlogout');
if (loginLogoutEl) {
    loginLogoutEl.addEventListener('click', (event) => {
        event.preventDefault();
        var loggedin = localStorage.getItem('loggedIn');
        if (loggedin == '1' || loggedin == 1) {
            localStorage.setItem('loggedIn', 0);
            // redirect to the home route
            window.location.href = '/';
        } else {
            // go to the login route
            window.location.href = '/login';
        }
    });
}


// check if user is logged in or logged out..
checkLoginStatus();

function checkLoginStatus() {
    var loggedin = localStorage.getItem('loggedIn');
    var userdetailsEl = document.getElementById('userdetails');
    var loginEl = document.querySelector('#loginlogout');
    if (loggedin == '1' || loggedin == 1) {
        if (loginEl) loginEl.innerHTML = 'Logout';
        if (userdetailsEl) {
            userdetailsEl.style.display = '';
        }
    } else {
        if (loginEl) loginEl.innerHTML = 'Login';
        if (loginEl) loginEl.setAttribute('href', '/login');
        if (userdetailsEl) userdetailsEl.style.display = 'none';
    }
}
