import { createRouter, createWebHistory } from 'vue-router'
import MemberLogin from '@/views/Member/MemberLogin.vue'
import MemberSettings from '@/views/Member/MemberSettings.vue'
import MemberRegister from '@/views/Member/MemberRegister.vue'
import Userpage from '@/views/Userpage.vue'
import CompanyList from '@/views/Company/CompanyList.vue'
import CompanyCreate from '@/views/Company/CompanyCreate.vue'

const routes = [
  {
    path: '/',
    redirect: 'login'
  },

  {
    path: '/login',
    name: 'login',
    component: MemberLogin
  },

  {
    path: '/settings',
    name: 'settings',
    component: MemberSettings
  },

  {
    path: '/register',
    name: 'register',
    component: MemberRegister
  },

  {
    path: '/mainMenu',
    name: 'menu',
    component: Userpage
  },

  {
    path: '/myCompanies',
    name: 'myCompanies',
    component: CompanyList
  },

  {
    path: '/addCompany',
    name: 'createCompany',
    component: CompanyCreate
  }


]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
