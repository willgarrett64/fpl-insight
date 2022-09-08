<template>
  <div class="panel flex flex-col justify-center col-span-2 md:col-span-1">
    <h4>Radar Chart</h4>
    <div class="flex flex-col space-y-2">
      <!-- stats selector -->
      <div class="w-full relative">
        <Listbox v-model=selectedStats multiple>
          <ListboxButton class="list_button">
            <span class="text-left truncate w-52" :class="!selectedStats.length ? 'text-gray-400' : ''">Select Stats</span>
            <ChevronDownIcon class="w-4" />
          </ListboxButton>
          <ListboxOptions class="list_options stats">
            <ListboxOption
              v-for="stat in stats"
              v-slot="{ selected }"
              :key="stat.key"
              :value=stat
              class="list_option"
            >
              <span class="mr-2">{{ stat.label }}</span>
              <div class="border border-gray-500 rounded w-5 h-5 flex items-center justify-center">
                <CheckIcon class="w-4 text-green-500" v-show=selected />
              </div>
            </ListboxOption>
          </ListboxOptions>
        </Listbox>
      </div>
      <!-- radar chart -->
      <div class="flex justify-center w-full">
        <div class="w-full max-w-lg">
          <Radar
            v-if="players"
            :chart-options="chartOptions"
            :chart-data="chartData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Radar } from 'vue-chartjs'
import { mapState } from 'vuex'
import {
  ChevronDownIcon,
  CheckIcon
} from '@heroicons/vue/24/outline'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  // Switch
} from '@headlessui/vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  LineElement,
  Filler
  // Plugin
 } from 'chart.js'
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  LineElement,
  Filler
)

const stats = [
  { key: 'now_cost', label: 'Price', shortLabel: '£' },
  { key: 'total_points', label: 'Total Points', shortLabel: 'TP' },
  { key: 'form', label: 'Form', shortLabel: 'F' },
  { key: 'goals_scored', label: 'Goals Scored', shortLabel: 'GS' },
  { key: 'assists', label: 'Assists', shortLabel: 'A' },
  { key: 'clean_sheets', label: 'Clean Sheets', shortLabel: 'CS' },
  { key: 'goals_conceded', label: 'Goals Conceeded', shortLabel: 'GC' },
  { key: 'own_goals', label: 'Own Goals', shortLabel: 'OG' },
  { key: 'penalties_saved', label: 'Penalties Saved', shortLabel: 'PS' },
  { key: 'penalties_missed', label: 'Penalties Missed', shortLabel: 'PM' },
  { key: 'yellow_cards', label: 'Yellow Cards', shortLabel: 'YC' },
  { key: 'red_cards', label: 'Red Cards', shortLabel: 'RC' },
  { key: 'saves', label: 'Saves', shortLabel: 'S' },
  { key: 'bonus', label: 'Bonus', shortLabel: 'B' },
  { key: 'bps', label: 'Bonus Points System', shortLabel: 'BPS' },
  { key: 'minutes', label: 'Minutes Played', shortLabel: 'MP' },
  { key: 'selected_by_percent', label: 'Selected by Percent', shortLabel: 'TSB' },
  { key: 'influence', label: 'Influence', shortLabel: 'I' },
  { key: 'creativity', label: 'Creativity', shortLabel: 'C' },
  { key: 'threat', label: 'Threat', shortLabel: 'T' },
  { key: 'ict_index', label: 'ICT Index', shortLabel: 'ICT' },
  { key: 'points_per_million', label: 'Points per Million', shortLabel: 'PpM' },
  { key: 'points_per_game', label: 'Points per Game', shortLabel: 'PpG' },
  { key: 'points_per_mins_played', label: 'Points per (100) Minutes Played', shortLabel: 'PpMP' },
  { key: 'avg_points_home', label: 'Average Points Home', shortLabel: 'AvgH' },
  { key: 'avg_points_away', label: 'Average Points Away', shortLabel: 'AvgA' },
  { key: 'avg_points_fdr_2', label: 'Average Points FDR2', shortLabel: 'AvgF2' },
  { key: 'avg_points_fdr_3', label: 'Average Points FDR3', shortLabel: 'AvgF3' },
  { key: 'avg_points_fdr_4', label: 'Average Points FDR4', shortLabel: 'AvgF4' },
  { key: 'avg_points_fdr_5', label: 'Average Points FDR5', shortLabel: 'AvgF5' },
  { key: 'dreamteam_count', label: 'Times in Dreamteam', shortLabel: 'DT' },
  { key: 'event_points', label: 'Last Gameweek Points', shortLabel: 'LGwP' },
  { key: 'transfers_in_event', label: 'Transfers In (current gameweek)', shortLabel: 'TI' },
  { key: 'transfers_out_event', label: 'Transfers Out (current gameweek)', shortLabel: 'TO' }
]

export default {
  name: 'HeadToHeadRadarChart',
  components: {
    ChevronDownIcon,
    CheckIcon,
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    Radar
  },
  props: ['players'],
  data() {
    return {
      selectedStats: [stats[0], stats[1], stats[2], stats[3], stats[4], stats[5], stats[13], stats[21]],
      stats: stats
    }
  },
  computed: {
    ...mapState(['maxPlayerStats']),
    chartData() {
      const player1 = this.players[0]
      const player1Data = this.selectedStats.map(stat => player1[stat.key] / this.maxPlayerStats[stat.key])
      const player2 = this.players[1]
      const player2Data = this.selectedStats.map(stat => player2[stat.key] / this.maxPlayerStats[stat.key])
      const labels = this.selectedStats.map(stat => stat.label)
      if (this.players) return {
        labels,
        datasets: [
          {
            data: player1Data,
            label: player1.web_name,
            fill: true,
            backgroundColor: 'rgba(250, 176, 5, 0.2)',
            borderColor: 'rgb(250, 176, 5)',
            pointBackgroundColor: 'rgb(250, 176, 5)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(250, 176, 5)',
          },
          {
            data: player2Data,
            label: player2.web_name,
            fill: true,
            backgroundColor: 'rgba(5, 185, 250, 0.2)',
            borderColor: 'rgb(5, 185, 250)',
            pointBackgroundColor: 'rgb(5, 185, 250)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(5, 185, 250)',
          }
        ]
      }
      return null
    },
    chartOptions() {
      const maxStats = { ...this.maxPlayerStats }
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0
          }
        },
        plugins: {
          tooltip: {
            interaction: {
              mode: 'index',
              callbacks: {
                label: function(tooltipItem) {
                  const playerName = tooltipItem.dataset.label
                  const key = stats.find(stat => stat.label === tooltipItem.label).key
                  const amount = tooltipItem.raw * maxStats[key]
                  return `${playerName}: ${amount}`
                }
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.list_options.stats{
  @apply grid sm:grid-cols-2 top-10 max-h-80;
}
</style>