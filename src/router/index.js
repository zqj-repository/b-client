import Vue from 'vue'
import Router from 'vue-router'
import Articles from '@/pages/Articles'
import ArticleDetail from '@/pages/ArticleDetail'
import Admin from '@/pages/admin/Admin'
import CategoryList from '@/pages/admin/CategoryList'
import ArticleWriter from '@/pages/admin/ArticleWriter'
import ArticleList from '@/pages/admin/ArticleList'
import HomeBoard from '@/pages/admin/HomeBoard'
import BaseLayout from '@/components/layout/BaseLayout'
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
			redirect: '/admin'
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
      component: Admin,
      meta: {
        breadcrumbName: '首页'
      },
      children: [
        {
          path: '',
          name: 'Home Board',
          component: HomeBoard
        },
        {
          path: 'artichle-management',
          name: 'Article Management',
          component: BaseLayout,
          redirect: 'artichle-management/article-list',
          meta: {
            breadcrumbName: '文章管理'
          },
          children: [
            {
              path: '',
              redirect: 'article-list'
            },
            {
              path: 'article-list',
              name: 'Article List',
              component: ArticleList,
              meta: {
                breadcrumbName: '文章列表'
              }
            },
            {
              path: 'article-writer',
              name: 'Article Writer',
              component: ArticleWriter,
              meta: {
                breadcrumbName: '编辑器'
              }
            }
          ]
        },
        {
          path: 'category-management',
          name: 'Category Management',
          component: BaseLayout,
          redirect: 'category-management/category-list',
          meta: {
            breadcrumbName: '分类管理'
          },
          children: [
            {
              path: '',
              redirect: 'category-list'
            },
            {
              path: 'category-list',
              name: 'Category List',
              component: CategoryList,
              meta: {
                breadcrumbName: '分类列表'
              }
            }
          ]
        },

      ]
    }
  ]
})
