const { Videogame, Genres } = require("../db.js");
const axios = require("axios");
const { URL, KEY } = process.env;

const getGames = async () => {
    const gamesFromDB = await getGamesFromDB();
    const gamesFromAPI = await getGamesFromAPI();
    if (![...gamesFromDB, ...gamesFromAPI].length)
          throw new Error("Game list not found");
    return [...gamesFromDB, ...gamesFromAPI];
};

const getGamesFromAPI = async () => {
    const { data } = await axios(`${URL}/games?key=${KEY}&page_size=100`);
    const api = data.results;
    const allGamesApi = api.map((game) => ({
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        rating: Math.floor(game.rating),
        released: game.released,
        platforms: game.platforms?.map((p) => p.platform?.name).join(", "),
        genres: game.genres?.map((genre) => genre.name).join(", "),
        created: false
    }));
    return allGamesApi;
};

const getGamesFromDB = async () => {
    const allGamesDB = await Videogame.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: {
        attributes: [],
        },
      }
    });
    return allGamesDB;
}

module.exports = getGames;