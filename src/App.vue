<template>
  <div class="relative w-screen h-screen" ref="area">
    <div class="absolute z-10 noselect w-screen">
      <Logo />
    </div>
    <Background />
  </div>
  <Footer />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Background from "./components/Background.vue";
import Logo from "./components/Logo.vue";
import Footer from "./components/Footer.vue";
import { useStore } from "vuex";
import { key } from "./store/store";

@Options({
  components: {
    Background,
    Logo,
    Footer,
  },
})
export default class App extends Vue {
  store = useStore(key);

  $refs!: {
    area: HTMLElement;
  };

  mounted() {
    this.$refs.area.addEventListener(
      "touchstart",
      () => {
        this.clickwrapper();
      },
      false
    );

    this.$refs.area.addEventListener(
      "mousedown",
      () => {
        this.clickwrapper();
      },
      false
    );

    document.addEventListener(
      "keydown",
      () => {
        this.clickwrapper();
      },
      false
    );


    this.$refs.area.addEventListener(
      "touchend",
      () => {
        this.unclickwrapper();
      },
      false
    );

    this.$refs.area.addEventListener(
      "mouseup",
      () => {
        this.unclickwrapper();
      },
      false
    );

    document.addEventListener(
      "keyup",
      () => {
        this.unclickwrapper();
      },
      false
    );

    this.updateSocket();
    setInterval(() => {
      this.updateSocket();
    }, 3000);
  }

  clickwrapper() {
    this.store.commit("increment");
    this.store.commit("click", true);
  }

  unclickwrapper() {
    this.store.commit("click", false);
  }

  updateSocket() {
    this.store.commit("update_socket", this.$socket);
  }
}
</script>

<style scoped>
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                      supported by Chrome, Edge, Opera and Firefox */
}
</style>
