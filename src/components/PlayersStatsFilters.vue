<template>
  <div class="panel w-64 flex flex-col space-y-4">
    <!-- name filter -->
    <div class="relative">
      <label for="">Player Name:</label>
      <div class="combo_input">
        <input class="w-44" v-model=playerNameInput placeholder="Search for a player..." />
        <div>
          <MagnifyingGlassIcon class="w-4" />
        </div>
      </div>
      <!-- <Combobox v-model="playerNameInput">
        <ComboboxLabel>Player name:</ComboboxLabel>
        <ComboboxInput class="combo_input" @change="playerNameInput = $event.target.value" />
        <ComboboxOptions class="combo_options">
          <ComboboxOption
            v-for="player in filteredPlayers"
            :key="player.id"
            :value="player.web_name"
            class="combo_option"
          >
            {{ player.web_name }}
          </ComboboxOption>
        </ComboboxOptions>
      </Combobox> -->
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
import {
  ChevronDownIcon,
  CheckIcon,
  MagnifyingGlassIcon,
  MinusIcon
} from '@heroicons/vue/24/outline'
import {
  // Combobox,
  // ComboboxInput,
  // ComboboxLabel,
  // ComboboxOptions,
  // ComboboxOption,
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
    // Combobox,
    // ComboboxInput,
    // ComboboxLabel,
    // ComboboxOptions,
    // ComboboxOption,
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOptions,
    ListboxOption,
    MagnifyingGlassIcon,
    MinusIcon,
    // Switch
  },
  props: ['players', 'positions', 'teams'],
  data() {
    return {
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
    filteredPlayers() {
      return this.sortedPlayers.filter(player => player.web_name.toLowerCase().startsWith(this.playerNameInput.toLowerCase()))
    },
    selectedPositionsDisplay() {
      if (this.selectedPositions.length === this.positions.length) return 'All positions'
      else if (!this.selectedPositions.length) return 'Please select position(s)'
      else return this.selectedPositions.map(team => team.short_name).join(', ')
    },
    selectedTeamsDisplay() {
      if (this.selectedTeams.length === this.teams.length) return 'All teams'
      else if (!this.selectedTeams.length) return 'Please select team(s)'
      else return this.selectedTeams.map(team => team.short_name).join(', ')
    },
    sortedPlayers() {
      return [ ...this.players ].sort((a, b) => a.web_name.localeCompare(b.web_name))
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
    }
  },
  mounted() {
    this.selectedPositions = this.positions
    this.selectedTeams = this.teams
  },
  watch: {
    maxPrice() {
      this.$emit('update-filters', { maxPrice: this.maxPrice })
    },
    maxTsb() {
      this.$emit('update-filters', { maxTsb: this.maxTsb })
    },
    minPrice() {
      this.$emit('update-filters', { minPrice: this.minPrice })
    },
    minTsb() {
      this.$emit('update-filters', { minTsb: this.minTsb })
    },
    selectedPositions() {
      if (this.selectedPositions.length === 4 || !this.selectedPositions.length) this.$emit('update-filters', { pos: null })
      else {
        const pos = this.selectedPositions.map(position => position.id)
        this.$emit('update-filters', { pos })
      }
    },
    selectedTeams() {
      if (this.selectedTeams.length === 20 || !this.selectedTeams.length) this.$emit('update-filters', { teams: null })
      else {
        const teams = this.selectedTeams.map(team => team.id)
        this.$emit('update-filters', { teams })
      }
    }
  }
}
</script>

<style scoped>
/* combo */
.combo_input {
  @apply border border-gray-500 rounded w-full p-2 truncate flex justify-between items-center;
}
.combo_options {
  @apply absolute top-14 z-10 bg-white border border-gray-500 rounded w-full h-60 overflow-y-scroll;
  max-height: max-content;
}

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