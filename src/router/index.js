import {createRouter, createWebHashHistory} from 'vue-router';
import UserProductList from '../views/UserProductList.vue';
import CoporateProduct from "../views/CorporateProduct.vue"
import CoporateLogin from "../views/CorporateLogin.vue"
import CoporateProductList from '../views/CoporateProductList.vue';
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'UserProductList',
      component: UserProductList,
      meta: {
        title: 'UserProductList'
      }
    },
    {
      path: '/coporateproduct',
      name: 'CoporateProduct',
      component: CoporateProduct,
      meta: {
        title: 'CoporateProduct'
      }
    },
    {
      path: '/coporatelogin',
      name: 'CoporateLogin',
      component: CoporateLogin,
      meta: {
        title: 'CoporateLogin'
      }
    },
    {
      path: '/coporateproductlist',
      name: 'CoporateProductList',
      component: CoporateProductList,
      meta: {
        title: 'CoporateProductList'
      }
    },
  ]
})

const DEFAULT_TITLE = 'TITLE';

router.afterEach((to) => {
  document.title = to.meta.title ?? DEFAULT_TITLE
})

export default router
