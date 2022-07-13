/**
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在frontEnd模式下才会用到
 * hidden:true                        是否显示在菜单中显示路由（默认值：false）
 * alwaysShow:true                    当只有一级子路由时是否显示父路由是否显示在菜单中显示路由（默认值：false）
 * name:"Demo"                        首字母大写，一定要与vue文件的name对应起来，用于noKeepAlive缓存控制（该项特别重要）
 * meta:{
    title:"title"                     菜单、面包屑、多标签页显示的名称
    target: '_blank',                 外链打开方式
    remixIcon:""                      remix图标
    isCustomSvgIcon:false,            是否是自定义svg图标（默认值：false，如果设置true，那么需要把你的svg拷贝到icon/remixIcon下，然后remixIcon字段配置上你的图标名）
    noKeepAlive:true                  当前路由是否不缓存（默认值：false）
    affix:true                        当前路由是否固定多标签页
    badge:"New"                       badge小标签（只支持子级）
    tagHidden:true                    当前路由是否不显示多标签页
   }
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/core/layouts'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
  },
  // {
  //   path: '/register',
  //   component: () => import('@/views/register'),
  //   hidden: true,
  // },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    hidden: true,
    meta: {
      title: '首页',
      remixIcon: 'home-4-line',
      affix: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index'),
        meta: {
          title: '首页',
          remixIcon: 'home-4-line',
          affix: true,
        },
      },
      {
        path: 'readme',
        name: 'readme',
        component: () => import('@/views/index'),
        hidden: true,
        meta: {
          title: '操作说明',
          remixIcon: 'book-3-line',
        },
      },
      {
        path: 'index3',
        name: 'Index3',
        component: () => import('@/views/index'),
        hidden: true,
        meta: {
          title: '系统配置',
          remixIcon: 'settings-2-line',
        },
      },
    ],
  },
  {
    path: '/exwarehouse',
    name: 'exwarehouse',
    component: Layout,
    redirect: '/exwarehouse/applylist',
    alwaysShow: true,
    meta: {
      title: '出库',
      remixIcon: 'shopping-cart-line',
    },
    children: [
      {
        path: 'applylist',
        name: 'applylist',
        hidden: true,
        component: () => import('@/views/ex-warehouse/applylist'),
        meta: {
          title: '送货申请单',
          remixIcon: 'file-text-line',
        },
      },
      {
        path: 'review',
        name: 'review',
        hidden: true,
        component: () => import('@/views/ex-warehouse/review'),
        meta: {
          title: '审核',
          remixIcon: 'auction-line',
        },
      },
      {
        path: 'delivery',
        name: 'delivery',
        hidden: true,
        component: () => import('@/views/ex-warehouse/delivery'),
        meta: {
          title: '出库单',
          remixIcon: 'pages-line',
        },
      },
      {
        path: 'shipping',
        name: 'shipping',
        hidden: true,
        component: () => import('@/views/ex-warehouse/shipping'),
        meta: {
          title: '送货单',
          remixIcon: 'truck-line',
        },
      },
      {
        path: 'permit',
        name: 'permit',
        hidden: true,
        component: () => import('@/views/ex-warehouse/permit'),
        meta: {
          title: '出门证',
          remixIcon: 'book-read-line',
        },
      },
      {
        path: 'returnOrder',
        name: 'returnOrder',
        hidden: true,
        component: () => import('@/views/ex-warehouse/returnOrder'),
        meta: {
          title: '退货申请单',
          remixIcon: 'share-forward-box-line',
        },
      },
      {
        path: 'count',
        name: 'count',
        hidden: true,
        component: () => import('@/views/ex-warehouse/count'),
        meta: {
          title: '查询统计',
          remixIcon: 'table-2',
        },
      },
      {
        path: 'user',
        name: 'user',
        hidden: true,
        component: () => import('@/views/ex-warehouse/user'),
        meta: {
          title: '用户管理',
          remixIcon: 'user-line',
        },
      },
    ],
  },

  // {
  //   path: '/error',
  //   name: 'Error',
  //   component: Layout,
  //   redirect: '/error/403',
  //   meta: {
  //     title: '错误页',
  //     remixIcon: 'error-warning-line',
  //   },
  //   children: [
  //     {
  //       path: '403',
  //       name: 'Error403',
  //       component: () => import('@/views/403'),
  //       meta: {
  //         title: '403',
  //         remixIcon: 'error-warning-line',
  //         //tagHidden: true,
  //       },
  //     },
  //     {
  //       path: '404',
  //       name: 'Error404',
  //       component: () => import('@/views/404'),
  //       meta: {
  //         title: '404',
  //         remixIcon: 'error-warning-line',
  //         //tagHidden: true,
  //       },
  //     },
  //   ],
  // },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

export function resetRouter() {
  router.matcher = new VueRouter({
    base: publicPath,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher
}

export default router
