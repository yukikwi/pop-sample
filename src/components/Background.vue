<template>
  <div
    class="absolute z-0 w-screen h-screen bg-cover bg-center overflow-hidden"
    :style="{'background-image': (click === false)? 'url(\' '+ require('../assets/img/notclick.jpeg') +' \')' : 'url(\''+ require('../assets/img/click.png') +' \')'}"
  />
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { useStore } from 'vuex'
import { key } from '../store/store'

export default class Counter extends Vue {
  store = useStore(key)

  get click () {
    return this.store.state.click
  }
}
</script>