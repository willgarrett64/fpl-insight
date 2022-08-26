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
      players: null,
      teams: null
    }
  },
  methods: {
    async getTeams() {
      this.teams = await api.teams.getTeams()
    },
    async updatePlayers() {
      this.players = await api.players.getPlayers()
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