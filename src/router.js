import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search.vue')
    },
    {
      path: '/preview',
      name: 'preview',
      component: () => import('./views/Preview.vue')
    },
    {
      path: '/recording',
      name: 'recording',
      component: () => import('./views/Recording.vue')
    },
    {
      path: '/camera',
      name: 'camera',
      component: () => import('./views/Camera.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
