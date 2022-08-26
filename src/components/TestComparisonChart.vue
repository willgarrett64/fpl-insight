<template>
  <div class="panel col-span-2 flex justify-center">
    <div class="flex flex-col max-w-lg">
      <Radar
        v-if="player && player2"
        :chart-options="chartOptions"
        :chart-data="chartData"
        :height="chartHeight"
      />
    </div>
  </div>
</template>

<script>
import { Radar } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  LineElement,
  // Plugin
 } from 'chart.js'
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  LineElement
)

export default {
  name: 'TestComparisonChart',
  components: { Radar },
  props: ['player', 'player2'],
  data() {
    return {
      chartHeight: 100
    }
  },
  computed: {
    chartData() {
      const player1 = this.player
      const player2 = this.player2
      if (this.player && this.player2) return {
        labels: ['Total Points', 'Goals Scored', 'Assists', 'Clean Sheets', 'Bonus', 'Bonus Points System'],
        datasets: [
          {
            data: [
              player1.total_points / 35,
              player1.goals_scored / 4,
              player1.assists / 3,
              player1.clean_sheets / 2,
              player1.bonus / 5,
              player1.bps / 99
            ],
            label: player1.web_name,
            backgroundColor: 'rgba(250, 176, 5, 0.2)',
            borderColor: 'rgb(250, 176, 5)',
            pointBackgroundColor: 'rgb(250, 176, 5)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(250, 176, 5)',
            fill: true
          },
          {
            data: [
              player2.total_points / 35,
              player2.goals_scored / 4,
              player2.assists / 3,
              player2.clean_sheets / 2,
              player2.bonus / 5,
              player2.bps / 99
            ],
            label: player2.web_name,
            backgroundColor: 'rgba(5, 185, 250, 0.2)',
            borderColor: 'rgb(5, 185, 250)',
            pointBackgroundColor: 'rgb(5, 185, 250)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(5, 185, 250)',
            fill: true
          }
        ]
      }
      return null
    },
    chartOptions() {
      return {
        responsive: true
      }
    }
  }
}
</script>

<style scoped>
  .test {
    color: rgb(5, 185, 250)
  }
</style>