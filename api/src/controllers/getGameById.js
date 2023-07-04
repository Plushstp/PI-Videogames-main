const { idAPI, idDB } = require("../services/index")

const getGameById = async (req, res) => {
  const { id } = req.params
  try {
    if (isNaN(id)) {
      const videoGameFromDb = await idDB(id)
      res.status(200).json(videoGameFromDb)
    } else {
      const videoGameFromAPI = await idAPI(id)
      res.status(200).json(videoGameFromAPI)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = getGameById