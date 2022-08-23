<template>
  <div v-if="player" class="grid grid-cols-2 gap-4">
    <PlayerOverview :player=player />
    <PlayerStatsGrid :player=player />
    <PlayerFixtures :fixtures=player.fixtures.fixtures />
    <PlayerResults :player=player />
  </div>
</template>

<script>
import * as api from '../api'
import PlayerFixtures from '../components/PlayerFixtures.vue'
import PlayerOverview from '../components/PlayerOverview.vue'
import PlayerResults from '../components/PlayerResults.vue'
import PlayerStatsGrid from '../components/PlayerStatsGrid.vue'

export default {
  name: 'PlayerView',
  components: {
    PlayerFixtures,
    PlayerOverview,
    PlayerResults,
    PlayerStatsGrid,
  },
  data() {
    return {
      player: null,
    }
  },
  computed: {
    playerId() {
      return this.$route.params.id
    }
  },
  methods: {
    async updatePlayer() {
      this.player = await api.players.getPlayer(this.playerId)
    }
  },
  mounted() {
    this.updatePlayer()
  }
}
</script>

<style scoped>
</style>