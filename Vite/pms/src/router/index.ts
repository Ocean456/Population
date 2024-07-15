import {createRouter, createWebHistory, RouteRecordRaw, Router} from "vue-router";
import Home from '../views/Home.vue'
import Setting from '../views/Setting.vue'
import Manage from "../views/Identity.vue";
import Export from "../views/Export.vue";
import Login from '../views/Login.vue'
import User from '../views/User.vue'
import Register from "../views/Register.vue";
import Domicile from "../views/Domicile.vue";
import Search from "../views/Search.vue"
import Issue from "../views/Issue.vue";
import Population from "../views/Population.vue";
import Migrate from "../views/Migrate.vue";
import Resident from "../views/Resident.vue";
import Statistics from "../views/Statistics.vue";
import store from "../store";
import {ElMessage} from "element-plus";

const routes: Array<RouteRecordRaw> = [
    {path: '/', component: Home, meta: {requiresAuth: true}},
    {path: '/setting', component: Setting, meta: {requiresAuth: true}},
    {path: '/identity', component: Manage, meta: {requiresAuth: true}},
    {path: '/export', component: Export, meta: {requiresAuth: true}},
    {path: '/login', component: Login, meta: {requiresAuth: false}},
    {path: '/user', component: User, meta: {requiresAuth: true}},
    {path: '/register', component: Register, meta: {requiresAuth: false}},
    {path: '/domicile', component: Domicile, meta: {requiresAuth: true}},
    {path: '/issue', component: Issue, meta: {requiresAuth: true}},
    {path: '/population', component: Population, meta: {requiresAuth: true}},
    {path: '/migrate', component: Migrate, meta: {requiresAuth: true}},
    {path: '/search', component: Search, meta: {requiresAuth: true}},
    {path: '/resident', component: Resident, meta: {requiresAuth: true}},
    {path: '/statistics', component: Statistics, meta: {requiresAuth: true}},
];

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const loggedIn = store.state.loggedIn;
    const requiresAuth = to.meta.requiresAuth;
    const authority = store.state.user.authority;

    if (loggedIn && authority == 0 && to.fullPath != '/user') {
        next('/user')
    }

    if (authority == 1 && to.fullPath == '/user') {
        next('/')
    }
    if (loggedIn && to.fullPath == '/login') {
        ElMessage.info("您已登录")
        next('/');
    }
    if (requiresAuth && !loggedIn) {
        if (from.fullPath !== '/') {
            ElMessage.warning("请先登录");
        }else {
            next('/login');
        }
    } else {
        next();
    }
});

export default router;
