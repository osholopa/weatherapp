# Weatherapp

Fetches weather data from [OpenWeather API](https://openweathermap.org/api) by location
and shows an svg indicating the current weather

## Prerequisites
 - [OpenWeather API key](https://openweathermap.org/api)
 - [Docker](https://www.docker.com/get-started/) installed

# Table of contents
1. [Local development environment setup](#setup)
2. [Frontend](#frontend)
    1. [Available scripts](#frontend-scripts)
    2. [Environment](#frontend-env)
3. [Backend](#backend)
    1. [Available scripts](#backend-scripts)
    2. [Environment](#backend-env)

# Local development environment setup <a name="setup"></a>
1. Clone the repository
2. Create .env-file to the root directory and set your API-key to APPID - environment variable :
    ```
    APPID=<your-api-key-here>
    ```
3. Run ` docker-compose -f docker-compose.dev.yml up --build`
4. Open [http://localhost:8000/](http://localhost:8000/) in the browser

# Frontend (React) <a name="frontend"></a>

### Available scripts <a name="frontend-scripts"></a>
- `npm start` - Starts webpack dev server
- `npm run build` - Bundles JavaScript code and other static assets for production 
- `npm run lint` - Checks code style with ESLint

### Environment <a name="frontend-env"></a>
| Variable | Default value | Description |
|--|--|--|
|ENDPOINT|http://0.0.0.0:9000/api|Backend API URL|
|HOST|"0.0.0.0"|Webpack devserver host address|
|POST|8000|Webpack devserver port|


# Backend (Koa.js / Node API) <a name="backend"></a>

### Available scripts <a name="backend-scripts"></a>
- `npm start` - Starts listening specified port
- `npm run dev` - Starts backend in development mode with hot reload
- `npm run lint` - Checks code style with ESLint

### Environment <a name="backend-env"></a>
| Variable | Default value | Description |
|--|--|--|
|APPID|""|[OpenWeather](https://openweathermap.org/api) API key|
|MAP_ENDPOINT|http://api.openweathermap.org/data/2.5|[OpenWeather](https://openweathermap.org/api) API URL|
|TARGET_CITY|"Helsinki,fi"|[OpenWeather](https://openweathermap.org/api) weather location|
|PORT|9000|Backend port|
