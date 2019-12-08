import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'

import { router } from './route/router';
import { store } from './store/store';

Vue.config.productionTip = false

Vue.use(Vuelidate);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
