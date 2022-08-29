import superagent from 'superagent'
import { toQueryString } from '../helpers'

const api_url = process.env.VUE_APP_API_URL

// get player by id
export const getPlayer = async (playerId) => {
  const url = `${api_url}/fpl/player/${playerId}`
  const response = await superagent.get(url)
  return response.body
}

// get players
export const getPlayers = async (params) => {
  let url = `${api_url}/fpl/players`
  if (params !== undefined) url += `?${toQueryString(params)}`
  const response = await superagent.get(url)
  return response.body
}

