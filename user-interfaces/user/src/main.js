import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import './assets/fonts.css';
import store from './store';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-components';
import {
  applyPolyfills,
  defineCustomElements,
} from '@aws-amplify/ui-components/loader';

Vue.config.ignoredElements = [/amplify-\w*/];

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

applyPolyfills().then(() => {
  defineCustomElements(window);
});

Vue.config.productionTip = false;
Vue.use(Vuex);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
