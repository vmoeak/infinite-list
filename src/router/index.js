import Vue from 'vue';
import Router from 'vue-router';
import listNews from '@/pages/list-news';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'listNews',
            component: listNews
        }
    ]
});
