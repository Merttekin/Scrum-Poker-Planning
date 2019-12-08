<template>
  <div class="container">
    <div class="viewPlanDeveloperContainer">
      <Header />
    </div>

    <div class="row">
      <div class="col-md-8">
        <StoryList />
      </div>
      <div class="col-md-4">
        <ActiveStory />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../common/Header.vue';
import StoryList from '../story/StoryList.vue';
import ActiveStory from '../story/ActiveStory.vue';

export default {
  components: {
    Header,
    StoryList,
    ActiveStory
  }
}
</script>

<style>

</style>
