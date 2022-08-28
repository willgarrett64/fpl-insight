<template>
  <nav class="navbar-top">
    <div class="logo"><img src="../assets/images/logo/insight-logo-orange-text_white-bg_none.png" /></div>
    <div class="navbar__buttons">
      <button class="placeholder1">Sign Up</button>
      <button class="placeholder2">Log In</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarTop'
}
</script>

<style scoped>
.navbar-top {
  @apply sticky w-full top-0 h-20 flex justify-between items-center px-8;
  background-color: var(--insight-grey);
}

.logo {
  @apply w-20;
}

.navbar__buttons {
  @apply flex space-x-4;
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