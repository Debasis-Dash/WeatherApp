# 🌤️ Weather App

A simple and beautiful weather web app that shows real-time weather data for any city in the world, with dynamic city-specific background images.

## Features

- 🔍 Search weather by city name
- 🌡️ Displays temperature in Celsius
- 💧 Shows humidity percentage
- 🌥️ Shows weather description with emoji
- 🖼️ Dynamic background images based on the searched city (powered by Unsplash)
- ⚠️ Error handling for invalid city names

## Built With

- HTML, CSS, JavaScript
- [OpenWeatherMap API](https://openweathermap.org/api) — for real-time weather data
- [Unsplash API](https://unsplash.com/developers) — for city-specific background images

## How to Use

1. Clone the repository
2. Open `index.html` in your browser
3. Type any city name and click **Get Weather**
4. Watch the background change to photos of that city!

## Setup

To run this project locally, you need to add your own API keys in `index.js`:

```js
const apikey = "YOUR_OPENWEATHERMAP_KEY";
const unsplashapikey = "YOUR_UNSPLASH_ACCESS_KEY";
```

## Author

Debasis Dash
