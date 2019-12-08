<template>
  <div>
    <div class="storyListTitle">Story List</div>

    <div class>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Story</th>
            <th scope="col">Story Point</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(story, index) in storyList[0]" :key="index">
            <td>{{story.storyName}}</td>
            <td>{{story.storyPoint}}</td>
            <td>{{story.status}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
      ...mapState({
        sprint: state => state.sprint,
        storyList: state => state.sprint.storyList
      })
    }
};
</script>

<style>
</style>