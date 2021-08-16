<template>
  <h1>POPBARA</h1>
  <h2>{{ score }}</h2>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from 'vue'

// Define the component in class-style
@Component
export default class Logo extends Vue {
  // Class properties will be component data
  count = 0

  // Methods will be component methods
  increment() {
    this.count++
  }

  decrement() {
    this.count--
  }
}
</script>
