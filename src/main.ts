import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createRouter, createWebHistory } from "vue-router";
// routes nya pake ini aja, ini udah auto routing dari folder pages 
import naive from "naive-ui";
import Cookies from "js-cookie";
import 'tailwindcss/tailwind.css';
// @ts-ignore
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
// import Login from "./pages/index.vue";
// import Home from "./pages/users/index.vue";
// import Detail from "./pages/users/[id]/index.vue";

const app = createApp(App);
app.use(VueQueryPlugin);
// const routes = [
//   {
//     path: '/login',
//     name: 'Login',
//     component: Login,
//   },
//   {
//     path: '/users',
//     name: 'Home',
//     component: Home,
//   },
//   {
//     path: '/detail/:id',
//     name: 'Detail',
//     component: Detail,
//   },
// ];
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)
const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  console.log(to);
  // const publicPages = ['/'];
  // const authRequired = !publicPages.includes(to.path);
  const loggedIn = !!Cookies.get('token');

  if(to.meta.requiresAuth && !loggedIn) return next('/login');
  if (to.name == "Login" && loggedIn ) return next('/users');
next();
  // if (authRequired && !loggedIn) {
  //   // Jika pengguna mencoba mengakses halaman yang memerlukan otentikasi
  //   // dan mereka belum login, arahkan mereka ke halaman login
  //   next('/login');
  // } else if (authRequired && !loggedIn) {
  //   // Jika pengguna mencoba mengakses halaman login dan belum login,
  //   // biarkan mereka melanjutkan
  //   next();
  // } else if (!authRequired && loggedIn) {
  //   // Jika pengguna mencoba mengakses halaman publik dan sudah login,
  //   // arahkan mereka ke halaman beranda
  //   next('/users');
  // } else {
  //   // Selain dari kondisi di atas, biarkan navigasi berlanjut seperti biasa
  //   next();
  // }
});

app.use(router);
app.mount("#app");
app.use(naive);