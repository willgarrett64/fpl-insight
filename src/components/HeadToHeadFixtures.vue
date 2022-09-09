<template>
  <div v-if="teams" class="panel col-span-2">
    <h4 class="title">Upcoming Fixtures</h4>
    <div class="table_wrapper" v-if=arePlayersSelected>
      <table>
        <thead>
          <tr>
            <th class="blank_th"></th>
            <th v-for="gw in gameweeks" :key=gw>GW{{ gw }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in players" :key="player.id">
            <th class="player_name">{{ player.web_name }}</th>
            <td v-for="gw in getFixturesByGw(player)" :key=gw>
              <div v-for="fixture in gw.fixtures" :key="fixture.id" class="fixture" :class="`fdr${fixture.difficulty}`">
                {{ fixture.is_home ? fixture.team_a_short_name : fixture.team_h_short_name }}
                ({{ fixture.is_home ? 'H' : 'A' }})
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'HeadToHeadFixtures',
  props: ['players'],
  computed: {
    ...mapGetters(['nextGameweek']),
    ...mapState(['teams']),
    arePlayersSelected() {
      return this.players.some(player => player !== null)
    },
    gameweeks() {
      const firstGw = this.nextGameweek
      const lastGw = 38
      let gameweeks = []
      for (let i = firstGw; i <= lastGw; i++) {
        gameweeks.push(i)
      }
      return gameweeks
    }
  },
  methods: {
    getFixturesByGw(player) {
      return player.fixtures.fixtures.reduce((p, c) => {
        const gwIndex = p.findIndex(gw => gw.event === c.event)
        if (gwIndex > -1) p[gwIndex].fixtures.push(c)
        else p.push({ event: c.event, fixtures: [c] })
        return p
      }, [])
    }
  }
}
</script>

<style scoped>
.table_wrapper {
  @apply relative w-full overflow-auto rounded mb-4;
}
th {
  @apply sticky top-0 mr-4 py-2;
  z-index: 2;
}
td {
  @apply bg-white relative py-2 truncate;
}
.player_name {
  @apply sticky left-0 font-bold bg-white px-2;
  z-index: 1;
}
.blank_th {
  @apply sticky left-0 font-bold bg-white px-2;
  z-index: 3;
}

.fixtures {
  @apply flex overflow-x-scroll py-2;
}
.gameweek {
  @apply flex-shrink-0;
}
.gameweek_header {
  @apply text-center mb-2 border-b border-gray-600
}
.fixture {
  @apply w-24 mr-1 p-3 rounded flex-shrink-0 text-center;
}
</style>
