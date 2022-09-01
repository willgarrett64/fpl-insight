<template>
  <div class="players-view_wrapper" v-if="players && positions && teams">
    <div class="panel overflow-x-hidden">
      <PlayersStatsTable :players=filteredPlayers :teams=teams />
    </div>
    <div>
      <PlayersStatsFilters :players=players :positions=positions :teams=teams @update-filters=onUpdateFilters />
    </div>
  </div>
</template>

<script>
import * as filter from '../utils/filter'
import PlayersStatsFilters from '../components/PlayersStatsFilters.vue'
import PlayersStatsTable from '../components/PlayersStatsTable.vue'
import { mapState } from 'vuex'

export default {
  name: 'PlayersView',
  components: {
    PlayersStatsFilters,
    PlayersStatsTable
  },
  data() {
    return {
      filters: {
        limit: 1000,
        maxPrice: null,
        maxTsb: null,
        minPrice: null,
        minTsb: null,
        page: 1,
        pos: null,
        teams: null
      }
    }
  },
  computed: {
    ...mapState(['players', 'positions', 'teams']),
    filteredPlayers() {
      return filter.players(this.players, this.filters)
    }
  },
  methods: {
    onUpdateFilters(newFilter) {
      this.filters = {
        ...this.filters,
        ...newFilter
      }
    }
  }
}
</script>

<style scoped>
.players-view_wrapper {
  @apply grid gap-4;
}

@screen sm {
  .players-view_wrapper {
    grid-template-columns: 1fr auto;
  }
}
</style>