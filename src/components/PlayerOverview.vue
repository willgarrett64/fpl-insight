<template>
   <div class="panel">
    <div class="flex flex-col">
      <h4 class="title">Player Overview</h4>
      <span>{{ player.web_name }}</span>
      <span>{{ player.team_name }}</span>
      <div><span>Price: </span><span>£{{ player.now_cost }}</span></div>
      <div><span>Points: </span><span>{{ player.total_points }}</span></div>
      <div><span>TSB: </span><span>{{ player.selected_by_percent }}%</span></div>
      <div><span>Form: </span><span>{{ player.form }}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerOverview',
  props: ['player'],
}
</script>

<style scoped>

</style>