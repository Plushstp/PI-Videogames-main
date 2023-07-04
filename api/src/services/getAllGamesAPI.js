require("dotenv").config()
const { URL, KEY } = process.env
const axios = require("axios")

const getAllGamesAPI = async () => {
    let promises = [1, 2, 3, 4].map(
        async (e) => await axios.get(`${URL}/games?key=${KEY}&page_size=25&page=${e}`)
    )
    response = await Promise.all(promises)

    response = response.reduce((prev, curr) => {
        return prev.concat(curr.data.results)
    }, [])

    const videogameArray = response.map(
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
  
    if (videogameArray.length === 0) {
        throw Error("Game list not found")
    } else {
        return videogameArray
    }
}

module.exports = getAllGamesAPI