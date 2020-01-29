import Vue from 'vue'
import VueRouter from 'vue-router'
import StaffList from '@/components/staff/StaffList.vue'
import StaffRegister from '@/components/staff/StaffRegister.vue'
import StaffEdit from '../components/staff/StaffEdit.vue'
import Clients from '../components/Clients.vue'
import Orders from '../components/Orders.vue'
import Report from '../components/Report.vue'
import Requests from '../components/Requests.vue'
import DeletedStaff from '../components/staff/DeletedStaff.vue'
import Login from '../components/Login.vue'
import Menu from '../components/Menu.vue'
import MenuCategory from '../components/MenuCategory.vue'
//import { Store } from 'vuex'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'stafflist',
        component: StaffList
    },
    {
        path: '/stafflist',
        name: 'stafflist',
        component: StaffList,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/staffregister',
        name: 'staffregister',
        component: StaffRegister
    },
    {
        path: '/staffedit/:staff_id',
        name: 'staffedit',
        component: StaffEdit,
    },
    {
        path: '/clients',
        name: 'clients',
        component: Clients
    },
    {
        path: '/orders',
        name: 'orders',
        component: Orders
    },
    {
        path: '/report',
        name: 'report',
        component: Report
    },
    {
        path: '/requests',
        name: 'requests',
        component: Requests
    },
    {
        path: '/deletedstaff',
        name: 'deletedstaff',
        component: DeletedStaff
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/menu',
        name: 'menu',
        component: Menu,

    },
    {
        path: '/menucategory/:cat_id',
        name: 'menucategory',
        component: MenuCategory,
    },
]

const router = new VueRouter({
    routes
})

// Nav Guard
// router.beforeEach((to, from, next) => {
//     // Check for requiresAuth guard
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         // Check if NO logged user
//         if (Store.state.authenticated == false) {
//             // Go to login
//             next({
//                 path: '/login',
//                 query: {
//                     redirect: to.fullPath
//                 }
//             });
//         } else {
//             // Proceed to route
//             next();
//         }
//     }
// });
export default router