const { genreService } = require("../services/index")

const getGenres = async (req, res) => {
  try {
    const listOfGenres = await genreService()
    res.status(200).json(listOfGenres)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = getGenres