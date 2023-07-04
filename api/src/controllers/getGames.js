const { getAllGamesAPI, getAllGamesDB } = require("../services/index")

const getGames = async (req, res) => {
  try {
    const gamesFromApi = await getAllGamesAPI()
    const gamesFromDb = await getAllGamesDB()
    if (gamesFromApi && gamesFromDb) {
      const allGames = [...gamesFromApi, ...gamesFromDb]
      res.status(200).json(allGames)
    } else if (gamesFromApi) {
      res.status(200).json(gamesFromApi)
    } else {
      res.status(200).json(gamesFromDb)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
module.exports = getGames
