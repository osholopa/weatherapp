# Weatherapp
Fetches weather data from [OpenWeather API](https://openweathermap.org/api) by location
and shows an svg indicating the current weather

## Live installation: [https://weatherapp.osholopa.com](https://weatherapp.osholopa.com)


## Prerequisites
 - [OpenWeather API key](https://openweathermap.org/api)
 - [Docker](https://www.docker.com/get-started/) installed

# Table of contents
1. [Local development environment setup](#setup)
2. [Building and testing production containers locally](#local-prod-test)
3. [Frontend](#frontend)
    1. [Available scripts](#frontend-scripts)
    2. [Environment](#frontend-env)
4. [Backend](#backend)
    1. [Available scripts](#backend-scripts)
    2. [Environment](#backend-env)
5. [Setting up infrastructure and configuration](#infra-setup)
6. [Deployment prerequisites](#depl-prereq)
7. [Deployment steps](#depl-steps)

# Local development environment setup <a name="setup"></a>
1. Clone the repository and move to project root
2. Create .env-file to the root directory and set your API-key to APPID - environment variable :
    ```
    APPID=<your-api-key-here>
    ```
3. Run `docker-compose -f docker-compose.dev.yml up --build`
4. Open [http://localhost:8000/](http://localhost:8000/) in the browser

# Building and testing production containers locally <a name="local-prod-test"></a>
1. Run `docker-compose -f docker-compose.prod-local.yml up --build`
2. Open [http://localhost](http://localhost) in the browser

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

# Setting up infrastructue, configuring and deploying app <a name="infra-setup"></a>
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
- Populated following variables to gitignored .tfvars file:

```sh
project          = "<gcp project id>"
credentials_file = "<path to credential file>"
ssh_pub_key_path = "<path to ssh public key>"
ssh_username     = "<ssh username>"

# terraform.tfvars
```

- Formatted and checked validity with `terraform fmt`, `terraform validate`
- Ran `terraform init`, `terraform plan` and `terraform apply` to provision infrastructure

## Docker
- Added request domain as build-time arg to frontend docker container via .env-file
- Built and pushed images to docker hub

## Ansible
- Edited /etc/ansible/hosts file to include:

```
weatherapp ansible_host=<host ip> ansible_ssh_private_key_file=<path to private key> ansible_user=<ssh username>
```
- Tested connectivity with `ansible weatherapp -m ping`

### Playbooks

[main.yaml](./ansible/main.yaml)
- Installs Docker
  - Installs:
    - Aptitude
    - Required packages
  - Adds GPG Keys
  - Adds repo
  - Updates apt
  - Installs docker & docker compose
- Installs App
  - Creates directory for necessary files
  - Copies nginx configuration
  - Copies docker-compose
  - Copies necessary scripts to remote host

# Deployment prerequisites <a name="depl-prereq"></a>
## 1.  .env-file
Add frontend request uri to .env -file:
```
APPID=<openweather api key>

# dev
# REQUEST_URL=http://localhost

# prod
REQUEST_URL=https://<your app domain>
```
## 2. env.sh

Create env.sh in [sh](./sh/)-folder:
```sh
#!/bin/bash
export APPID=<openweather api key>
export CERTBOT_DATA_PATH=/src/data/certbot
export DOMAIN=<your app domain>
export USER_EMAIL=<certificate email>

# env.sh
```

## 3. nginx.conf 
Edit [nginx.conf](./nginx.conf) to point to the right domain

# Steps overview for deployment <a name="depl-steps"></a>
1. Initial setup, (project in gcp, service account credentials and ssh keys, ansible host file setup)
2. `terraform apply`
3. Build containers with  `docker-compose -f docker-compose.prod-local.yml build`
4. Push frontend and backend container images to docker hub
5. Configure app with `ansible-playbook main.yaml`
6. Take ssh to server with `ssh <username>@<ip>` 
7. Deploy with  `cd /src/weatherapp && source ./env.sh && ./init-weatherapp.sh` to request ssl certificate and start app
8. Done! 🚀
