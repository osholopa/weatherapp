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
4. [Setting up infrastructure and configuration](#infra-setup)

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

# Setting up infrastructure and configuration <a name="infra-setup"></a>
## My environment
- Google Cloud Platform
- WSL 2 Ubuntu 20.04 as control node
- debian-cloud/debian-9 as managed node
- Terraform v1.1.9
- Ansible 2.12.4

## GCP Credentials & SSH Key
1. Initial project setup
- Created project in GCP
- Enabled compute engine API

2. GCP credentials
- Created service account for terraform
- Added roles Project -> Owner
- Downloaded json key

3. SSH keys
- Generated ssh keys to control node (WSL) with ssh-keygen

## Terraform
- Wrote configuration for VM, firewall, ip, ssh key metadata
- Outputs for VM IP
- Populated variables to gitignored .tfvars file:
1. Name of GCP project
2. Path to credential file
3. Path to ssh public key
4. Ssh username
- Formatted and checked validity with `terraform fmt`, `terraform validate`
- Ran `terraform init`, `terraform plan` and `terraform apply` to provision infrastructure

## Ansible
- Edited /etc/ansible/hosts file to include:
1. Name of target host
2. Managed node ip address
3. Path to ssh private key
4. ssh username
```
weatherapp ansible_host=<host ip> ansible_ssh_private_key_file=<path to private key> ansible_user=<ssh username>
```
- Tested connectivity with `ansible weatherapp -m ping`

