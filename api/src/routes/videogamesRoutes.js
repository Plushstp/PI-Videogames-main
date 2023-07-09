const { Router } = require("express");
const getGames = require("../controllers/getGames");
const getGamesByName = require("../controllers/getGamesByName");
const getGameById = require("../controllers/getGamesById");
const postGames = require("../controllers/postGames");
const videogamesRoutes = Router();

videogamesRoutes.get("/", async (req, res) => {
  try {
    const allGames = await getGames();
    return res.status(200).json(allGames);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//http://localhost:3001/videogames/name?name=juegoABuscar
videogamesRoutes.get("/name", async (req, res) => {
  try {
    const { name } = req.query;
    const gameByName = await getGamesByName(name);
    res.status(200).json(gameByName);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

videogamesRoutes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const videogameById = await getGameById(id);
    res.status(200).json(videogameById);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

videogamesRoutes.post("/", async (req, res) => {
  try {
    const response = req.body;
    const videogamePost = await postGames(response);
    res.status(201).json(videogamePost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = videogamesRoutes;