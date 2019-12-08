<template>
  <div>
    <div class="activeStoryTitle">Active Story</div>

    <div class="card text-center">
      <div class="card-header">{{this.activeStory.storyName}}</div>
      <div class="card-body row">
        <div
          v-for="point in points"
          :key="point"
          class="col-md-3 pointContainer"
          :class="DynamicClass"
          @click="setSelectedPoint(point)"
        >{{point}}</div>
      </div>
      <div class="card-footer text-muted">{{this.selectedPoint}} Voted</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
const points = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 134];
export default {
  data() {
    return {
      points,
      point: this.selectedPoint
    };
  },
  computed: {
    ...mapState({
      activeStory: state => state.sprint.activeStory,
      selectedPoint: state => state.sprint.selectedPoint
    }),
    DynamicClass: function() {
      return {
        ActiveButton: this.selectedPoint == this.point
      };
    }
  },
  methods: {
    setSelectedPoint(point) {
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