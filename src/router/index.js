import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta : {
      layout : 'main',
      auth : true,
    }
  },
  {
    path : '/login',
    name : 'login',
    meta : {
      layout : 'empty',
      auth : false
    },
    component :()=> import('../views/login')
  },
  {
    path : '/register',
    name : 'register',
    meta : {
      layout : 'empty',
      auth : false,
    },
    component :()=> import('../views/register')
  },
  {
    path : '/detail/:id',
    name : 'detail',
    meta : {
      layout : 'main',
      auth : true,
    },
    component :()=> import('../views/detailRecord')
  },
  {
    path : '/history',
    name : 'history',
    meta : {
      layout : 'main',
      auth : true,
    },
    component :()=> import('../views/history')
  },
  {
    path : '/planning',
    name : 'planning',
    meta : {
      layout : 'main',
      auth : true,
    },
    component :()=> import('../views/planning')
  },
  {
    path : '/profile',
    name : 'profile',
    meta : {
      layout : 'main',
      auth : true,
    },
    component :()=> import('../views/profile')
  },
  {
    path : '/record',
    name : 'record',
    meta : {
      layout : 'main',
      auth : true,
    },
    component :()=> import('../views/record')
  },
  {
    path : '/categories',
    name : 'categories',
    meta : {
      layout : 'main',
      auth : true,
    },
    component :()=> import('../views/categories')
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass : 'active',
  linkExactActiveClass : 'active'
})


// router.beforeEach((to, from, next) =>{
//   const requiredAuth = to.meta.auth;
//   console.log(requiredAuth);
//   if(requiredAuth && store.getters('isAutheticated')) {
//     next()
//   } else if(requiredAuth && !store.getters('isAutheticated')) {
//     next('/login?message = auth')
//   } else {
//     next()
//   }
// })
  router.beforeEach((to, from, next) => {

  const requiredAuth = to.meta.auth;
    if(requiredAuth && store.getters.isAutheticated) {
    next();
  } else if (requiredAuth && !store.getters.isAutheticated) { 
    console.log('auth',store.getters.isAutheticated);
    next('/login?message=auth');
  } else {
    next();
  }
})

export default router
