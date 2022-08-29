// Transform any simple object into a query string for use in URLs.
/** @todo handle empty arrays */
export const toQueryString = data => {
  let query = []
  for (const key in data) {
    const v = data[key]
    if (v) {
      if (v instanceof Array) query.push(`${key}=${v.map(urlsafe).join(',')}`)
      else query.push(`${key}=${urlsafe(v)}`)
    }
  }
  return query.join('&')
}

// Sanitize a value for use in URLs.
export const urlsafe = v => {
  if (typeof v === 'string') return v.replace(/ /g, '%20')
  return `${v}`
}
