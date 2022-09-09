<template>
  <div class="panel w-64 flex flex-col space-y-4">
    <!-- gameweek period -->
    <div class="relative">
      <Listbox v-model=gamesPeriod>
        <ListboxLabel>Games Period:</ListboxLabel>
        <ListboxButton class="list_button">
          <span class="text-left truncate w-52">{{ gamesPeriod.label }}</span>
          <ChevronDownIcon class="w-4" />
        </ListboxButton>
        <ListboxOptions class="list_options">
          <ListboxOption
            v-for="period in gamesPeriods"
            v-slot="{ selected }"
            :key="period.id"
            :value=period
            class="list_option"
          >
            <span class="mr-2">{{ period.label }}</span>
            <div class="border border-gray-500 rounded w-5 h-5 flex items-center justify-center">
              <CheckIcon class="w-4 text-green-500" v-show=selected />
            </div>
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>

    <!-- name filter -->
    <div class="relative">
      <label for="">Player Name:</label>
      <div class="combo_input">
        <input class="w-44" v-model=playerNameInput placeholder="Search for a player..." />
        <div>
          <MagnifyingGlassIcon class="w-4" />
        </div>
      </div>
    </div>

    <!-- teams filter -->
    <div class="relative">
      <Listbox v-model=selectedTeams multiple>
        <ListboxLabel>Teams:</ListboxLabel>
        <ListboxButton class="list_button">
          <span class="text-left truncate w-52" :class="!selectedTeams.length ? 'text-gray-400' : ''">{{ selectedTeamsDisplay }}</span>
          <ChevronDownIcon class="w-4" />
        </ListboxButton>
        <ListboxOptions class="list_options">
        <button @click=toggleAllTeams class="list_option w-full">
          <span>All</span>
          <div class="border border-gray-500 rounded w-5 h-5 flex items-center justify-center">
            <CheckIcon class="w-4 text-green-500" v-if="selectedTeams.length === teams.length" />
            <MinusIcon class="w-4 text-gray-500" v-else-if="selectedTeams.length" />
            </div>
        </button>
          <ListboxOption
            v-for="team in teams"
            v-slot="{ selected }"
            :key="team.id"
            :value=team
            class="list_option"
          >
            <span class="mr-2">{{ team.name }}</span>
            <div class="border border-gray-500 rounded w-5 h-5 flex items-center justify-center">
              <CheckIcon class="w-4 text-green-500" v-show=selected />
            </div>
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>

    <!-- positions filter -->
    <div class="relative">
      <Listbox v-model=selectedPositions multiple>
        <ListboxLabel>Positions:</ListboxLabel>
        <ListboxButton class="list_button">
          <span class="text-left truncate w-52" :class="!selectedPositions.length ? 'text-gray-400' : ''">{{ selectedPositionsDisplay }}</span>
          <ChevronDownIcon class="w-4" />
        </ListboxButton>
        <ListboxOptions class="list_options">
        <button @click=toggleAllPositions class="list_option w-full">
          <span>All</span>
          <div class="border border-gray-500 rounded w-5 h-5 flex items-center justify-center">
            <CheckIcon class="w-4 text-green-500" v-if="selectedPositions.length === positions.length" />
            <MinusIcon class="w-4 text-gray-500" v-else-if="selectedPositions.length" />
            </div>
        </button>
          <ListboxOption
            v-for="position in positions"
            v-slot="{ selected }"
            :key="position.id"
            :value=position
            class="list_option"
          >
            <span class="mr-2">{{ position.plural_name }}</span>
            <div class="border border-gray-500 rounded w-5 h-5 flex items-center justify-center">
              <CheckIcon class="w-4 text-green-500" v-show=selected />
            </div>
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>

    <!-- price filter -->
    <div>
      <label for="">Price</label>
      <div class="w-full flex space-x-2">
        <input v-model=minPrice type="number" placeholder="Min" class="number_input w-1/2"/>
        <input v-model=maxPrice type="number" placeholder="Max" class="number_input w-1/2"/>
      </div>
    </div>
    <!-- tsb filter -->
    <div>
      <label for="">Selected by %</label>
      <div class="w-full flex space-x-2">
        <input v-model=minTsb type="number" placeholder="Min" class="number_input w-1/2"/>
        <input v-model=maxTsb type="number" placeholder="Max" class="number_input w-1/2"/>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import {
  ChevronDownIcon,
  CheckIcon,
  MagnifyingGlassIcon,
  MinusIcon
} from '@heroicons/vue/24/outline'
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOptions,
  ListboxOption,
  // Switch
} from '@headlessui/vue'


export default {
  name: 'PlayersStatsFilters',
  components: {
    ChevronDownIcon,
    CheckIcon,
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOptions,
    ListboxOption,
    MagnifyingGlassIcon,
    MinusIcon,
    // Switch
  },
  data() {
    return {
      gamesPeriod: { id: 1, label  : 'All games' },
      gamesPeriods: [
        { id: 1, label  : 'All games' },
        { id: 2, label  : 'Last 3 games' },
        { id: 3, label  : 'Last 5 games' },
        { id: 4, label  : 'Last 10 games' }
      ],
      maxPrice: null,
      maxTsb: null,
      minPrice: null,
      minTsb: null,
      playerNameInput: '',
      selectedPositions: [],
      selectedTeams: []
    }
  },
  computed: {
    ...mapState(['players', 'positions', 'teams']),
    selectedPositionsDisplay() {
      if (this.selectedPositions.length === this.positions.length) return 'All positions'
      else if (!this.selectedPositions.length) return 'Please select position(s)'
      else return this.selectedPositions.map(team => team.singular_name_short).join(', ')
    },
    selectedTeamsDisplay() {
      if (this.selectedTeams.length === this.teams.length) return 'All teams'
      else if (!this.selectedTeams.length) return 'Please select team(s)'
      else return this.selectedTeams.map(team => team.short_name).join(', ')
    }
  },
  methods: {
    toggleAllTeams() {
      if (this.teams === this.selectedTeams) this.selectedTeams = []
      else this.selectedTeams = this.teams
    },
    toggleAllPositions() {
      if (this.positions === this.selectedPositions) this.selectedPositions = []
      else this.selectedPositions = this.positions
    },
    updateFilters(newFilter) {
      this.$emit('update-filters', newFilter)
    }
  },
  mounted() {
    this.selectedPositions = this.positions
    this.selectedTeams = this.teams
  },
  watch: {
    maxPrice() {
      this.updateFilters({ maxPrice: this.maxPrice })
    },
    maxTsb() {
      this.updateFilters({ maxTsb: this.maxTsb })
    },
    minPrice() {
      this.updateFilters({ minPrice: this.minPrice })
    },
    minTsb() {
      this.updateFilters({ minTsb: this.minTsb })
    },
    playerNameInput() {
      const updateName = () => {
        this.updateFilters({ name: this.playerNameInput })
      }
      _.debounce(updateName, 500)()
    },
    selectedPositions() {
      if (this.selectedPositions.length === 4 || !this.selectedPositions.length) this.updateFilters({ pos: null })
      else {
        const pos = this.selectedPositions.map(position => position.id)
        this.updateFilters({ pos })
      }
    },
    selectedTeams() {
      if (this.selectedTeams.length === 20 || !this.selectedTeams.length) this.updateFilters({ teams: null })
      else {
        const teams = this.selectedTeams.map(team => team.id)
        this.updateFilters({ teams })
      }
    }
  }
}
</script>

<style scoped>
/* list */
.list_button {
  @apply border border-gray-500 rounded w-full p-2 truncate flex justify-between items-center;
}
.list_options {
  @apply absolute top-16 mt-1 z-10 bg-white border border-gray-500 rounded w-full max-h-60 overflow-auto;
}
.list_option {
  @apply p-2 flex items-center justify-between items-center cursor-pointer hover:bg-gray-200;
}

/* min max inputs */
.number_input {
  @apply border border-gray-500 rounded p-2;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>