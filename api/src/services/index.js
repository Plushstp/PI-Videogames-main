const createGame = require("./createGame")
const gameByNameAPI = require("./gameByNameAPI")
const gameByNameDb = require("./gameByNameDb")
const genreService = require("./genreService")
const getAllGamesAPI = require("./getAllGamesAPI")
const getAllGamesDB = require("./getAllGamesDB")
const idAPI = require("./idAPI")
const idDB = require("./idDB")

module.exports = {
  createGame,
  gameByNameAPI,
  gameByNameDb,
  genreService,
  getAllGamesAPI,
  getAllGamesDB,
  idAPI,
  idDB
}