const axios = require("axios");
const { Videogame, Genres } = require("../db");
require("dotenv").config();
const { URL, KEY } = process.env;


const getGamesById = async (id) => {
  if (Number(id)) {
      const gameInAPI = await gameByIdAPI(id)
      if (gameInAPI) return gameInAPI
        throw Error('Videogame not found')
  } else if (isNaN(id)) {
      const gameInBD = await gameByIdBD(id)
      if (gameInBD) return gameInBD
        throw Error('Videogame not found')
  } else {
      throw Error('Videogame not found')
  }
}

const gameByIdAPI = async (id) => {
    const result = await axios(`${URL}/games/${id}?key=${KEY}`);
    const {
        name,
        description,
        released,
        background_image,
        rating,
        genres,
    } = result.data
    if (genres) {
        genresNames = genres.map((genre) => genre.name)
    }
    const parsedDescription = description.replace(/<[^>]+>/g, "")
    let videoGame = {
        name,
        parsedDescription,
        released,
        background_image,
        rating,
        genresNames,
    }
    if (!videoGame) {
        throw Error("Missing some data")
    } else {
        return {
          id,
          name,
          description: parsedDescription,
          released,
          background_image,
          rating,
          genres: genresNames,
          created: false
        }
    }
};

const gameByIdBD = async (id) => {
    const gameIDBD = await Videogame.findAll({
      where: { id },
      include: {
        model: Genres,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      }
    });
    return gameIDBD
};

module.exports = getGamesById;