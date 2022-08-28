<template>
  <NavbarTop />
  <Navbar />
  <main class="w-full px-10 my-10 flex justify-center">
    <div class="w-full max-w-4xl">
      <router-view />
    </div>
  </main>
</template>

<script>
import Navbar from './components/Navbar.vue'
import NavbarTop from './components/NavbarTop.vue'

export default {
  name: 'App',
  components: {
    Navbar,
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
