const router = require("express").Router();
const UserController = require("../controllers/UserController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const CityWeatherController = require("../controllers/CityWeatherController");
const { invalidateCache, cache } = require("../middlewares/redisCache");

// Auth API
router.get("/api/auth", jwtAuth, UserController.checkAuth);
router.post("/api/auth", UserController.login);

// User 
router.get("/api/user", jwtAuth, cache.route(), UserController.getUser);
router.post("/api/user", invalidateCache('/api/user'), UserController.createUser);

// CityWeather API
router.get("/api/city", jwtAuth, cache.route(), CityWeatherController.getCityWeather);
router.post("/api/city", jwtAuth, invalidateCache('/api/city'), CityWeatherController.createCityWeather);
router.put("/api/city", jwtAuth, invalidateCache('/api/city'), CityWeatherController.editCityWeather);
router.delete("/api/city", jwtAuth, invalidateCache('/api/city'), CityWeatherController.deleteCityWeather);

// Obtem climas junto com api.weatherstack
router.get("/api/weather", jwtAuth, CityWeatherController.getWeather);

module.exports = router;