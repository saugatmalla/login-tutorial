import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

const authdata = localStorage.getItem('auth');

new Vue({
  data: {
    auth: authdata ? JSON.parse(authdata) : {},

  },
  router,
  render: h => h(App),
}).$mount('#app');
