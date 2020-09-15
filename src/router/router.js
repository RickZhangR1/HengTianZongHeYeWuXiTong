import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    // {
    //     path: "/sjzx",
    //     name: "sjzx",
    //     component: resolve => require(['@/views/page/sjzx'], resolve)
    // },
    {
        path: '/',
        name: 'login',
        component: resolve => require(['@/views/login/login'], resolve)
    },
    {
        path: '/index',
        component: resolve => require(['@/components/layout'], resolve),
        redirect: "/index",
        children: [
            {
                path: '/index',
                component: resolve => require(['@/views/home/home'], resolve)
            },
            {
                path: '/sbzl',
                component: resolve => require(['@/views/sbgl/sbzl'], resolve)
            },
            {
                path: '/sbbx',
                component: resolve => require(['@/views/sbgl/sbbx'], resolve)
            },
            {
                path: '/caidan',
                component: resolve => require(['@/views/page/caidan'], resolve)
            },
            {
                path: '/role',
                component: resolve => require(['@/views/page/role'], resolve)
            },
            {
                path: '/userinfo',
                component: resolve => require(['@/views/page/userinfo'], resolve)
            },
            {
                path: '/storagehouse',
                component: resolve => require(['@/views/storage/storagehouse'], resolve)
            },
            {
                path: '/storagede',
                component: resolve => require(['@/views/storage/storagede'], resolve)
            },
            {
                path: '/storagecar',
                component: resolve => require(['@/views/storage/storageHouseCar'], resolve)
            }
            ,
            {
                path: '/caigou1',
                component: resolve => require(['@/views/home/Datashow'], resolve)
            }
            ,
            {
                path:'/datasprocuredetails',
                component: resolve => require(['@/views/home/Datasprocuredetails'], resolve)
              },
			  {
                path: '/storma',
                component: resolve => require(['@/views/storage/storma'], resolve)
            },
            {
                path: '/stordetails',
                component: resolve => require(['@/views/storage/stordetails'], resolve)
            }
            ,{
                path: '/gysgl',
                component: resolve => require(['@/views/page/gysgl'], resolve)
            },
            {
                path: '/keypoint',
                component: resolve => require(['@/views/storage/keypointmaandde.vue'], resolve)
            }
            ,
            {
                path: '/gongyi1',
                component: resolve => require(['@/views/gongyi/gongyi1.vue'], resolve)
            }
            , {
                path:'/selectGongxv',
                component: resolve => require(['@/views/gongyi/selectGongxv.vue'], resolve)
              }
            ,{//面料检验汇总
                path:'/keypointcollect',
                component: resolve => require(['@/views/storage/keypointcollext.vue'], resolve)
            },{
                path:'/employ',
                component: resolve => require(['@/views/jbxx/empolyee.vue'], resolve)
            },{
                path:'/deparment',
                component: resolve => require(['@/views/jbxx/department.vue'], resolve)
            },{
                path:'/bbzx',
                component: resolve => require(['@/views/bbquery/bbzx.vue'], resolve)
            },{
                path:'/query/**',
                component: resolve => require(['@/views/bbquery/bbym.vue'], resolve)
            },
            {
                path:'/excel',
                component: resolve => require(['@/views/bbquery/excel.vue'], resolve)
            },
            {
                path:'/machine',
                component: resolve => require(['@/views/gongyi/machine.vue'], resolve)
            },
            {
                path:'/wequipment',
                component: resolve => require(['@/views/gongyi/wequipment.vue'], resolve)
            },
            {
                path:'/material',
                component: resolve => require(['@/views/home/material.vue'], resolve)  //面料
            },
            {
                path:'/materials',
                component: resolve => require(['@/views/home/materials.vue'], resolve)  //面料详情
            },

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
