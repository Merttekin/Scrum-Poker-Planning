/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';

import service from '../services/service';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        sprint: {
            sessionName: '',
            numberOfVoters: null,
            storyList: [],
            activeStory: {},
            selectedPoint: 0
        }
    },
    mutations: {
        setSprintData: (state, payload) => {
            state.sprint = payload;
        },
        setActiveStory: (state, payload) => {
            state.sprint.activeStory = payload;
        },
        setSelectedPoint: (state, payload) => {
            state.sprint.selectedPoint = payload;
        }
    },
    actions: {
        fetchSprintData(context) {
            return service.fetchSprint()
                .then(sprint => context.commit('setSprintData', sprint));
        },
        setSprintData(context, data) {
            // service.setSprintData(data);
            context.commit('setSprintData', data);
        },
        setActiveStory(context, data) {
            context.commit('setActiveStory', data);
        },
        setSelectedPoint(context, data) {
            context.commit('setSelectedPoint', data);
        }
    },
    getters: {

    }
})