const Artist = require('../models/artist')

/**
 * Sets a group of Artists as retired
 * @param {array} _ids - An array of the _id's of of artists to update
 * @return {promise} A promise that resolves after the update
 */

// Look at every artists ID
// If their ID is in this list (_ids),
// update retired status to true

module.exports = (_ids) => {
  return Artist.update(
    { _id: { $in: _ids } },
    { retired: true },
    { multi: true } // multiple documents are updated at once (default false)
  )
}
