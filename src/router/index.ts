import { createRouter, createWebHistory } from 'vue-router'
import HomeTracker from '../components/HomeTracker.vue'
import TransactionHistory from '../components/TransactionHistory.vue'
import SettingTracker from '../components/SettingTracker.vue'
import TransactionMessage from '../components/TransactionMessage.vue'
// import MoneyManage from '../components/MoneyManage.vue'
import StockList from '../components/StockList.vue'
import StockDetail from '../components/StockDetail.vue'
import StockEdit from '../components/StockEdit.vue'
import StockCreate from '../components/StockCreate.vue'
import ShipStatus from '../components/ShipStatus.vue'
import TransactionAnalysis from '../components/TransactionAnalysis.vue'
import { useSidebarStore } from '../stores/sideBarStore'
// import HubLogOut from '@/components/HubLogout.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: HomeTracker,
  },
  {
    path: '/history',
    name: 'TransactionHistory',
    component: TransactionHistory,
  },
  {
    path: '/setting',
    name: 'setting',
    component: SettingTracker,
  },
  {
    path: '/messages',
    name: 'TransactionMessage',
    component: TransactionMessage,
  },
  // {
  //   path: '/money',
  //   name: 'MoneyManage',
  //   component: MoneyManage
  // },
  {
    path: '/stock',
    name: 'StockList',
    component: StockList,
  },
  {
    path: '/stock/detail',
    name: 'StockDetail',
    component: StockDetail,
  },
  {
    path: '/stock/edit',
    name: 'StockEdit',
    component: StockEdit,
  },
  {
    path: '/stock/create',
    name: 'StockCreate',
    component: StockCreate,
  },
  {
    path: '/transaction-status',
    name: 'ShipStatus',
    component: ShipStatus,
  },
  {
    path: '/analysis',
    name: 'TransactionAnalysis',
    component: TransactionAnalysis,
  },
  // {
  //   path: '/logout',
  //   name: 'HubLogOut',
  //   component: HubLogOut
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const sidebarStore = useSidebarStore()
  sidebarStore.setActivePath(to.path)
})

export default router
