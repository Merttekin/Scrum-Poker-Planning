import Vue from 'vue';
import VueRouter from 'vue-router';

import AddStoryList from '../components/views/AddStoryList.vue';
import ViewPlanDeveloper from '../components/views/ViewPlanDeveloper.vue';
import ViewPlanScrumMaster from '../components/views/ViewPlanScrumMaster.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/poker-planning-add-story-list', component: AddStoryList },
    { path: '/poker-planning-as-developer', component: ViewPlanDeveloper },
    { path: '/poker-planning-as-scrum-master', component: ViewPlanScrumMaster },
    { path: '*', redirect: '/poker-planning-add-story-list'}
];

export const router = new VueRouter({
    mode: 'history',
    routes
})