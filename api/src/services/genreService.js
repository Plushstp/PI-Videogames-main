require("dotenv").config()
const { URL, KEY } = process.env
const axios = require("axios")
const { Genres } = require("../db")

const genreService = async () => {
  const genresInDb = await Genres.findAll()
  if (genresInDb.length > 0) {
    return genresInDb
  }
  const url = `${URL}/genres?key=${KEY}`
  const { data } = await axios.get(url)
  const listOfGenres = data.results.map((genre) => {
    return {
      id: genre.id,
      name: genre.name
    }
  })
  if (!listOfGenres) {
    throw Error("Not genres found")
  } else {
    Genres.bulkCreate(listOfGenres)
    const listOfGenresFromDb = await Genres.findAll()
    return listOfGenresFromDb
  }
}
module.exports = genreService