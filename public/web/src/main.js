import Vue from "vue";
import store from "./store/store.js";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router/router";
import axios from "axios"
import vueaxios from "vue-axios"
import VueSessionStorage from 'vue-sessionstorage'
import moment from 'moment'


Vue.use(ElementUI);
Vue.use(vueaxios, axios);
Vue.use(VueSessionStorage)
Vue.use(moment)

Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
