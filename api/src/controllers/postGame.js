const { createGame } = require("../services/index")

const postGame = async (req, res) => {
  console.log(req.body)
  const {
    name,
    description,
    platforms,
    background_image,
    released,
    rating,
    genres
  } = req.body
  try {
    const gameCreated = await createGame(
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      genres
    )

    res.status(201).json(gameCreated)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = postGame