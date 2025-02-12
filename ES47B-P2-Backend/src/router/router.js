const router = require("express").Router();
const UserController = require("../controllers/UserController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const CityWeatherController = require("../controllers/CityWeatherController");

// Auth API
router.get("/api/auth", jwtAuth, UserController.checkAuth);
router.post("/api/auth", UserController.login);

// User 
router.get("/api/user", jwtAuth, UserController.getUser);
router.post("/api/user", UserController.createUser);

// CityWeather API
router.get("/api/cityweather", jwtAuth, CityWeatherController.getCityWeather);
router.post("/api/cityweather", jwtAuth, CityWeatherController.createCityWeather);
router.put("/api/cityweather", jwtAuth, CityWeatherController.editCityWeather);
router.delete("/api/cityweather", jwtAuth, CityWeatherController.deleteCityWeather);
router.get("/api/weather", jwtAuth, CityWeatherController.getWeather);

module.exports = router;