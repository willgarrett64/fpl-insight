<template>
  <div class="flex flex-col">
    <Line
      v-if="results"
      :chart-options="chartOptions"
      :chart-data="chartData"
      :height="chartHeight"
    />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  // Plugin
 } from 'chart.js'
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale)

export default {
  name: 'PlayerResultsChart',
  components: { Line },
  props: ['results'],
  data() {
    return {
      chartHeight: 100
    }
  },
  computed: {
    chartData() {
      if (this.results) return {
        labels: this.results.map(fixture => `GW${fixture.round}`),
        datasets: [
          {
            data: this.results.map(fixture => fixture.total_points),
            label: 'Points',
            backgroundColor: 'blue',
            borderColor: 'blue',
            yAxisID: 'y1'
          },
          {
            data: this.results.map(fixture => fixture.goals_scored),
            label: 'Goals Scored',
            backgroundColor: '#fab005',
            borderColor: '#fab005',
            yAxisID: 'y'
          },
          {
            data: this.results.map(fixture => fixture.assists),
            label: 'Assists',
            backgroundColor: 'red',
            borderColor: 'red',
            yAxisID: 'y'
          },
          {
            data: this.results.map(fixture => fixture.bonus),
            label: 'Bonus',
            backgroundColor: 'green',
            borderColor: 'green',
            yAxisID: 'y'
          }
        ]
      }
      return null
    },
    chartOptions() {
      return {
        responsive: true,
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            min: 0,
            ticks: {
              stepSize: 1
            },
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            min: 0,
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>