<template>
  <div class="panel col-span-2">
    <h4 class="title">Results</h4>
      <TabGroup>
        <TabList class="tabList">
          <Tab v-slot="{ selected }" class="tab">
            <button class="tab_button" :class="selected ? 'selected' : ''">
              <div><TableCellsIcon class="w-5" /></div>
              <span>Table</span>
            </button>
          </Tab>
          <Tab v-slot="{ selected }" class="tab">
            <button class="tab_button" :class="selected ? 'selected' : ''">
              <div><PresentationChartLineIcon class="w-5" /></div>
              <span>Chart</span>
            </button>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PlayerResultsTable :results="player.fixtures.history" />
          </TabPanel>
          <TabPanel>
            <PlayerResultsChart :results="player.fixtures.history" />
          </TabPanel>
        </TabPanels>
      </TabGroup>
  </div>
</template>

<script>
import PlayerResultsChart from './PlayerResultsChart.vue'
import PlayerResultsTable from './PlayerResultsTable.vue'
import { PresentationChartLineIcon, TableCellsIcon } from '@heroicons/vue/24/outline'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

export default {
  name: 'PlayerResults',
  components: {
    PlayerResultsChart,
    PlayerResultsTable,
    PresentationChartLineIcon,
    TableCellsIcon,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel
  },
  props: ['player']
}
</script>

<style scoped>
.tabList {
  @apply w-full mb-4 flex justify-between;
  box-shadow: 0 8px 2px -8px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}
.tab {
  @apply w-full;
}
.tab_button {
  @apply w-full font-bold px-2 py-1 flex justify-center items-center space-x-2 border-b-2 border-white;
}
.tab_button:hover {
  border-color: var(--insight-grey-light);
}
.tab:focus, .tab_button:focus {
  outline: none;
}
.tab_button.selected {
  @apply border-b-2;
  color: var(--insight-orange);
  border-color: var(--insight-orange);
}
</style>