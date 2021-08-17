<template>
  <div
    :class="[
      'absolute',
      'bottom-0',
      'flex',
      'flex-row',
      'justify-center',
      'w-full',
      'z-20',
    ]"
  >
    <div class="w-3/4 bg-white rounded-t-md p-3">
      <div>
        <div class="grid grid-flow-col grid-cols-3 grid-rows-1 gap-4">
          <div v-if="showUp">🏆 &nbsp;|</div>

          <div v-if="!showUp">
            🏆 &nbsp;|&nbsp;&nbsp;&nbsp;{{ leaderboard[0].country }}:
            {{ Intl.NumberFormat().format(leaderboard[0].score) }}
          </div>
          <div v-else class="text-center">Leaderboard</div>

          <div v-if="!showUp" />
          <div class="text-right" @click="toggleshowUp()">
            |
            <span v-if="!showUp"> ^ </span>
            <span v-else> v </span>
          </div>
        </div>
      </div>
      <transition name="slide">
        <Leader v-if="showUp" />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useStore } from "vuex";
import { key } from "../store/store";
import leaderboardObj from "../interface/leaderboardObj";
import Leader from "./Leader.vue";

@Options({
  components: {
    Leader,
  },
})
export default class Footer extends Vue {
  store = useStore(key);
  showUp = false;

  leaderboard: Array<leaderboardObj> = [
    {
      country: "Loading",
      score: 0,
    },
  ];

  mounted() {
    this.sockets.subscribe("pop_leaderboard", (data: Array<leaderboardObj>) => {
      this.leaderboard = data;
      this.store.commit("setleaderBoard", data);
    });
  }

  toggleshowUp() {
    console.log("Bara");
    this.showUp = !this.showUp;
  }
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.5s ease-in-out;
}

.slide-enter-to,
.slide-leave-from {
  overflow: hidden;
  max-height: 100vh;
}

.slide-enter-from,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
