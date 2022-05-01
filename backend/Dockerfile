FROM node:16.15-alpine
WORKDIR /app

# Copy package.json, lockfile && Install dependencies in the same layer
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm install

# Copy rest of source code
COPY . /app

# Add dedicated user to avoid running as root
RUN addgroup -g 1001 weatherapp
RUN adduser -u 1001 -G weatherapp -h /home/username -D weatherapp
RUN chown -R weatherapp:weatherapp ./

USER weatherapp

# Start server
CMD ["npm", "start"]