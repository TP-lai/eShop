import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    component: () => import('../views/LogIn.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/ProductList.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/CouponOffer.vue')
      }

    ]
  },
  {
    path: '/products',
    component: () => import('../user/ProductAll.vue'),
    children: [
      {
        path: 'backpack',
        component: () => import('../user/ProductBackpack.vue')
      },
      {
        path: 'accesarry',
        component: () => import('../user/ProductAccesarry.vue')
      },
      {
        path: 'backpack/:productId',
        component: () => import('../user/ProductDetails.vue')
      },
      {
        path: 'cart',
        component: () => import('../user/CartCheck.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
