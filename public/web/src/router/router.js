import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login/login.vue";
import Layout from "@/components/layout.vue";
import Home from "@/views/home/home.vue";
import Balance from "@/views/balance/balance.vue";
import Salary from "@/views/salary/salary.vue";
import Summary from "@/views/summary/summary.vue";
import Admin from "@/views/home/admin.vue";
import Datashowinput from "@/views/home/Datashowinput.vue";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/login',    //请求链接  登录
    name: 'login',       //其名称
    component: Login    //引入组件
  },
  {
    path:'/admin',
    component:Layout,
    children:[
      {
        path:'/admin',
        component:Admin
      },
    ]
  },
  {
    path: '/',
    name: 'index',
    component: Layout,
    children:[
      {
        path:'/index',
        component:Home
      },
      {
        path:'/balance',
        component:Balance
      },
      {
        path:'/salary',
        component:Salary
      },
      {
        path:'/summary',
        component:Summary
      },
      {
        path:'/datashowinput',
        component:Datashowinput
      }
    ]
  },
  // {
  //   path
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
