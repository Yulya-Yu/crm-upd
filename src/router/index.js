import Vue from 'vue'
import VueRouter from 'vue-router'
import StaffList from '@/components/staff/StaffList.vue'
import StaffRegister from '@/components/staff/StaffRegister.vue'
import StaffEdit from '../components/staff/StaffEdit.vue'
import ClientsMain from '../components/clients/ClientsMain.vue'
import ClientCard from '../components/clients/ClientCard.vue'
import CompanyEdit from '../components/clients/CompanyEdit.vue'
import ClientEdit from '../components/clients/ClientEdit.vue'
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
        path: '/clientsmain',
        name: 'ClientsMain',
        component: ClientsMain,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/clientsmain/:card_id',
        name: 'clientcard',
        component: ClientCard,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/companyedit/:company_id',
        name: 'companyedit',
        component: CompanyEdit,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/clientedit/:client_id',
        name: 'clientedit',
        component: ClientEdit,
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
        if (sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === undefined || sessionStorage.getItem('token') === '') {
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