<template>
  <NavbarTop />
  <Navbar />
  <main class="w-full px-10 my-10 flex justify-center">
    <div class="w-full max-w-6xl">
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
  },
  data() {
    return {
      apiInterval: null
    }
  },
  mounted() {
    this.$store.dispatch('getPositions')
    this.$store.dispatch('updateMaxPlayerStats')
    this.$store.dispatch('updatePlayers')
    this.$store.dispatch('updateTeams')

    /**
     * @todo change interval depending on if in gameweek or not
    */
    this.apiInterval = setInterval(() => {
      this.$store.dispatch('updateMaxPlayerStats')
      this.$store.dispatch('updatePlayers')
      this.$store.dispatch('updateTeams')
    }, 60 * 1000)
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
