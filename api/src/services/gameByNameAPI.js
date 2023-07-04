require("dotenv").config()
const { URL, KEY } = process.env
const axios = require("axios")

const gameByNameAPI = async (name) => {
    const urlAPI = `${URL}/games?search=${name}&key=${KEY}&page_size=15`
    const { data } = await axios.get(urlAPI)
    const arrayOfSearchGames = data.results.map(
      ({
        id,
        name,
        background_image,
        rating,
        released,
        parent_platforms,
        genres
      }) => ({
        id,
        name,
        background_image,
        rating: Math.floor(rating),
        released,
        parent_platforms: parent_platforms
          .map((platform) => platform.platform.name)
          .join(", "),
        genres: genres.map((genre) => genre.name).join(", "),
        created: false
      })
    )
    return arrayOfSearchGames;
}

module.exports = gameByNameAPI