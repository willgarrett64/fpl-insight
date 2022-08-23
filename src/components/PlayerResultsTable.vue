<template>
  <div>
    <table>
      <thead>
        <th v-for="col in columns" :key="col.shortLabel">{{ col.shortLabel }}</th>
      </thead>
      <tbody>
        <PlayerResultsTableRow
          v-for="fixture in results"
          :key="fixture.key"
          :fixture=fixture
          :columns=columns
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import PlayerResultsTableRow from './PlayerResultsTableRow.vue'

export default {
  name: 'PlayerResultsTable',
  components: {
    PlayerResultsTableRow
  },
  props: ['results'],
  data() {
    return {
      columns: [
          { label: 'Gameweek', shortLabel: 'GW', key: 'round'},
          { label: 'Total Points', shortLabel: 'Pts', key: 'total_points'},
          { label: 'Minutes Played', shortLabel: 'MP', key: 'minutes'},
          { label: 'Saves', shortLabel: 'S', key: 'saves', exclPos: [2, 3, 4]},
          { label: 'Penalties Saved', shortLabel: 'PS', key: 'penalties_saved', exclPos: [2, 3, 4]},
          { label: 'Goals Scored', shortLabel: 'GS', key: 'goals_scored'},
          { label: 'Assists', shortLabel: 'A', key: 'assists'},
          { label: 'Clean Sheets', shortLabel: 'CS', key: 'clean_sheets', exclPos: [4]},
          { label: 'Goals Conceded', shortLabel: 'GC', key: 'goals_conceded', exclPos: [4]},
          { label: 'Own Goals', shortLabel: 'OG', key: 'own_goals'},
          { label: 'Penalties Missed', shortLabel: 'PM', key: 'penalties_missed'},
          { label: 'Yellow Cards', shortLabel: 'YC', key: 'yellow_cards'},
          { label: 'Red Cards', shortLabel: 'RC', key: 'red_cards'},
          { label: 'Bonus', shortLabel: 'B', key: 'bonus'},
          { label: 'Bonus Points System', shortLabel: 'BPS', key: 'bps'},
          { label: 'Influence', shortLabel: 'I', key: 'influence'},
          { label: 'Creativity', shortLabel: 'C', key: 'creativity'},
          { label: 'Threat', shortLabel: 'T', key: 'threat'},
          { label: 'ICT Index', shortLabel: 'ICT', key: 'ict_index'},
          { label: 'Transfers In', shortLabel: 'TI', key: 'transfers_in'},
          { label: 'Transfers Out', shortLabel: 'TO', key: 'transfers_out'},
          { label: 'Net Transfers', shortLabel: 'NT', key: 'transfers_balance'},
          { label: 'Price', shortLabel: '£', key: 'value'},
      ]
    }
  }
}
</script>

<style scoped>

</style>