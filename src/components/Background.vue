<template>
  <div
    class="absolute z-0 w-screen h-screen bg-cover bg-center overflow-hidden"
    :style="{
      'backgroundImage':'url(\' ' + bg + ' \')'
    }"
  />
</template>

<script lang="ts">
import { Watch, Vue } from "vue-property-decorator";
import { useStore } from "vuex";
import { key } from "../store/store";

export default class Counter extends Vue {
  store = useStore(key);
  // Default wallpaper
  bg = require('../assets/img/notclick.jpeg');

  @Watch("click")
  updateBG () {
    if(this.store.state.bot === false){
      this.bg = (this.click === false) ? require('../assets/img/notclick.jpeg') : require('../assets/img/click.jpeg')
    }
  }

  @Watch("store.state.bot")
  botBG () {
    this.setBgred()
  }

  mounted () {
    this.setBgred()
  }

  setBgred () {
    console.log(this.store.state.bot)
    if(this.store.state.bot === true){
      this.bg = require('../assets/img/bot.png')
    }
  }

  get click():boolean {
    return this.store.state.click;
  }
}
</script>
