const { Videogame } = require("../db")

const getAllGamesDB = async () => {
    const allVideoGames = await Videogame.findAll()

    const formattedAllVideoGames = allVideoGames.map((game) => {
      const genres = Array.isArray(game.genres)
        ? game.genres.join(", ")
        : game.genres
      
      return {
        ...game.toJSON(),
        genres
        }
    })

    return formattedAllVideoGames
}

module.exports = getAllGamesDB
