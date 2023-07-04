require("dotenv").config()
const { URL, KEY } = process.env
const axios = require("axios")

const idAPI = async (id) => {
  const url = `${URL}/games/${id}?key=${KEY}`

  const response = await axios(url)
  const {
    name,
    description,
    released,
    background_image,
    rating,
    genres,
  } = response.data
  
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
}

module.exports = idAPI