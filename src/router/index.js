import Vue from 'vue'
import VueRouter from 'vue-router'
import { authGuard } from "../auth/authGuard";
import Home from '../views/Home.vue'
import Profile from "../views/Profile.vue";
import Help from "../views/Help.vue";
import Browse from "../views/Browse.vue"
import OrderMgr from "../views/OrderMgr.vue"
import OrderEdit from "../views/OrderEdit.vue"

// import AirtableTest from '../views/AirtableTest.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/browse',
    name: 'Browse',
    component: Browse,
    beforeEnter: authGuard
  },
  // {
  //   path: '/AirtableTest',
  //   name: 'AirtableTest',
  //   component: AirtableTest,
  //   beforeEnter: authGuard
  // },
  {
    path: '/help',
    name: 'Help',
    component: Help,
    beforeEnter: authGuard
  },

  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: authGuard
  },
  {
    path: "/ordermgr",
    name: "OrderMgr",
    component: OrderMgr,
    beforeEnter: authGuard
  },
  {
    path: "/orderedit/:id",
    name: "OrderEdit",
    component: OrderEdit,
    props: true,
    beforeEnter: authGuard
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
