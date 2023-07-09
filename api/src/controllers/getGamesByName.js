const { Sequelize } = require("sequelize");
const { Videogame, Genres } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
const { URL, KEY } = process.env;

const getGamesByName = async (name) => {
    const gamesByNameFromAPI = await getGameByNameFromAPI(name);
    const gamesByNameFromDB = await getGameByNameFromDB(name);
    if (![...gamesByNameFromDB, ...gamesByNameFromAPI].length)
      throw Error("Doesn't find any videogame with that name");
    return [...gamesByNameFromDB, ...gamesByNameFromAPI];
};

const getGameByNameFromAPI = async (name) => {
    const { data } = await axios(`${URL}/games?search=${name}&key=${KEY}&page_size=15`
    );
    const api = data.results;
    const allGamesApiName= api.map((game) => {
      return {
          id: game.id,
          name: game.name,
          background_image: game.background_image,
          rating: Math.floor(game.rating),
          released: game.released,
          platforms: game.platforms?.map((p) => p.platform?.name).join(", "),
          genres: game.genres?.map((genre) => genre.name).join(", "),
          created: false
      };
    });
    return allGamesApiName;
};

const getGameByNameFromDB = async (name) => {
  const dataBaseGames = await Videogame.findAll({
    where: {
      name: {
        [Sequelize.Op.iLike]: `%${name}%`,
      },
    },
    include: {
      model: Genres,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return dataBaseGames;
};


module.exports = getGamesByName;