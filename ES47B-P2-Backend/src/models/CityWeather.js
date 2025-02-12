const mongoose = require('mongoose');

const cityWeatherSchema = new mongoose.Schema({
    cityName: {
        type: String,
        required: true,
    },
    weatherData: {
        type: mongoose.Schema.Types.Mixed
    }
}, {
    timestamps: true
});

const CityWeather = mongoose.model('CityWeather', cityWeatherSchema);

module.exports = CityWeather;