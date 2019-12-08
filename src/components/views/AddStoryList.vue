<template>
  <div class="container">
    <div class="addStoryListContainer">
      <Header />

      <div class="addStoryListInformations">
        <div class="row">
          <div class="col-md-6">
            <div class="inputContainer">
              <span>Session Name</span>
              <input v-model="$v.sprint.sessionName.$model" type="text" />
              <div class="error" v-if="!$v.sprint.sessionName.required">Lütfen Sprint ismi giriniz.</div>
              <div
                class="error"
                v-if="!$v.sprint.sessionName.minLength"
              >Sprint ismi {{$v.sprint.sessionName.$params.minLength.min}} harften fazla olmalı.</div>
            </div>
            <div
              class="error"
              v-if="!$v.sprint.sessionName.maxLength"
            >Sprint ismi {{$v.sprint.sessionName.$params.maxLength.max}} harften az olmalı.</div>
          </div>

          <div class="col-md-6">
            <div class="inputContainer">
              <span>Number of voters</span>
              <input v-model="sprint.numberOfVoters" type="number" />
              <div
                class="error"
                v-if="!$v.sprint.numberOfVoters.between"
              >Kişi sayısı {{$v.sprint.numberOfVoters.$params.between.min}} ile {{$v.sprint.numberOfVoters.$params.between.max}} kişi arasında olmalıdır.</div>
            </div>
          </div>
        </div>

        <div class="row">
          <div
            class="col-md-12 addStoryListNote"
          >Paste your story List (Each line will be converted as a story)</div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <textarea
              v-model="sprint.storyList.storyName"
              class="form-control addStoryListTextarea"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="float-md-right float-sm-right float-lg-right startSessionBtn">
              <Button text="Start Session" :onClick="startSession" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  between,
  maxLength
} from 'vuelidate/lib/validators';

import Header from '../common/Header.vue';
import Button from '../common/Button.vue';

export default {
  components: {
    Header,
    Button
  },
  methods: {
    startSession() {
      if (
        this.sprint.sessionName.length < 4 ||
        (this.sprint.numberOfVoters <= 0 ||
          this.sprint.numberOfVoters > 12 ||
          this.sprint.numberOfVoters == '')
      ) {
        alert('Lütfen alanları eksiksiz giriniz.');
        return;
      }
      // this.$store.dispatch('fetchSprintData');
      this.sprint.storyList.storyName = this.sprint.storyList.storyName.split(
        "\n"
      );
      let votersArr = this.getVoters();
      const storyNames = this.sprint.storyList.storyName.map(
        storyName => storyName
      );
      let storyLists = storyNames.map(story => {
        return {
          storyName: story,
          status: "Not Voted",
          storyPoint: null,
          voters: votersArr
        };
      });
      this.activeStory = storyLists[0];
      this.activeStory.status = 'Active';
      this.sprint.storyList.push(storyLists);

      this.$store.dispatch('setSprintData', this.sprint);
      this.$store.dispatch('setActiveStory', this.activeStory);
      this.$router.push('poker-planning-as-scrum-master');
    },
    getVoters() {
      let voters = [];
      for (let i = 1; i <= this.sprint.numberOfVoters; i++) {
        let voter = {
          voterName: `Voter ${i}`,
          isVoted: 'Not Voted'
        };
        voters.push(voter);
      }
      return voters;
    }
  },
  data() {
    return {
      sprint: {
        sessionName: '',
        numberOfVoters: null,
        storyList: [],
        activeStory: {},
        selectedPoint: 0
      }
    };
  },
  validations: {
    sprint: {
      sessionName: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(200)
      },
      numberOfVoters: {
        between: between(1, 12)
      }
    }
  }
};
</script>

<style>
.addStoryListContainer .inputContainer span {
  margin-right: 30px !important;
  width: 30%;
}
.addStoryListContainer .inputContainer input {
  width: 70%;
}
.addStoryListContainer .addStoryListNote {
  margin: 24px 0;
}
.addStoryListContainer .addStoryListTextarea {
  height: 250px;
}
.addStoryListContainer .buttonContainer {
  float: right;
}
.addStoryListContainer .startSessionBtn {
  margin: 24px 0;
}
.error {
  color: red;
}
</style>
