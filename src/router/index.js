import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "Dashboard", icon: "dashboard" },
      },
    ],
  },
  {
    path: "/user",
    component: Layout,
    children: [
      {
        path: "manager",
        name: "User",
        component: () => import("@/views/user/index"),
        meta: { title: "用户管理", icon: "form" },
      },
    ],
  },
  {
    path: "/update",
    component: Layout,
    redirect: "/update/brandDateSale",
    name: "Update",
    meta: { title: "数据管理模块", icon: "el-icon-s-help" },
    children: [
      {
        path: "brandDateSale",
        name: "BrandDateSale",
        component: () => import("@/views/updatedata/brandDateSale/index"),
        meta: { title: "品牌日销售数据" },
      },
      {
        path: "brandDateSaleProvince",
        name: "BrandDateSaleProvince",
        component: () =>
          import("@/views/updatedata/brandDateSaleProvince/index"),
        meta: { title: "品牌日销售省级数据" },
      },
      {
        path: "brandHourSale",
        name: "BrandHourSale",
        component: () => import("@/views/updatedata/brandHourSale/index"),
        meta: { title: "品牌小时销售数据" },
      },
      {
        path: "brandHourSaleProvince",
        name: "BrandHourSaleProvince",
        component: () =>
          import("@/views/updatedata/brandHourSaleProvince/index"),
        meta: { title: "品牌小时省份销售数据" },
      },
      {
        path: "goodsDateSale",
        name: "GoodsDateSale",
        component: () => import("@/views/updatedata/goodsDateSale/index"),
        meta: { title: "商品日销售数据" },
      },
      {
        path: "logisticsDateSend",
        name: "LogisticsDateSend",
        component: () => import("@/views/updatedata/logisticsDateSend/index"),
        meta: { title: "物流中心日发货" },
      },
      {
        path: "logisticsHourSend",
        name: "LogisticsHourSend",
        component: () => import("@/views/updatedata/logisticsHourSend/index"),
        meta: { title: "物流中心小时发货" },
      },
    ],
  },
  {
    path: "/brandInfo",
    component: Layout,
    children: [
      {
        path: "manager",
        name: "Shop",
        component: () => import("@/views/brand/index"),
        meta: { title: "板块品牌管理", icon: "form" },
      },
    ],
  },

  {
    path: "/shopInfo",
    component: Layout,
    children: [
      {
        path: "manage",
        name: "Shop",
        component: () => import("@/views/shop/index"),
        meta: { title: "店铺管理", icon: "form" },
      },
    ],
  },

  {
    path: "/channel",
    component: Layout,
    children: [
      {
        path: "manage",
        name: "Channel",
        component: () => import("@/views/channel/index"),
        meta: { title: "渠道管理", icon: "form" },
      },
    ],
  },
  {
    path: "/logistics",
    component: Layout,
    children: [
      {
        path: "manager",
        name: "Logistics",
        component: () => import("@/views/logistics/index"),
        meta: { title: "物流中心管理", icon: "form" },
      },
    ],
  },
  {
    path: "/province",
    component: Layout,
    children: [
      {
        path: "manager",
        name: "Province",
        component: () => import("@/views/province/index"),
        meta: { title: "省级管理", icon: "form" },
      },
    ],
  },
  {
    path: "/park",
    component: Layout,
    children: [
      {
        path: "parkspace",
        name: "ParkSpace",
        component: () => import("@/views/parkspace/index"),
        meta: { title: "运营空间管理", icon: "form" },
      },
    ],
  },
  {
    path: "/team",
    component: Layout,
    children: [
      {
        path: "team",
        name: "Team",
        component: () => import("@/views/team/index"),
        meta: { title: "空间团队管理", icon: "form" },
      },
    ],
  },
  {
    path: "/requestlog",
    component: Layout,
    children: [
      {
        path: "requestlog",
        name: "RequestLog",
        component: () => import("@/views/requestlog/index"),
        meta: { title: "推送历史记录", icon: "form" },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
