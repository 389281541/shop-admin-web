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
    redirect: '/product/item',
    name: 'product',
    meta: {title: '商品', icon: 'product'},
    children: [
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
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
