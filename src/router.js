import Vue from 'vue'
import Router from 'vue-router'
import BookStore from './components/BookStore.vue'
import BookShelf from './components/BookShelf.vue'
import Personal from './components/Personal.vue'
import Category from './components/Category.vue'
import BookGroup from './components/BookGroup.vue'
import Search from './components/Search.vue'
import Rank from './components/Rank.vue'
import BookList from './components/BookList.vue'
import BookInfo from './components/BookInfo.vue'
import SearchDetail from './components/SearchDetail.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/bookstore'
    },
    {
      path: '/bookstore',
      component: BookStore
    },
    {
      path: '/bookshelf',
      component: BookShelf
    },
    {
      path: '/personal',
      component: Personal
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/searchresult/:keyword',
      component: SearchDetail
    },
    {
      path: '/bookgroup',
      component: BookGroup
    },
    {
      path: '/booklist/:gender/:major',
      component: BookList
    },
    {
      path: '/bookinfo/:id',
      component: BookInfo
    },

  ]
})
