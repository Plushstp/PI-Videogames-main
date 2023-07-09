const { Videogame, Genres } = require(`../db`)

const postGames = async ({
    name,
    description,
    platforms,
    background_image,
    released,
    rating,
    genres
}) => {
  if (!name || !description || !platforms || !background_image || !released || !rating || !genres) throw Error("Missing some data")
    
  const findGenres = await Genres.findOne({ where: { id: genres }, })
  const newGame = await Videogame.create({
    name,
    description,
    platforms,
    background_image,
    released,
    rating,
  });
  await newGame.setGenres(findGenres);
  return newGame;
}

module.exports = postGames