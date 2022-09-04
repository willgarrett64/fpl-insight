export const removeAccents = str => {
  const accents    = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
  const accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
  str = str.split('');
  const strLen = str.length;
  var i, x;
  for (i = 0; i < strLen; i++) {
    if ((x = accents.indexOf(str[i])) != -1) {
    str[i] = accentsOut[x];
    }
  }
  return str.join('').toLowerCase();
}


export const players = (allPlayers, filters) => {
  let players = [ ...allPlayers ]

  // filters
  const playerName = removeAccents(filters.name) || ''
  const positions = filters.pos
  const teams = filters.teams
  const minPrice = filters.minPrice || 0
  const maxPrice = filters.maxPrice || 20
  const minTsb = filters.minTsb || 0
  const maxTsb = filters.maxTsb || 100

  if (positions) players = players.filter(player => positions.includes(player.element_type))
  if (teams) players = players.filter(player => teams.includes(player.team))
  players = players.filter(player => {
    const price = player.now_cost
    const tsb = player.selected_by_percent
    return price >= minPrice &&
      price <= maxPrice &&
      tsb >= minTsb &&
      tsb <= maxTsb &&
      removeAccents(player.web_name).startsWith(playerName)
  })

  return players
}