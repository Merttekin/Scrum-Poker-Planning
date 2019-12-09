import Vue from 'vue';
import VueRouter from 'vue-router';

import AddStoryList from '../components/views/AddStoryList.vue';
import ViewPlanDeveloper from '../components/views/ViewPlanDeveloper.vue';
import ViewPlanScrumMaster from '../components/views/ViewPlanScrumMaster.vue';

import { POKER_PLANNING_ADD_STORY_LIST, POKER_PLANNING_AS_SCRUM_MASTER, POKER_PLANNING_AS_DEVELOPER } from '../constants/routeConstants';

Vue.use(VueRouter);

const routes = [
    { path: POKER_PLANNING_ADD_STORY_LIST, component: AddStoryList },
    { path: POKER_PLANNING_AS_DEVELOPER, component: ViewPlanDeveloper },
    { path: POKER_PLANNING_AS_SCRUM_MASTER, component: ViewPlanScrumMaster },
    { path: '*', redirect: POKER_PLANNING_ADD_STORY_LIST }
];

export const router = new VueRouter({
    mode: 'history',
    routes
})