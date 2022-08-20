<template>
  <div class="panel">
    <h4 class="title">Stats</h4>
    <div class="stats_grid">
      <div v-for="(sectionStats, section) in stats" :key="section" class="stats_grid-column">
        <span class="underline" :class="section === 'ict' ? 'uppercase' : 'capitalize'">{{ section }}</span>
        <div v-for="stat in sectionStats" :key="stat.key" :class="this.hideStat(stat) ? 'hidden' : 'stat_wrapper'">
          <span class="stat_label short">{{ stat.shortLabel }}</span>
          <span class="stat_label full">{{ stat.label }}</span>
          <span class="stat_value">{{ player[stat.key] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerStatsGrid',
  props: ['player'],
  data() {
    return {
      stats: {
        general: [
          { label: 'Total Points', shortLabel: 'Pts', key: 'total_points'},
          // { label: 'Teams Selected By', shortLabel: 'TSB', key: 'selected_by_percent', unit: '%'},
          { label: 'Minutes Played', shortLabel: 'MP', key: 'minutes'},
          { label: 'Goals Scored', shortLabel: 'GS', key: 'goals_scored'},
          { label: 'Assists', shortLabel: 'A', key: 'assists'},
          { label: 'Clean Sheets', shortLabel: 'CS', key: 'clean_sheets', exclPos: [4]},
          { label: 'Goals Conceded', shortLabel: 'GC', key: 'goals_conceded', exclPos: [4]},
          { label: 'Own Goals', shortLabel: 'OG', key: 'own_goals'},
          { label: 'Yellow Cards', shortLabel: 'YC', key: 'yellow_cards'},
          { label: 'Red Cards', shortLabel: 'RC', key: 'red_cards'},
          { label: 'Penalties Missed', shortLabel: 'PM', key: 'penalties_missed'},
          { label: 'Penalties Saved', shortLabel: 'PS', key: 'penalties_saved', exclPos: [2, 3, 4]},
          { label: 'Saves', shortLabel: 'S', key: 'saves', exclPos: [2, 3, 4]},
          { label: 'Bonus', shortLabel: 'B', key: 'bonus'},
          { label: 'Bonus Points System', shortLabel: 'BPS', key: 'bps'},
        ],
        // Average stats
        average: [
          { label: 'Points per Million', shortLabel: 'PpM', key: 'points_per_million'},
          { label: 'Points per Gameweek', shortLabel: 'PpGW', key: 'points_per_game'},
          { label: 'Points per Game Played', shortLabel: 'PpGP', key: 'points_per_mins_played'},
          { label: 'Points per Minute Played', shortLabel: 'PpMP', key: 'points_per_mins_played'},
          { label: 'Average Home Points', shortLabel: 'AHP', key: 'avg_points_home'},
          { label: 'Average Away Points ', shortLabel: 'AAP', key: 'avg_points_away'},
          // There seems to never be any FDR 1 matches
          // { label: 'Average Points FDR 1 ', shortLabel: 'AF1', key: 'avg_points_fdr_1'},
          { label: 'Average Points FDR 2 ', shortLabel: 'AF2', key: 'avg_points_fdr_2'},
          { label: 'Average Points FDR 3 ', shortLabel: 'AF3', key: 'avg_points_fdr_3'},
          { label: 'Average Points FDR 4 ', shortLabel: 'AF4', key: 'avg_points_fdr_4'},
          { label: 'Average Points FDR 5 ', shortLabel: 'AF5', key: 'avg_points_fdr_5'},
        ],
        // ICT
        ict: [
          { label: 'Influence', shortLabel: 'I', key: 'influence'},
          { label: 'Creativity', shortLabel: 'C', key: 'creativity'},
          { label: 'Threat', shortLabel: 'T', key: 'threat'},
          { label: 'ICT Index', shortLabel: 'ICT', key: 'ict_index'},
          { label: 'Influence Rank (Position)', shortLabel: 'IRP', key: 'influence_rank_type'},
          { label: 'Influence Rank (Total)', shortLabel: 'IR', key: 'influence_rank'},
          { label: 'Creativity Rank (Position)', shortLabel: 'CRP', key: 'creativity_rank_type'},
          { label: 'Creativity Rank (Total)', shortLabel: 'CR', key: 'creativity_rank'},
          { label: 'Threat Rank (Position)', shortLabel: 'TRP', key: 'threat_rank_type'},
          { label: 'Threat Rank (Total)', shortLabel: 'TR', key: 'threat_rank'},
          { label: 'ICT Rank (Position)', shortLabel: 'ICTRP', key: 'ict_index_rank_type'},
          { label: 'ICT Rank (Total)', shortLabel: 'ICTR', key: 'ict_index_rank'},
        ]
      }
    }
  },
  methods: {
    hideStat(stat) {
      return stat.exclPos && stat.exclPos.includes(this.player.element_type)
    }
  }
}
</script>

<style scoped>
.stats_grid {
  @apply text-sm grid grid-cols-3 gap-x-4;
}
.stats_grid-column {
  @apply flex flex-col border-r-2 pr-4;
  border-color: var(--insight-grey)
}
.stat_wrapper {
  @apply flex justify-between;
}
.stat_label {
  @apply mr-2
}
.stat_label.short {
  @apply sm:hidden;
}
.stat_label.full {
  @apply hidden sm:block;
}
.stat_value {

}
</style>