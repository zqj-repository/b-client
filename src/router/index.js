import Vue from 'vue'
import Router from 'vue-router'
import Articles from '@/pages/Articles'
import ArticleDetail from '@/pages/ArticleDetail'
import Admin from '@/pages/admin/Admin'
import CategoryBoard from '@/pages/admin/CategoryBoard'
import ArticleWriter from '@/pages/admin/ArticleWriter'
import ArticleBoard from '@/pages/admin/ArticleBoard'
import HomeBoard from '@/pages/admin/HomeBoard'
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
          path: '',
          name: 'Home Board',
          title: '首页面板',
          component: HomeBoard
        },
        {
          path: 'article-board',
          name: 'Article Board',
          component: ArticleBoard
        },
        {
          path: 'article-writer',
          name: 'Article Writer',
          component: ArticleWriter
        },
        {
          path: 'category-Board',
          name: 'Category Board',
          component: CategoryBoard
        }
      ]
    }
  ]
})
