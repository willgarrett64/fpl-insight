import * as api from './api'
import { createStore } from 'vuex'

const store = createStore({
  state: {
    events: null,
    maxPlayerStats: null,
    players: null,
    positions: null,
    teams: null,
  },
  mutations: {
    setEvents(state, events) {
      state.events = events
    },
    setMaxPlayerStats(state, maxStats) {
      state.maxPlayerStats = maxStats
    },
    setPlayers(state, players) {
      state.players = players
    },
    setPositions(state, positions) {
      state.positions = positions
    },
    setTeams(state, teams) {
      state.teams = teams
    }
  },
  actions: {
    async getPositions({ commit }) {
      const positions = await api.positions.getPositions()
      commit('setPositions', positions)
    },
    async updateEvents({ commit }) {
      const events = await api.events.getEvents()
      commit('setEvents', events)
    },
    async updateMaxPlayerStats({ commit }) {
      const maxStats = await api.players.getMaxStats()
      commit('setMaxPlayerStats', maxStats)
    },
    async updatePlayers({ commit }) {
      const players = await api.players.getPlayers({ limit: 1000 })
      commit('setPlayers', players)
    },
    async updateTeams({ commit }) {
      const teams = await api.teams.getTeams()
      commit('setTeams', teams)
    }
  },
  getters: {
    nextGameweek(state) {
      return state.events && state.events.find(event => event.is_next).id
    }
  }
})

export default store
