<template>
  <nav class="navbar-top">
    <div class="logo">Logo</div>
    <div class="navbar__buttons">
      <button>Sign Up</button>
      <button>Log In</button>
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
  @apply flex justify-betweens;
}
</style>