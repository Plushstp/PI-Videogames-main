const { Videogame } = require("../db")
const { Op } = require("sequelize")

const gameByNameDb = async (name) => {
  if (name) {
    const videoGame = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    })

    const formattedVideoGames = videoGame.map((game) => {
      const genres = Array.isArray(game.genres)
        ? game.genres.join(", ")
        : game.genres
        return {
        ...game.toJSON(),
        genres
      }
    })

    return formattedVideoGames
  }
}

module.exports = gameByNameDb
