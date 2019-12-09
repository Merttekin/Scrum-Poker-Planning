<template>
  <div>
    <div class="activeStoryTitle">Active Story</div>

    <div class="card text-center">
      <div class="card-header">{{this.activeStory.storyName}}</div>
      <div class="card-body row">
        <div
          v-for="(point, index) in points"
          :key="index"
          class="col-md-3 pointContainer"
          :class="DynamicClass"
          @click="setSelectedPoint(point)"
        >{{point}}</div>
      </div>
      <div class="card-footer text-muted">{{point}} Voted</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { updateStoryList } from '../../services/service';
import {STORY_LIST_NOT_VOTED_STATUS, STORY_LIST_VOTED_STATUS} from '../../constants/constants';

const points = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 134];
export default {
  data() {
    return {
      points,
      point: this.selectedPoint,
      clickDisabled: false
    };
  },
  computed: {
    ...mapState({
      storyList: state => state.sprint.storyList[0],
      activeStory: state => state.sprint.activeStory,
      selectedPoint: state => state.sprint.selectedPoint //düzgün çalışmıyor
    }),
    DynamicClass: function() {
      return {
        ActiveButton: this.selectedPoint == this.point
      };
    }
  },
  methods: {
    setSelectedPoint(point) {
      if (this.clickDisabled) {
        return;
      }
      this.clickDisabled = true;
      this.point = this.selectedPoint;

      const { story } = this.$route.query;
      let updated = false;
      this.storyList.map(story => {
        if (story.storyName === this.activeStory.storyName) {
          story.voters = story.voters.map(voter => {
            if (voter.isVoted === STORY_LIST_NOT_VOTED_STATUS && !updated) {
              voter.storyPoint = point;
              voter.isVoted = STORY_LIST_VOTED_STATUS;
              updated = true;
            }
            return voter;
          });
        }
        return story;
      });
      updateStoryList(story, this.storyList);
      this.$store.dispatch('setSelectedPoint', point);
    }
  }
};
</script>

<style>
.pointContainer {
  border: 2px solid #000;
  padding: 3px;
  margin: 4px 0;
  cursor: pointer;
  text-align: center;
}
.ActiveButton {
  border: 2px solid green;
}
</style>