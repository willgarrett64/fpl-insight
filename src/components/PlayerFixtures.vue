<template>
  <div v-if="teams" class="panel col-span-2">
    <h4 class="title">Upcoming Fixtures</h4>
    <div class="fixtures">
      <div v-for="gw in gameweeks" :key="gw.event" class="gameweek">
        <div class="gameweek_header">GW{{ gw.event }}</div>
        <div v-for="fixture in gw.fixtures" :key="fixture.id" class="fixture" :class="`fdr${fixture.difficulty}`">
          {{ fixture.is_home ? getTeamName(fixture.team_a) : getTeamName(fixture.team_h) }}
          ({{ fixture.is_home ? 'H' : 'A' }})
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '../api'

export default {
  name: 'PlayerFixtures',
  props: ['fixtures'],
  data() {
    return {
      teams: null
    }
  },
  computed: {
    gameweeks() {
      return this.fixtures && this.fixtures.reduce((p, c) => {
        const gwIndex = p.findIndex(gw => gw.event === c.event)
        if (gwIndex > -1) p[gwIndex].fixtures.push(c)
        else p.push({ event: c.event, fixtures: [c] })
        return p
      }, [])
    }
  },
  methods: {
    getTeamName(teamId) {
      return this.teams.find(team => team.id === teamId).short_name
    },
    async getTeams() {
      this.teams = await api.teams.getTeams()
    }
  },
  mounted() {
    this.getTeams()
  }
}
</script>

<style scoped>
.fixtures {
  @apply flex overflow-x-scroll py-4;
}
.gameweek {
  @apply flex-shrink-0;
}
.gameweek_header {
  @apply text-center mb-2 border-b border-gray-600
}
.fixture {
  @apply w-24 mr-2 p-3 rounded flex-shrink-0 text-center;
}
</style>