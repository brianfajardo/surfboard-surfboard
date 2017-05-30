const Artist = require('../models/artist')

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */

module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  const query = Artist.find(buildQuery(criteria)) // Dynamic query building
    .sort({ [sortProperty]: 1 }) // Can't use template strings here (are only expressions)
    .skip(offset)
    .limit(limit)

  // count() is an asynchronous function

  return Promise.all([query, Artist.find(buildQuery(criteria)).count()])
    .then(results => ({
      all: results[0],
      count: results[1],
      offset,
      limit
    }))
}

function buildQuery(criteria) {
  const query = {}

  // Need to create text index to use $text & $search.
  // In terminal, in working directory: mongod,
  // switch to working db: use DB_NAME,
  // db.MODEL_NAME.createIndex({KEY_OF_FIELD: "NAME_OF_INDEX"})

  if (criteria.name) {
    // Matches entire word only
    query.$text = { $search: criteria.name }
  }

  if (criteria.age) {
    query.age = {
      $gte: criteria.age.min,
      $lte: criteria.age.max
    }
  }

  if (criteria.yearsActive) {
    query.yearsActive = {
      $gte: criteria.yearsActive.min,
      $lte: criteria.yearsActive.max
    }
  }

  return query
}
