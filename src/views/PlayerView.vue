<template>
  <div v-if="player" class="grid grid-cols-2 gap-4">
    <PlayerOverview :player=player />
    <PlayerStatsGrid :player=player />
    <div class="panel col-span-2">
      <h4 class="title">Upcoming Fixtures</h4>
    </div>
  </div>
</template>

<script>
import * as api from '../api'
import PlayerOverview from '../components/PlayerOverview.vue'
import PlayerStatsGrid from '../components/PlayerStatsGrid.vue'

export default {
  name: 'PlayerView',
  components: {
    PlayerOverview,
    PlayerStatsGrid
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