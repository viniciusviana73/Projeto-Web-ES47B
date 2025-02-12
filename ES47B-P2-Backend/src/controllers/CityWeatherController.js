const CityWeather = require('../models/CityWeather');
const fs = require('fs');
const path = require('path');

const getApiKeys = () => {
    try {
        const weather_api_keys_PATH = path.join(__dirname, "../database/weather-api-keys.json");
        const keys = JSON.parse(fs.readFileSync(weather_api_keys_PATH));

        return keys;
    } catch (error) {
        console.error("Erro ao obter chaves armazenadas... Retornando default keys");

        const API_KEYS = [
            'afaf93f12fca5e41cb6e19f3722e7685',
            '31c0b9c764921cee5efa9b6c30308ea2',
            '4efddb1874bb89ae15eff63c678e61e3'
        ];

        return API_KEYS;
    }
}

exports.createCityWeather = async (req, res) => {
    try {
        const { cityName } = req.body;

        if (!cityName) {
            return res.status(400).json({ message: 'Nome da cidade é obrigatório' });
        }

        // Checa se já existe
        const existingCity = await CityWeather.findOne({ cityName: { $regex: new RegExp(`^${cityName}$`, 'i') } });

        if (existingCity) {
            return res.status(400).json({ message: 'Cidade já cadastrada' });
        }

        const newCity = await CityWeather.create({ cityName });
        return res.status(201).json({ data: newCity });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

exports.getCityWeather = async (req, res) => {
    try {
        const { city } = req.query;

        if (city) {
            const cityData = await CityWeather.findOne({
                cityName: { $regex: new RegExp(`^${city}$`, 'i') } // Case insensitive
            }).lean();

            if (!cityData) {
                return res.status(404).json({ message: 'Cidade não encontrada' });
            }

            return res.status(200).json({ data: cityData });
        }

        const cities = await CityWeather.find().lean();
        return res.status(200).json({ data: cities });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

exports.editCityWeather = async (req, res) => {
    try {
        const { id } = req.query;
        const { cityName } = req.body;

        if (!id || !cityName) {
            return res.status(400).json({ message: 'ID e novo nome da cidade são obrigatórios' });
        }

        const city = await CityWeather.findById(id);
        if (!city) {
            return res.status(404).json({ message: 'Cidade não encontrada' });
        }

        // Atualiza dados e salva no db
        city.cityName = cityName;
        city.weatherData = undefined;
        await city.save();

        return res.status(200).json({ data: city });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

exports.deleteCityWeather = async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: 'ID é obrigatório' });
        }

        const city = await CityWeather.findByIdAndDelete(id);
        if (!city) {
            return res.status(404).json({ message: 'Cidade não encontrada' });
        }

        return res.status(200).json({ message: 'Cidade excluída com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};


// Retorna dados de clima de todas cidades cadastradas no db
exports.getWeather = async (req, res) => {
    try {
        const { unit = 'm' } = req.query; // m = metric, f = imperial
        const cities = await CityWeather.find().lean();

        // Filtrando cidades que precisam de atualização
        const citiesToUpdate = cities.filter(city => {
            const lastUpdate = new Date(city.updatedAt).getTime();
            const now = Date.now();
            return !city.weatherData || (now - lastUpdate) > 24 * 3600 * 1000;
        });

        // Atualiza dados caso haja necessidade
        const updatePromises = citiesToUpdate.map(async (city) => {
            try {
                const keys = getApiKeys();
                const key = keys[Math.floor(Math.random() * keys.length)]; // Rotaciona chaves :D

                const response = await fetch(
                    `https://api.weatherstack.com/current?access_key=${key}&query=${city.cityName}&units=${unit}`
                );

                const data = await response.json();

                if (data.error) {
                    console.error(`Erro na API para ${city.cityName}:`, data.error.info);
                    return;
                }

                // Atualiza apenas os campos essenciais
                await CityWeather.findByIdAndUpdate(city._id, {
                    weatherData: {
                        temperature: data.current.temperature,
                        condition: data.current.weather_descriptions[0],
                        icon: data.current.weather_icons[0],
                        humidity: data.current.humidity,
                        windSpeed: data.current.wind_speed
                    }
                });
            } catch (error) {
                console.error(`Falha ao atualizar ${city.cityName}:`, error);
            }
        });

        await Promise.all(updatePromises);

        const updatedCities = await CityWeather.find().lean();
        return res.status(200).json({ data: updatedCities });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};