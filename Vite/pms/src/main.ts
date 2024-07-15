import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from "./router";
import store from "./store";
import VueApexCharts from "vue3-apexcharts";
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/style.css'
// noinspection JSIgnoredPromiseFromCall
store.dispatch('checkLogin');
createApp(App).use(ElementPlus).use(router).use(store).use(VueApexCharts).mount('#app')
