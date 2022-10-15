import decode from 'jwt-decode';

// creating a new class that we will create instances of whenever a component imports it
class AuthService {
    // retrieve and decode data saved in token
    getProfile() {
        return decode(this.getToken());
    }
    // check ig user is logged in
    loggedIn() {
        const token = this.getToken;
        // return token if the token is NOT undefined and if the token is NOT expired
        return !!token && !this.isTokenExpired(token);
    }
    // check if token is expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            // if the expiration is in less than a second
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }
    // retrieve token from localStorage
    getToken() {
        return localStorage.getItem('id_token');
    }
    // set token to localStorage and send use to the homepage
    login(idToken) {
        // Save tolocalStorage
        localStorage.setItem('id_token', idToken);
        // load homepage
        window.location.assign('/');
    }
    // clear token from localStorage to end session and force logout with reload
    logout() {
        // Clear user token from localStorage
        localStorage.removeItem('id_token');
        // this will reload the page and reset the state of the application
        window.location.assign('/');
    }
}

// notice we're returning a new instance and not the class itself
export default new AuthService;