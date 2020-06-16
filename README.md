# Roberthood

Users can read up on latest business news, check stock quotes, add ticker to watchlist, and buy and sell stocks in a portfolio.

[Live Site](https://roberthood-trading-platform.herokuapp.com/)

## Technologies Used

* React JS
* Ruby on Rails
* IEX API
* News API
* Recharts API
* Ajax
* HTML3
* CSS5
* Firebase Database

One of the technical challenged I faced include providing login errors whe users login with incorrect credentials. The way I solved the issue was to set up states for error as well as mapping the state of current user into the login component. 

```javascript

//login_container.js

const msp = state => ({
  currentUser: state.session.currentUser
})


//login.jsx

validate() {
      let usernameError = "";
      let passwordError = "";
      let credentialsError = "";

      if (!this.state.username) {
        usernameError = "Username cannot be blank";
      }

      if (this.state.password.length < 6) {
        passwordError = "Password must have minimim of 6 characters"
      }
      
      if (!this.state.currentUser) {
        credentialsError = "Unable to login with provided credentials";
      }

      if (usernameError || passwordError || credentialsError) {
        this.setState({ usernameError, passwordError, credentialsError});
        return false; 
      }

      return true; 
  }
```
![Roberthood validation](https://user-images.githubusercontent.com/43966507/84723731-451f1500-af54-11ea-81ca-c48cc107b61c.gif)

## Future Considerations

* Incorporate predictive search
* More comprehensive portfolio view
* Ability to convert cash into and out of stocks
* Ability to handle shares
  




