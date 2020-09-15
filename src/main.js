import Vue from "vue";
import store from "./store/store.js";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router/router";
import axios from 'axios';
import VueAxios from "vue-axios";
import VueSessionStorage from 'vue-sessionstorage';
import echarts from 'echarts';
import './assets/icon/iconfont.css'
import Vue2OrgTree from 'vue2-org-tree';
import rem from "./utils/rem.js";
import LightTimeline from 'vue-light-timeline';
import VueCookies from 'vue-cookies';
import Blob from './utils/Blob'
import Export2Excel from './utils/Export2Excel'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import VXETablePluginExportXLSX from "vxe-table-plugin-export-xlsx";
// import Sortable from 'sortablejs';



Vue.use(Vue2OrgTree);
Vue.prototype.$echarts=echarts;
Vue.use(VueSessionStorage);
Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.use(LightTimeline);
Vue.use(VueCookies);
Vue.use(VXETable);
// Vue.use(Sortable);
Vue.$cookies.config('7d');
VXETable.use(VXETablePluginExportXLSX);
// 给 vue 实例挂载全局窗口对象
Vue.prototype.$XModal = VXETable.modal
//axios.defaults.baseURL = 'http://61.160.83.154:8088';
// axios.defaults.baseURL = 'http://121.229.24.37:8088';
//axios.defaults.baseURL = 'http://192.168.199.117:8088';
// axios.defaults.baseURL = 'http://192.168.199.118:8088';
axios.defaults.baseURL = 'http://192.168.199.104:8088';
///axios.defaults.baseURL = 'http://192.168.3.46:8088';

import '@/assets/iconfont1/iconfont.css'

Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
