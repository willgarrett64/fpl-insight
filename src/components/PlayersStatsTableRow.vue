<template>
  <tr>
    <td><router-link :to=playerRoute>{{ player.web_name }}</router-link></td>
    <td>{{ teamName }}</td>
    <td class="uppercase">{{ player.position }}</td>
    <td>{{ player.now_cost }}</td>
    <td>{{ player.total_points }}</td>
    <td>{{ player.minutes }}</td>
    <td>{{ player.goals_scored }}</td>
    <td>{{ player.assists }}</td>
    <td>{{ player.clean_sheets }}</td>
    <td>{{ player.saves }}</td>
    <td>{{ player.penalties_saved }}</td>
    <td>{{ player.goals_conceded }}</td>
    <td>{{ player.own_goals }}</td>
    <td>{{ player.penalties_missed }}</td>
    <td>{{ player.yellow_cards }}</td>
    <td>{{ player.red_cards }}</td>
    <td>{{ player.bonus }}</td>
    <td>{{ player.bps }}</td>
    <td>{{ player.influence }}</td>
    <td>{{ player.creativity }}</td>
    <td>{{ player.threat }}</td>
    <td>{{ player.ict_index }}</td>
    <td>{{ player.points_per_million }}</td>
  </tr>
</template>

<script>

export default {
  name: 'PlayersStatsTableRow',
  props: ['player', 'teams'],
  computed: {
    playerRoute() {
      return this.player && { name: 'Player', params: {id: this.player.id} }
    },
    teamName() {
      return this.player && this.teams && this.teams.find(team => team.id === this.player.team).name
    }
  }
}
</script>

<style scoped>
td {
  @apply bg-white relative py-2 border-b truncate;
}
td a {
  @apply border-b border-black truncate;
}
td a:hover {
  color: var(--insight-orange);
  border-color: var(--insight-orange)
}

td:first-child {
  @apply sticky left-0;
  z-index: 1;
}
</style>