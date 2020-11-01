import Vue from 'vue';
import Router from 'vue-router';
import listNews from '@/pages/list-news';
import listImg from '@/pages/list-img';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'listNews',
            component: listNews
        },
        {
            path: '/img',
            name: 'listImg',
            component: listImg
        }
    ]
});
