<template>
  <div class="grid grid-cols-2 gap-4" v-if="players && maxPlayerStats">
    <!-- player selector -->
    <!-- tabs (for now, these will be inline) -->
    <HeadToHeadRadarChart :players="playersStats" />
    <HeadToHeadFormChart :players="playersStats" />
    <HeadToHeadFixtures :players="playersStats" />
  </div>
</template>

<script>
import HeadToHeadFixtures from '../components/HeadToHeadFixtures.vue'
import HeadToHeadFormChart from '../components/HeadToHeadFormChart.vue'
// import HeadToHeadPlayerSelector from '../components/HeadToHeadPlayerSelector.vue'
import HeadToHeadRadarChart from '../components/HeadToHeadRadarChart.vue'
import { mapState } from 'vuex'

export default {
  name: 'HeadToHeadView',
  components: {
    HeadToHeadFixtures,
    HeadToHeadFormChart,
    // HeadToHeadPlayerSelector,
    HeadToHeadRadarChart
  },
  data() {
    return {
      playerIds: [427, 318]
    }
  },
  computed: {
    ...mapState(['maxPlayerStats', 'players']),
    playersStats() {
      return this.players && this.playerIds.map(id => this.players.find(player => player.id === id))
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>