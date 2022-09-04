export const pageResults = (allItems, page, limit) => {
  const skip = (page - 1) * limit
  return allItems.slice(skip, skip + limit)
}