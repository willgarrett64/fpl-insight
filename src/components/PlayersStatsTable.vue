<template>
  <div class="table_wrapper">
    <table>
      <thead>
        <tr>
          <th
          v-for="col in columns"
          :key="col.shortLabel"
          >
            <span>{{ col.shortLabel }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <PlayersStatsTableRow
          v-for="player in players"
          :key="player.id"
          :player=player
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import PlayersStatsTableRow from './PlayersStatsTableRow.vue'

export default {
  name: 'PlayersStatsTable',
  components: {
    PlayersStatsTableRow
  },
  props: ['players'],
  data() {
    return {
      columns: [
        { label: 'Name', shortLabel: 'Name', key: 'web_name'},
        { label: 'Team', shortLabel: 'Team', key: 'team'},
        { label: 'Position', shortLabel: 'Pos', key: 'position'},
        { label: 'Price', shortLabel: '£', key: 'now_cost'},
        { label: 'Total Points', shortLabel: 'Pts', key: 'total_points'},
        { label: 'Minutes Played', shortLabel: 'MP', key: 'minutes'},
        { label: 'Goals Scored', shortLabel: 'GS', key: 'goals_scored'},
        { label: 'Assists', shortLabel: 'A', key: 'assists'},
        { label: 'Clean Sheets', shortLabel: 'CS', key: 'clean_sheets', exclPos: [4]},
        { label: 'Saves', shortLabel: 'S', key: 'saves', exclPos: [2, 3, 4]},
        { label: 'Penalties Saved', shortLabel: 'PS', key: 'penalties_saved', exclPos: [2, 3, 4]},
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
        { label: 'Points per Million', shortLabel: 'PpM', key: 'points_per_million'},
      ]
    }
  }
}
</script>

<style scoped>
.table_wrapper {
  @apply relative w-full overflow-auto rounded mb-4;
  height: 460px;
}

table {
  @apply rounded;
}

th {
  @apply sticky top-0 text-left mr-4 py-2;
  background-color: var(--insight-grey-light);
  z-index: 2;
}
th span {
  @apply pr-10
}
th:first-child {
  @apply sticky left-0;
  z-index: 3;
}
</style>