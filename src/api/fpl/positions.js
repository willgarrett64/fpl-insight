import superagent from 'superagent'

const api_url = process.env.VUE_APP_API_URL

// get players
export const getPositions = async () => {
  const url = `${api_url}/fpl/positions`
  const response = await superagent.get(url)
  return response.body
}
