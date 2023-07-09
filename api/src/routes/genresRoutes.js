const { Router } = require("express");
const getGenres = require("../controllers/getGenres");
const genresRoutes = Router();

genresRoutes.get("/", async (req, res) => {
  try {
    const getAllGenres = await getGenres();

    res.status(200).json(getAllGenres);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = genresRoutes;