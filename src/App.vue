<template>
  <Logo />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Logo from "./components/Logo.vue";

@Options({
  components: {
    Logo,
  },
})
export default class App extends Vue {}
</script>
