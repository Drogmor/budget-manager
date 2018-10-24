import Vue from 'vue'
import Router from 'vue-router'

/* 
  *** Step 2: Cleaning up the routes file ***
  This file will be used to import components and define any routes for simplicity.
*/

// Pages
import Authentication from '@/components/pages/Authentication/Authentication'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Authentication',
      component: Authentication
    }
  ]
})
