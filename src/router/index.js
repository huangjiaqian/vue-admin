import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Blog from '@/components/Blog'
import Article from '@/components/Article'

import iView from 'iview'
import 'iview/dist/styles/iview.css'    // 使用 CSS
import global_ from '@/components/Global'
import VueResource from 'vue-resource'
import VueQuillEditor from 'vue-quill-editor'

Vue.prototype.GLOBAL = global_

Vue.use(Router)
Vue.use(iView)
Vue.use(VueResource)
Vue.use(VueQuillEditor)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/article/edit.view',
      name: 'Article',
      component: Article
    }
  ]
})
