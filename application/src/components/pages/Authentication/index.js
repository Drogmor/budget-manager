import Axios from 'axios'
import router from '@/router'

const BudgetManagerAPI = `http://${window.location.hostname}:3001`


export default {
  // Start by creating a user object to check if authed or not
  user: {authenticated: false},
  /* 
        Create the authenticate(context, credentials, redirect) method
        1) arg: context is going to be the Vue component
        2) arg: credentials will be the username and password
        3) arg: redirect the path we want to redirect the user to
    */
  authenticate (context, credentials, redirect) {
    // 1) Use Axios to perform a POST on the API passing the arg: credentials       
    Axios.post(`${BudgetManagerAPI}/api/v1/auth`, credentials)
    // 2) destructure the data obj to keep the value of the {token}
      .then(({data: {token}}) => {
        // 3) store the {token} as a cookie (1d means expire in 1 day)
        context.$cookie.set('token', token, '1D')
        // 4) set the component's (arg: context) validLogin value to true
        context.validLogin = true
        // 5) set the {user}.authenticated to true
        this.user.authenticated = true

        // 6) redirect the user
        if (redirect) router.push(redirect)
      }).catch(({response: {data}}) => {
        context.snackbar = true
        context.message = data.message
      })
  },

  signup (context, credentials, redirect) {
    Axios.post(`${BudgetManagerAPI}/api/v1/signup`, credentials)
      .then(({data: {token}}) => {
        context.$cookie.set('token', token, '1D')
        context.validSignup = true
        this.user.authenticated = true
        if (redirect) router.push(redirect)
      }).catch(({response: {data}}) => {
        context.snackbar = true
        context.message = data.message
      })
  },

  // method to check if the user is authenticated
  checkAuthentication () {
    const token = document.cookie

    if (token) this.user.authenticated = true
    else this.user.authenticated = false
  },

  // method to return the authentication header
  getAuthenticationHeader (context) {
    return `Bearer ${context.$cookie.get('token')}`
  }
}
