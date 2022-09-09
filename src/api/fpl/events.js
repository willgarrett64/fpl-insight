import superagent from 'superagent'
import { toQueryString } from '../helpers'

const api_url = process.env.VUE_APP_API_URL

// get events
export const getEvents = async (params) => {
  let url = `${api_url}/fpl/events`
  if (params !== undefined) url += `?${toQueryString(params)}`
  const response = await superagent.get(url)
  return response.body
}