import Vue from 'vue'
import Router from 'vue-router'
import Articles from '@/pages/Articles'

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
          path: 'article-management',
          name: 'Article Management',
          component: ArticleManagement
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
