import Vue from 'vue'
import Router from 'vue-router'
// Added on step 11
import * as Auth from '@/components/pages/Authentication'

/* 
  *** Step 2: Cleaning up the routes file ***
  This file will be used to import components and define any routes for simplicity.
*/

// Pages
import Home from '@/components/pages/Home' // Added on step 11
import Authentication from '@/components/pages/Authentication/Authentication'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiredAuth: true // if the user is not authenticated he will be redirected to the login page
      }
    },
    {
      path: '/login',
      name: 'Authentication',
      component: Authentication
    }
  ]
})

// Create a nagivation guard. Before each route:
// 1) check if has the meta.requiredAuth set to true
// 2) check if Authentication file's user obj is authenticated (redirect to login if not)
router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth) {
    if (Auth.default.user.authenticated) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})

export default router
