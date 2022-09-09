<template>
  <div class="grid grid-cols-2 gap-4" v-if="players && maxPlayerStats">
    <!-- player selector -->
    <HeadToHeadPlayerSelector @update-player="onUpdatePlayer" :index="0" />
    <HeadToHeadPlayerSelector @update-player="onUpdatePlayer" :index="1" />
    <!-- tabs (for now, these will be inline) -->
    <HeadToHeadRadarChart :players="selectedPlayers" v-if="selectedPlayers.length === 2" />
    <HeadToHeadFormChart :players="selectedPlayers" v-if="selectedPlayers.length === 2" />
    <HeadToHeadFixtures :players="selectedPlayers" v-if="selectedPlayers.length === 2" />
  </div>
</template>

<script>
import HeadToHeadFixtures from '../components/HeadToHeadFixtures.vue'
import HeadToHeadFormChart from '../components/HeadToHeadFormChart.vue'
import HeadToHeadPlayerSelector from '../components/HeadToHeadPlayerSelector.vue'
import HeadToHeadRadarChart from '../components/HeadToHeadRadarChart.vue'
import { mapState } from 'vuex'

export default {
  name: 'HeadToHeadView',
  components: {
    HeadToHeadFixtures,
    HeadToHeadFormChart,
    HeadToHeadPlayerSelector,
    HeadToHeadRadarChart
  },
  data() {
    return {
      selectedPlayers: []
    }
  },
  computed: {
    ...mapState(['maxPlayerStats', 'players'])
  },
  methods: {
    onUpdatePlayer(player, index) {
      this.selectedPlayers[index] = player
    }
  }
}
</script>

<style scoped>
</style>