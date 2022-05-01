# Weatherapp


# Table of contents
1. [Frontend](#frontend)
    1. [Installation](#frontend-install)
    2. [Scripts](#frontend-scripts)
    3. [Environment](#frontend-env)
2. [Backend](#backend)
    1. [Installation](#backend-install)
    2. [Scripts](#backend-scripts)
    3. [Environment](#backend-env)


## Frontend <a name="frontend"></a>

### Installation <a name="frontend-install"></a>
- Run `npm install`

### Scripts <a name="frontend-scripts"></a>
- `npm start` - Starts webpack dev server 
- `npm run lint` - Checks code style with ESLint

### Environment <a name="frontend-env"></a>
| Variable | Default value | Description |
|--|--|--|
|ENDPOINT|http://0.0.0.0:9000/api|Backend API URL|
|HOST|"0.0.0.0"|Webpack devserver host address|
|POST|8000|Webpack devserver port|



## Backend <a name="backend"></a>

### Installation <a name="backend-install"></a>
- Run `npm install`

### Scripts <a name="backend-scripts"></a>
- `npm start` - Starts listening specified port
- `npm run lint` - Checks code style with ESLint

### Environment <a name="backend-env"></a>
| Variable | Default value | Description |
|--|--|--|
|APPID|""|[OpenWeather](https://openweathermap.org/api) API key|
|MAP_ENDPOINT|http://api.openweathermap.org/data/2.5|[OpenWeather](https://openweathermap.org/api) API URL|
|TARGET_CITY|"Helsinki,fi"|[OpenWeather](https://openweathermap.org/api) weather location|
|PORT|9000|Backend port|
