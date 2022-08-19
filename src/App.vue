<template>
  <NavbarTop />
  <main class="px-10 mt-10">

  </main>
</template>

<script>
import NavbarTop from './components/NavbarTop.vue'

export default {
  name: 'App',
  components: {
    NavbarTop
  }
}
</script>

<style>
html {
  background-color: var(--insight-grey-light);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
