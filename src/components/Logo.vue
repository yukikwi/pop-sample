<template>
  <div class="text-center">
    <h1 class="text-5xl">PopBara</h1>
    <transition :name="transition">
      <h2 :key="score">{{ score }}</h2>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Watch } from 'vue-property-decorator'
import { useStore } from 'vuex'
import { key } from '../store/store'

export default class Counter extends Vue {
  store = useStore(key)
  transition = 'pop1'

  get score () {
    return this.store.state.score
  }

  @Watch('score')
  watchScore(){
    if (this.transition === 'pop1'){
      this.transition = 'pop2'
    }
    else if (this.transition === 'pop2'){
      this.transition = 'pop1'
    }
  }
}
</script>

<style scoped>
.pop1-enter-active, .pop1-leave-active {
  animation: pop1 .3s;
}

.pop1-leave-active {
  display: none;
}

.pop2-enter-active, .pop2-leave-active {
  animation: pop2 .3s;
}

.pop2-leave-active {
  display: none;
}

@keyframes pop1{
  50%  {
    transform: scale(2) rotate(15deg);
  }
}

@keyframes pop2{
  50%  {
    transform: scale(2) rotate(-15deg);
  }
}
</style>