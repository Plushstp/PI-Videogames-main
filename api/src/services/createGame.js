const { Videogame } = require("../db")

const createGame = async (
  name,
  description,
  platforms,
  background_image,
  released,
  rating,
  genres
) => {
  if (
    !name ||
    !description ||
    !platforms ||
    !background_image ||
    !released ||
    !rating ||
    !genres
  ) {
    throw Error("Missing some data")
  } else {
    const [videogame, created] = await Videogame.findOrCreate({
      where: { name },
      defaults: {
        name,
        description,
        platforms,
        background_image,
        released,
        rating,
        genres
      }
    })

    if (!created) {
      throw Error(`${videogame.name} is already created`)
    }

    return await Videogame.findAll()
  }
}

module.exports = createGame
