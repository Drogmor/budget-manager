<template>
    <div class="l-auth-container">
        <div class="l-auth">
            <v-form v-model="validLogin">
                <v-text-field
                    label="Username"
                    v-model="credentials.username"
                    prepend-icon="account_box"
                    :rules="rules"
                    required
                    color="light-blue lighten-1"
                ></v-text-field>
                <v-text-field
                    label="Password"
                    v-model="credentials.password"
                    prepend-icon="lock"
                    :rules="rules"
                    :append-icon="loginPasswordVisible ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (loginPasswordVisible = !loginPasswordVisible)"
                    :type="loginPasswordVisible ? 'text' : 'password'"
                    color="light-blue lighten-1"
                    required
                ></v-text-field>
                <v-btn
                    flat
                    color="light-blue lighten-1"
                    @click.native="signUpVisible = true"
                >Create account</v-btn>
                <v-btn color="light-blue lighten-1" @click.native="submitAuthentication()">Login</v-btn>
            </v-form>
        </div>
        <div class="l-signup" v-if="signUpVisible">
            <v-form v-model="validSignUp">
                <v-text-field
                    label="Username"
                    v-model="newUser.username"
                    prepend-icon="account_box"
                    :rules="rules"
                    required
                    color="light-blue lighten-1"
                ></v-text-field>
                <v-text-field
                    label="Password"
                    v-model="newUser.password"
                    prepend-icon="lock"
                    :rules="rules"
                    :append-icon="signUpPasswordVisible ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (signUpPasswordVisible = !signUpPasswordVisible)"
                    :type="signUpPasswordVisible ? 'text' : 'password'"
                    color="light-blue lighten-1"
                    required
                ></v-text-field>
                <v-btn block color="light-blue lighten-1" @click.native="submitSignUp()">Sign Up</v-btn>
            </v-form>
        </div>
        <v-snackbar
            timeout="6000"
            bottom="bottom"
            color="red lighten-1"
            v-model="snackbar"
        >{{ message }}</v-snackbar>
    </div>
</template>
<script>
import Authentication from '@/components/pages/Authentication'
export default {
    data () {
        return {
            snackbar: false, // used to display our snackbar
            validLogin: false, // used to validate the login form
            validSignUp: false, // used to validate the sign up form
            signUpVisible: false, // used to render the sign up form if "true"
            loginPasswordVisible: false, // indicate whether the user can see typed pass in login form
            signUpPasswordVisible: false, // indicate whether the user can see typed pass in signup form
            rules: [(value) => !!value || 'This field is required'], // Rules for input validation
            credentials: { // Object binded to login inputs for authentication
                username: '',
                password: ''
            },
            newUser: { // Object binded to sign up forms for signing up
                username: '',
                password: ''
            },
            message: '' // Renders authentication messages
        }
    },
    methods: {
        // Calls the authenticate method from Authentication (index.js)
        submitAuthentication () {
            // passes the {data} as context arg, {data.credentials} as credentials arg and '/' as redirect arg
            Authentication.authenticate(this, this.credentials, '/')
        },
        // Calls the signup method from Authentication (index.js)
        submitSignUp () {
            Authentication.signup(this, this.newUser, '/')
        }
    }
}
</script>

<style lang="scss">
@import "./../../../assets/styles";

.l-auth,
.l-signup {
  background-color: $background-color;
  padding: 15px;
  margin: 45px auto;
  min-width: 272px;
  max-width: 320px;
}
.l-auth {
  animation: bounceIn 1s forwards ease;
}
.l-signup {
  animation: slideInFromLeft 1s forwards ease;
}
</style>
