import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import './assets/fonts.css';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Vuex);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
