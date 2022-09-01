import * as api from './api'
import { createStore } from 'vuex'

const store = createStore({
  state: {
    currentGw: null,
    players: null,
    positions: null,
    teams: null,
  },
  mutations: {
    setCurrentGw(state, currentGw) {
      state.currentGw = currentGw
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
    async updatePlayers({ commit }) {
      const players = await api.players.getPlayers()
      commit('setPlayers', players)
    },
    async updateTeams({ commit }) {
      const teams = await api.teams.getTeams()
      commit('setTeams', teams)
    }
  },
  getters: {
  }
})

export default store
