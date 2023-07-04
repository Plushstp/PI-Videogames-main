const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getGames, getGameById, getGameByName , postGame, getGenres } = require("../controllers/index")
  
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", getGames)
router.get("/videogames/:id", getGameById)
router.get("/videogames/name", getGameByName)
router.post("/videogames", postGame)
router.get("/genres", getGenres)

module.exports = router;