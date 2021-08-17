<template>
  <div class="mt-5 overflow-y-scroll border-gray-300 border-b-2 border-solid">
    <div v-for="(item, index) in store.state.leaderBoard" :key="item.country">
      <span> {{ index + 1 }} | {{ item.country }} </span>
      <span class="float-right">
        {{ Intl.NumberFormat().format(item.score) }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import { useStore } from "vuex";
import { key } from "../store/store";

export default class LeaderBoard extends Vue {
  store = useStore(key);
}
</script>
