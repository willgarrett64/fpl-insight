import superagent from 'superagent'
// import { toQueryString } from './helpers'

const api_url = process.env.VUE_APP_API_URL

// get team by id
export const getTeam = async (teamId) => {
  const url = `${api_url}/fpl/team/${teamId}`
  const response = await superagent.get(url)
  return response.body
}

// get teams
export const getTeams = async () => {
  const url = `${api_url}/fpl/teams`
  const response = await superagent.get(url)
  return response.body
}

