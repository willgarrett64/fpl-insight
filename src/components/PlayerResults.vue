<template>
  <div class="panel col-span-2">
    <h4 class="title">Results</h4>
    <div class="flex flex-col">
      <PlayerResultsTable :results="player.fixtures.history" />
      <PlayerResultsChart :results="player.fixtures.history" />
    </div>
  </div>
</template>

<script>
import PlayerResultsChart from './PlayerResultsChart.vue'
import PlayerResultsTable from './PlayerResultsTable.vue'

export default {
  name: 'PlayerResults',
  components: { PlayerResultsChart, PlayerResultsTable },
  props: ['player']
}
</script>

<style scoped>

</style>