<template>
  <div class="container">
      <div class="viewPlanScrumMasterContainer">
          <Header />

          <div class="row">
              <div class="col-md-6">
                  <StoryList />
              </div>

              <div class="col-md-3">
                  <ActiveStory :isDeveloper="false" />
              </div>

              <div class="col-md-3">
                  <ScrumMasterPanel />
              </div>
              {{this.sprint}}
          </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Header from '../common/Header.vue';
import StoryList from '../story/StoryList.vue';
import ActiveStory from '../story/ActiveStory.vue';
import ScrumMasterPanel from '../scrumMaster/ScrumMasterPanel.vue';

import { getSprint } from '../../services/service';

export default {
  components: {
      Header,
      StoryList,
      ActiveStory,
      ScrumMasterPanel
  },
  computed: {
      ...mapState({
          sprint: state => state.sprint
      })
  },
  beforeMount() {
    const { story } = this.$route.query;
    if (story) {
      if (!this.sprint.sessionName) {
        getSprint(story).then(res => {
          res.storyList = [res.storyList];
          res.activeStory = res.storyList[0][0];

          this.$store.dispatch('setSprintData', res);
        });
      }
    }
  }
}
</script>

<style>

</style>
