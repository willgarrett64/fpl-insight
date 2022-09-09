<template>
  <div class="panel">
    <div class="relative">
      <Combobox v-if="players" v-model="selectedPlayer">
        <div class="combo_input">
          <ComboboxInput @change=onInputChange class="input" placeholder="Enter player name" />
          <div><MagnifyingGlassIcon class="w-4" /></div>
        </div>
        <ComboboxOptions class="combo_options">
          <ComboboxOption
            v-for="player in filteredPlayers"
            :key="player.id"
            :value="player"
          >
            <div class="flex flex-col py-1 border cursor-pointer hover:bg-gray-100">
              <span class="font-bold">{{ player.web_name }}</span>
              <span class="text-sm">{{ player.team_name }}</span>
              <span class="text-sm">{{ player.total_points }} Points</span>
            </div>
          </ComboboxOption>
        </ComboboxOptions>
      </Combobox>
    </div>
    <div v-if="!selectedPlayer" class="h-56 py-4 flex flex-col justify-center items-center">
      <UserPlusIcon class="w-20 text-gray-300" />
      <span class="">Search a player to start comparison</span>
    </div>
    <div v-else class="h-56 py-4 flex flex-col">
      <span class="font-bold text-lg">{{ selectedPlayer.web_name }}</span>
      <span class="text-md">{{ selectedPlayer.team_name }}</span>
      <span class="text-md">Total Points: {{ selectedPlayer.total_points }}</span>
      <span class="text-md">Form: {{ selectedPlayer.form }}</span>
      <span class="text-md">PPM: {{ selectedPlayer.points_per_million }}</span>
    </div>
  </div>
</template>

<script>
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/vue'
import {
  MagnifyingGlassIcon,
  UserPlusIcon
} from '@heroicons/vue/24/outline'
import { mapState } from 'vuex'
import { removeAccents } from '../utils/filter'

export default {
  name: 'HeadToHeadPlayerSelector',
  components: {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
    MagnifyingGlassIcon,
    UserPlusIcon
  },
  props: ['index'],
  data() {
    return {
      playerInput: '',
      selectedPlayer: null
    }
  },
  computed: {
    ...mapState(['players']),
    filteredPlayers() {
      return this.players.filter(player => {
        return removeAccents(player.web_name).startsWith(removeAccents(this.playerInput)) ||
          removeAccents(player.second_name).startsWith(removeAccents(this.playerInput))
      })
    }
  },
  methods: {
    onInputChange(event) {
      this.playerInput = event.target.value
    }
  },
  watch: {
    selectedPlayer() {
      this.$emit('update-player', this.selectedPlayer, this.index)
    }
  }
}
</script>

<style scoped>
.input {
  @apply p-0 w-full focus:outline-none;
}
</style>
