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
        name: 'orders',
        component: Orders,
        meta: {
            requiresAuth: true
        }
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
        component: StaffRegister,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/staffedit/:staff_id',
        name: 'staffedit',
        component: StaffEdit,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/clients',
        name: 'clients',
        component: Clients,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/orders',
        name: 'orders',
        component: Orders,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/report',
        name: 'report',
        component: Report,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/requests',
        name: 'requests',
        component: Requests,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/deletedstaff',
        name: 'deletedstaff',
        component: DeletedStaff,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { hideNavigation: true }

    },
    {
        path: '/menu',
        name: 'menu',
        component: Menu,
        meta: {
            requiresAuth: true
        },

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
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (sessionStorage.getItem('login') === null || sessionStorage.getItem('login') === undefined || sessionStorage.getItem('login') === '' &&
            sessionStorage.getItem('password') === null || sessionStorage.getItem('password') === undefined || sessionStorage.getItem('password') === '') {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});
// router.beforeEach((to, from, next) => {
//     // Check for requiresAuth guard
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         // Check if NO logged user
//         if (sessionStorage.getItem('login') === null || sessionStorage.getItem('login') === undefined || sessionStorage.getItem('login') === '' &&
//             sessionStorage.getItem('password') === null || sessionStorage.getItem('password') === undefined || sessionStorage.getItem('password') === '') {
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

// router.beforeEach((to,from,next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (sessionStorage.getItem('login') === null || sessionStorage.getItem('login') === undefined || 
//             sessionStorage.getItem('login') === '' &&
//             sessionStorage.getItem('password') === null || sessionStorage.getItem('password') === undefined ||
//             sessionStorage.getItem('password') === '') {

//         }
//     } else {
// next();
//     }
// });
export default router