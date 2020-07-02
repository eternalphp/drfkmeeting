import Vue from 'vue'
import VueRouter from 'vue-router'
import MeetForm from '../views/MeetForm.vue'
//import MeetDetail from '../views/MeetDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MeetForm,
    meta: {
      title: '首页入口'
    }
    // redirect:'/meetDetail'
  },
  // {
  //   path: '/meetDetail',
  //   name: 'MeetDetail',
  //   component: MeetDetail
  // },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  // {
  //   path: '/qrcode',
  //   name: 'Qr',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/qrcode.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面 title */
  if (to.meta.title) {
	document.title = to.meta.title
  }
  next()
})

export default router
