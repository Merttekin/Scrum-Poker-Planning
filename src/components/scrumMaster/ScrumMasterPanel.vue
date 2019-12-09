<template>
  <div class="scrumMasterPanelContainer">
    <div class="activeStoryTitle">Scrum Master Panel</div>

    <div class="card text-center">
      <div class="card-body">
        <div>
          <label>{{this.activeStory.storyName}} is active</label>
        </div>
        <div v-for="(voter, index) in voters" :key="index">
          <label>{{voter.voterName}} : </label>
          <span> {{voter.isVoted}}</span>
        </div>
        <div>
          <label>Scrum Master : </label>
          <span> {{this.selectedPoint}}</span>
        </div>

        <div class="finalScoreContainer">
          <span>Final Score</span>
          <div>
            <input id="finalScore" type="number" />
          </div>
        </div>

        <div>
          <Button
            text="End Voting For"
            :activeStoryName="this.activeStory.storyName"
            :onClick="EndOfStory"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { updateStoryList } from '../../services/service';
import { STORY_LIST_PASSIVE_STATUS } from '../../constants/constants';

import Button from '../common/Button.vue';

export default {
  components: {
    Button
  },
  methods: {
    EndOfStory() {
      const { story } = this.$route.query;

      this.storyList.map(story => {
        if (story.storyName === this.activeStory.storyName) {
          story.status = STORY_LIST_PASSIVE_STATUS;
        }
        return story;
      });
      updateStoryList(story, this.storyList);
    }
  },
  computed: {
    ...mapState({
      storyList: state => state.sprint.storyList[0],
      voters: state => state.sprint.storyList[0][0].voters,
      activeStory: state => state.sprint.activeStory,
      selectedPoint: state => state.sprint.selectedPoint
    })
  }
};
</script>

<style>
.card-body {
  text-align: left;
}
.scrumMasterPanelContainer #finalScore {
  width: 30%;
}
.scrumMasterPanelContainer .finalScoreContainer {
  text-align: center;
  margin-bottom: 12px;
}
</style>