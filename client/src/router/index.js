import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/routes/Home'
import Login from '@/routes/Login'
import Register from '@/routes/Register'
import Download from '@/routes/Download'

import Dashboard from '@/routes/Dashboard/Dashboard'
import AddArticle from '@/routes/Dashboard/AddArticle'
import VersionFile from '@/routes/Dashboard/VersionFile'

import News from '@/routes/News'
import FAQ from '@/routes/FAQ'
import NotFound from '@/routes/NotFound'
import SingleArticle from '@/routes/SingleArticle'
import Credits from '@/routes/Credits'
import Recruiting from '@/routes/Recruiting'

import Store from '@/store'

Vue.use(Router)

function requireAuth (to, from, next) {
  if (Store.state.logged) next()
  else next({
    path: '/login'
  })
}

function checkAuth (to, from, next) {
  if (!Store.state.logged) next()
  else next({
    path: '/dashboard'
  })
}

const title = text => ({ title: `${text} - PonyAge` })

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      meta: title('Login'),
      component: Login,
      beforeEnter: checkAuth
    },
    {
      path: '/register',
      meta: title('Register'),
      component: Register,
      beforeEnter: checkAuth
    },
    {
      path: '/dashboard',
      meta: title('Dashboard'),
      component: Dashboard,
      beforeEnter: requireAuth,
      children: [
        {
          name: 'addArticle',
          path: 'article',
          component: AddArticle
        },
        {
          name: 'editVersion',
          path: 'version',
          component: VersionFile
        }
      ]
    },
    {
      path: '/news',
      meta: title('News'),
      component: News
    },
    {
      path: '/article/:id',
      name: 'article',
      meta: title('Article'),
      component: SingleArticle,
      props: true
    },
    {
      path: '/download',
      meta: title('Download'),
      component: Download
    },
    {
      path: '/faq',
      meta: title('F.A.Q.'),
      component: FAQ
    },
    {
      path: '/credits',
      meta: title('Credits'),
      component: Credits
    },
    {
      path: '/recruiting',
      mata: title('Recruiting'),
      component: Recruiting
    },
    {
      path: '/404',
      meta: title('404'),
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title && document.title !== to.meta.title) document.title = to.meta.title
  else if (document.title !== 'PonyAge: Chronicles') document.title = 'PonyAge: Chronicles'
  next()
})

export default router
