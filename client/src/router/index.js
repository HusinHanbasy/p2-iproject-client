import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
      component: Login
    },
    // {
    //   path: '/detail/:id',
    //   name: 'detail',
    //   component: Detail
    // },
    // {
    //   path: '/favorite',
    //   name: 'favorite',
    //   component: Favorite
    // },
  ]
})
// router.beforeEach((to, from, next) => {
//   if (
//     (localStorage.access_token && to.name === "login") ||
//     (localStorage.access_token && to.name === "register")
//   ) {
//     next({ name: "home" });
//   } else if (!localStorage.access_token && to.name === "bookmark") {
//     next({ name: "login" });
//   } else {
//     next();
//   }
// });
export default router
