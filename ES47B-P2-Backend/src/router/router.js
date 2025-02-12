const router = require("express").Router();
const UserController = require("../controllers/UserController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const CityWeatherController = require("../controllers/CityWeatherController");

// Auth API
router.get("/api/auth", jwtAuth, UserController.checkAuth);
router.post("/api/auth", UserController.login);

// User 
router.get("/api/user", UserController.getUser);
router.post("/api/user", UserController.createUser);

// CityWeather API
router.get("/api/cityweather", CityWeatherController.getCityWeather);
router.post("/api/cityweather", CityWeatherController.createCityWeather);
router.put("/api/cityweather", CityWeatherController.editCityWeather);
router.delete("/api/cityweather", CityWeatherController.deleteCityWeather);
router.get("/api/weather", CityWeatherController.getWeather); // Recupera clima de todos CityWeather (para renderizarmos todas cidades cadastradas no front)

module.exports = router;