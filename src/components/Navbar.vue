<template>
  <nav class="navbar">
    <router-link :to="{ name: 'Players' }" class="nav__button" :class="isSelected('player') ? 'selected' : ''">
      <span>Players</span>
    </router-link>
    <router-link :to="{ name: 'Teams' }" class="nav__button" :class="isSelected('team') ? 'selected' : ''">
      <span>Teams</span>
    </router-link>
    <router-link :to="{ name: 'HeadToHead' }" class="nav__button" :class="isSelected('head-to-head') ? 'selected' : ''">
      <span>Head to Head</span>
    </router-link>
    <router-link :to="{ name: 'MySquad' }" class="nav__button" :class="isSelected('my-squad') ? 'selected' : ''">
      <span>My Squad</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    selectedSection() {
      return this.$route.fullPath
    }
  },
  methods: {
    isSelected(link) {
      return this.selectedSection.startsWith(`/${link}`)
    }
  }
}
</script>

<style scoped>
.navbar {
  @apply sticky top-20 z-50 w-full flex items-center px-8;
  background-color: var(--insight-orange);
}

.nav__button {
  @apply py-3 px-6 text-white;
}
.nav__button.selected {
  @apply text-white;
  background-color: var(--insight-orange-dark)
}

button {
  @apply border-2 rounded-md px-4 py-2 text-white;
}
button.placeholder1 {
  background-color: var(--insight-orange);
  border-color: var(--insight-orange);
}
button.placeholder1:hover {
  background-color: var(--insight-orange-dark);
  border-color: var(--insight-orange-dark);
}

button.placeholder2 {
  border-color: var(--insight-orange);
}
button.placeholder2:hover {
  background-color: var(--insight-orange);
}
</style>