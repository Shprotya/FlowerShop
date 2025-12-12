// custom.js 
// some basic functionality for login, checkout, userdetails
// amend and supplement in your project as you see fit


// set the checkout figure
if (localStorage.getItem('checkout') == null) {
    localStorage.setItem('checkout', 0);
}
var checkout = localStorage.getItem('checkout');
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

            //Set a flag to indicate successful logout BEFORE redirecting
            localStorage.setItem('logoutSuccess', '1');

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

    // NEW: Check for Logout Success Flag and show modal
    var logoutSuccess = localStorage.getItem('logoutSuccess');
    if (logoutSuccess == '1') {
        const modalElement = document.getElementById('logoutSuccessModal');

        // Ensure modal exists and Bootstrap JS is available
        if (modalElement && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            const logoutModal = new bootstrap.Modal(modalElement);
            logoutModal.show();
        }

        // IMPORTANT: Always remove the flag regardless of whether the modal showed
        localStorage.removeItem('logoutSuccess');
    }

    // Original Login/Logout logic
    if (loggedin == '1' || loggedin == 1) {
        if (loginEl) loginEl.innerHTML = 'Logout';
        if (userdetailsEl) {
            userdetailsEl.style.display = '';
        }
    } else {
        if (loginEl) loginEl.innerHTML = 'Login';
        if (userdetailsEl) userdetailsEl.style.display = 'none';
    }
}