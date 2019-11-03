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
    path: '/item',
    component: Layout,
    redirect: '/item/index',
    name: 'item',
    meta: {title: '类别', icon: 'item'},
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/item/index'),
        meta: {title: '类别列表', icon: 'item-list'}
      },
      {
        path: 'update',
        name: 'update',
        component: () => import('@/views/item/update'),
        meta: {title: '类别修改', icon: 'item-list'},
        hidden: true
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/item/add'),
        meta: {title: '添加类别', icon: 'item-add'}
      }
    ]
  },
  {
    path: '/brand',
    component: Layout,
    redirect: '/brand/index',
    name: 'brand',
    meta: {title: '品牌', icon: 'brand'},
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/brand/index'),
        meta: {title: '品牌列表', icon: 'brand-list'}
      },
      {
        path: 'update',
        name: 'update',
        component: () => import('@/views/brand/update'),
        meta: {title: '品牌更新', icon: 'brand-list'},
        hidden: true
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/brand/add'),
        meta: {title: '添加品牌', icon: 'brand-add'}
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
