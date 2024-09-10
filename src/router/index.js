import { createRouter, createWebHashHistory } from 'vue-router';
import UserProductList from '../views/UserProductList.vue';
import CoporateProduct from "../views/CorporateProduct.vue"
import CoporateLogin from "../views/CorporateLogin.vue"
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
      path: '/coporateproduct/:text',
      name: 'coporateproduct',
      component: CoporateProduct,
      props: route => ({text: route.params.text}),
    }

  ]
})

const DEFAULT_TITLE = 'TITLE';

router.afterEach((to) => {
  document.title = to.meta.title ?? DEFAULT_TITLE
})

export default router
