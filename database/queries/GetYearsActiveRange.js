const Artist = require('../models/artist')

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */

module.exports = () => {
  const minYearsActive = Artist.find({})
    .sort({ yearsActive: 1 })
    .limit(1)
    .then(artists => artists[0].yearsActive)

  const maxYearsActive = Artist.find({})
    .sort({ yearsActive: -1 })
    .limit(1)
    .then(artists => artists[0].yearsActive)

  return Promise.all([minYearsActive, maxYearsActive])
    .then(results => ({
      min: results[0],
      max: results[1]
    }))
}
