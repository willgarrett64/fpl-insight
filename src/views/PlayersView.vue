<template>
  <div class="panel">
    <h4 class="title">Players</h4>
    <div>
      <PlayersStatsTable :players=players :teams=teams />
    </div>
  </div>
</template>

<script>
import * as api from '../api'
import PlayersStatsTable from '../components/PlayersStatsTable.vue'

export default {
  name: 'PlayersView',
  components: {
    PlayersStatsTable
  },
  data() {
    return {
      filters: {
        limit: 40,
        maxPrice: null,
        maxTsb: null,
        minPrice: null,
        minTsb: null,
        page: 1,
        positions: null,
        teams: null
      },
      players: null,
      teams: null
    }
  },
  methods: {
    async getTeams() {
      this.teams = await api.teams.getTeams()
    },
    async updatePlayers() {
      this.players = await api.players.getPlayers(this.filters)
    }
  },
  mounted() {
    this.getTeams()
    this.updatePlayers()
  }
}
</script>

<style scoped>

</style>