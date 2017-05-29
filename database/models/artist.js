const mongoose = require('mongoose')
const AlbumSchema = require('../models/album')

const { Schema } = mongoose

const ArtistSchema = new Schema({
  name: String,
  age: Number,
  yearsActive: Number,
  image: String,
  genre: String,
  website: String,
  netWorth: Number,
  labelName: String,
  retired: Boolean,
  albums: [AlbumSchema]
})

const Artist = mongoose.model('artist', ArtistSchema)

module.exports = Artist
