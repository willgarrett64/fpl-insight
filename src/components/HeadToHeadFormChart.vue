<template>
  <div class="panel flex flex-col justify-center col-span-2 md:col-span-1">
    <h4 class="title">Results</h4>
    <div class="flex flex-col space-y-2">
      <!-- stats selector -->
      <div class="w-full relative">
        <Listbox v-model=selectedStat>
          <ListboxButton class="list_button">
            <span class="text-left truncate w-52">{{ selectedStat.label }}</span>
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
      <!-- line chart -->
      <div class="flex justify-center w-full">
        <div class="w-full">
          <Line
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
import { Line } from 'vue-chartjs'
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
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
  // Plugin
 } from 'chart.js'
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)

const stats = [
  { key: 'total_points', label: 'Total Points', shortLabel: 'TP' },
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
  { key: 'selected', label: 'Selected by', shortLabel: 'TSB' },
  { key: 'influence', label: 'Influence', shortLabel: 'I' },
  { key: 'creativity', label: 'Creativity', shortLabel: 'C' },
  { key: 'threat', label: 'Threat', shortLabel: 'T' },
  { key: 'ict_index', label: 'ICT Index', shortLabel: 'ICT' },
  { key: 'transfers_in', label: 'Transfers In', shortLabel: 'TI' },
  { key: 'transfers_out', label: 'Transfers Out', shortLabel: 'TO' },
  // { key: 'transfers_balance', label: 'Net Transfers', shortLabel: 'TO' }

]

export default {
  name: 'HeadToHeadFormChart',
  components: {
    ChevronDownIcon,
    CheckIcon,
    Line,
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption
  },
  props: ['players'],
  data() {
    return {
      selectedStat: stats[0],
      stats: stats
    }
  },
  computed: {
    chartData() {
      const stat = this.selectedStat.key
      const datasets = []

      const player1 = this.players[0]
      if (player1) datasets.push({
        data: player1.fixtures.history.map(f => this.maxStats[stat] ? f[stat] / this.maxStats[stat] : 0),
        label: player1.web_name,
        fill: false,
        backgroundColor: 'rgba(250, 176, 5, 0.2)',
        borderColor: 'rgb(250, 176, 5)',
        pointBackgroundColor: 'rgb(250, 176, 5)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(250, 176, 5)',
      })

      const player2 = this.players[1]
      if (player2) datasets.push({
        data: player2.fixtures.history.map(f => this.maxStats[stat] ? f[stat] / this.maxStats[stat] : 0),
        label: player2.web_name,
        fill: false,
        backgroundColor: 'rgba(5, 185, 250, 0.2)',
        borderColor: 'rgb(5, 185, 250)',
        pointBackgroundColor: 'rgb(5, 185, 250)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(5, 185, 250)',
      })

      const labels = player1 ? player1.fixtures.history.map(f => `GW${f.round}`) : player2 ? player2.fixtures.history.map(f => `GW${f.round}`) : null
      return { labels, datasets }
    },
    chartOptions() {
      const maxStats = { ...this.maxStats }
      const key = this.selectedStat.key
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            max: 1
          }
        },
        plugins: {
          tooltip: {
            interaction: {
              mode: 'index',
              intersect: false,
              callbacks: {
                label: function(tooltipItem) {
                  const playerName = tooltipItem.dataset.label
                  const amount = tooltipItem.raw * maxStats[key]
                  return `${playerName}: ${amount}`
                }
              }
            }
          }
        }
      }
    },
    maxStats() {
      if (!this.players) return null
      const allFixtures = this.players.reduce((p, c) => {
        p.push(...c.fixtures.history)
        return p
      }, [])
      const maxStats = {}
      stats.forEach(stat => {
        maxStats[stat.key] = Math.max(...allFixtures.map(f => Number(f[stat.key])))
      })
      return maxStats
    }
  }
}
</script>

<style scoped>
.list_options.stats{
  @apply grid sm:grid-cols-2 top-10 max-h-80;
}
</style>