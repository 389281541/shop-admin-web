import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/spu',
    name: 'product',
    meta: {title: '商品', icon: 'product'},
    children: [
      {
        path: 'spu',
        name: 'spu',
        component: () => import('@/views/product/spu/index'),
        meta: {title: '商品管理', icon: 'product-list'}
      },
      {
        path: 'addSpu',
        name: 'addSpu',
        component: () => import('@/views/product/spu/add'),
        meta: {title: '商品添加', icon: 'product-list'},
        hidden: true
      },
      {
        path: 'updateSpu',
        name: 'updateSpu',
        component: () => import('@/views/product/spu/update'),
        meta: {title: '商品更新', icon: 'product-list'},
        hidden: true
      },
      {
        path: 'item',
        name: 'item',
        component: () => import('@/views/product/item/index'),
        meta: {title: '类别管理', icon: 'item-list'}
      },
      {
        path: 'updateItem',
        name: 'updateItem',
        component: () => import('@/views/product/item/update'),
        meta: {title: '类别修改', icon: 'item-list'},
        hidden: true
      },
      {
        path: 'addItem',
        name: 'addItem',
        component: () => import('@/views/product/item/add'),
        meta: {title: '添加类别', icon: 'item-list'},
        hidden: true
      },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/product/brand/index'),
        meta: {title: '品牌管理', icon: 'brand-list'}
      },
      {
        path: 'updateBrand',
        name: 'updateBrand',
        component: () => import('@/views/product/brand/update'),
        meta: {title: '品牌更新', icon: 'brand-list'},
        hidden: true
      },
      {
        path: 'addBrand',
        name: 'addBrand',
        component: () => import('@/views/product/brand/add'),
        meta: {title: '添加品牌', icon: 'brand-list'},
        hidden: true
      },
      {
        path: 'SpecName',
        name: 'SpecName',
        component: () => import('@/views/product/specName/index'),
        meta: {title: '属性管理', icon: 'spec-list'}
      },
      {
        path: 'addSpecName',
        name: 'addSpecName',
        component: () => import('@/views/product/specName/add'),
        meta: {title: '属性添加', icon: 'spec-list'},
        hidden: true
      },
      {
        path: 'updateSpecName',
        name: 'updateSpecName',
        component: () => import('@/views/product/specName/update'),
        meta: {title: '属性编辑', icon: 'spec-list'},
        hidden: true
      },
      {
        path: 'SpecValue',
        name: 'SpecValue',
        component: () => import('@/views/product/specValue/index'),
        meta: {title: '属性管理', icon: 'spec-list'},
        hidden: true
      },
      {
        path: 'addSpecValue',
        name: 'addSpecValue',
        component: () => import('@/views/product/specValue/add'),
        meta: {title: '属性值添加', icon: 'spec-list'},
        hidden: true
      },
      {
        path: 'updateSpecValue',
        name: 'updateSpecValue',
        component: () => import('@/views/product/specValue/update'),
        meta: {title: '属性值编辑', icon: 'spec-list'},
        hidden: true
      },
      {
        path: 'shop',
        name: 'shop',
        component: () => import('@/views/product/shop/index'),
        meta: {title: '商铺管理', icon: 'shop-list'}
      },
      {
        path: 'addShop',
        name: 'addShop',
        component: () => import('@/views/product/shop/add'),
        meta: {title: '商铺添加', icon: 'spec-list'},
        hidden: true
      },
      {
        path: 'updateShop',
        name: 'updateShop',
        component: () => import('@/views/product/shop/update'),
        meta: {title: '商铺编辑', icon: 'spec-list'},
        hidden: true
      }
    ]
  },
  {
    path: '/trade',
    component: Layout,
    redirect: '/trade/order',
    name: 'order',
    meta: {title: '交易', icon: 'order'},
    children: [
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/order/index'),
        meta: {title: '订单列表', icon: 'product-list'}
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/order/orderDetail'),
        meta: {title: '订单详情'},
        hidden: true
      },
      {
        path: 'deliverOrderList',
        name: 'deliverOrderList',
        component: () => import('@/views/order/deliverOrderList'),
        meta: {title: '发货列表'},
        hidden: true
      },
      {
        path: 'orderSetting',
        name: 'orderSetting',
        component: () => import('@/views/order/setting'),
        meta: {title: '订单设置', icon: 'order-setting'}
      }
    ]
  },
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/coupon',
    name: 'activity',
    meta: {title: '活动', icon: 'activity'},
    children: [
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('@/views/coupon/index'),
        meta: {title: '优惠券列表', icon: 'coupon'}
      },
      {
        path: 'addCoupon',
        name: 'addCoupon',
        component: () => import('@/views/coupon/add'),
        meta: {title: '添加优惠券'},
        hidden: true
      },
      {
        path: 'updateCoupon',
        name: 'updateCoupon',
        component: () => import('@/views/coupon/update'),
        meta: {title: '修改优惠券'},
        hidden: true
      },
      {
        path: 'couponHistory',
        name: 'couponHistory',
        component: () => import('@/views/coupon/history'),
        meta: {title: '优惠券领取详情'},
        hidden: true
      },
      {
        path: 'flash',
        name: 'flash',
        component: () => import('@/views/flash/index'),
        meta: {title: '秒杀活动列表', icon: 'flash'}
      },
      {
        path: 'sessionList',
        name: 'sessionList',
        component: () => import('@/views/flash/sessionList'),
        meta: {title: '秒杀时间段列表', icon: 'flash'},
        hidden: true
      },
      {
        path: 'selectSessionList',
        name: 'selectSessionList',
        component: () => import('@/views/flash/selectSessionList'),
        meta: {title: '秒杀时间段选择', icon: 'flash'},
        hidden: true
      },
      {
        path: 'flashSpuList',
        name: 'flashSpuList',
        component: () => import('@/views/flash/flashSpuList'),
        meta: {title: '秒杀商品列表', icon: 'flash'},
        hidden: true
      },
      {
        path: 'homeAdvertise',
        name: 'homeAdvertise',
        component: () => import('@/views/advertise/index'),
        meta: {title: '广告设置', icon: 'adv'}
      },
      {
        path: 'addHomeAdvertise',
        name: 'addHomeAdvertise',
        component: () => import('@/views/advertise/add'),
        meta: {title: '添加广告信息'},
        hidden: true
      },
      {
        path: 'updateHomeAdvertise',
        name: 'updateHomeAdvertise',
        component: () => import('@/views/advertise/update'),
        meta: {title: '修改广告信息'},
        hidden: true
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
