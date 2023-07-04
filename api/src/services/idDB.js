const { Videogame, Genres } = require("../db")

const idDB = async (id) => {
  const videoGame = await Videogame.findByPk(id, {
    include: [
      {
        model: Genres,
        attributes: ["name"],
        through: { attributes: [] }
      }
    ]
  })
  if (!videoGame) {
    throw Error("Videogame not found")
  } else {
    return videoGame
  }
}

module.exports = idDB