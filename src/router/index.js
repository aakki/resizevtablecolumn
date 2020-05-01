import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import HeartBeat from '../views/HeartBeat.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/',
        name: 'heart-beat',
        component: HeartBeat
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
