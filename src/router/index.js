import Vue from 'vue'
import Router from 'vue-router'
import UserProfile from '../components/UserProfile'
import UsersList from '../components/UsersList'

Vue.use(Router)

export const constantRouterMap = [
  { name: 'home', path: '/', component: UsersList },
  { name: 'profile', path: '/profile/:id', component: UserProfile }
]

export default new Router({
  hashbang: false,
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
