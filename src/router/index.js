import Vue from 'vue'
import Router from 'vue-router'
import Articles from '@/pages/Articles'
import ArticleDetail from '@/pages/ArticleDetail'
import Admin from '@/pages/admin/Admin'
import CategoryManagement from '@/pages/admin/CategoryManagement'
import ArticleWriter from '@/pages/admin/ArticleWriter'
import ArticleManagement from '@/pages/admin/ArticleManagement'
Vue.use(Router)

/**
 * /
 * article list
 * article details
 * /admin
 * article poster
 * category
 */

export default new Router({
  mode: 'history',
  routes: [
    {
			path: '/',
			name: 'Home',
			redirect: '/articles'
		},
    {
      path: '/articles',
      name: 'Articles',
      component: Articles
    },
    {
      path: '/article-detail',
      name: 'Article Detail',
      component: ArticleDetail
    },
    {
      path: '/admin',
      name: 'Admin Home',
      component: Admin,
      children: [
        {
          path: 'articles',
          name: 'Article Management',
          component: ArticleManagement
        },
        {
          path: 'articles/article-writer',
          name: 'Article Writer',
          component: ArticleWriter
        },
        {
          path: 'category-management',
          name: 'Category Management',
          component: CategoryManagement
        }
      ]
    }
  ]
})
