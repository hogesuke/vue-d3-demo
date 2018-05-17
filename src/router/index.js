import Vue from 'vue';
import Router from 'vue-router';
import LineGraph from '@/pages/LineGraph';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LineGraph',
      component: LineGraph,
    },
  ],
});
