import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import resizableColumns from '@/directives/resizable-columns.directive';
import './assets/css/style.scss';

Vue.config.productionTip = false
Vue.use(resizableColumns);

new Vue({
    router,
    vuetify,
    render: h => h(App),
}).$mount('#app')
