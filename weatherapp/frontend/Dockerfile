FROM node:16.15-alpine
WORKDIR /usr/src/app

ENV ENDPOINT=http://localhost/api

# Expose port where content is served
EXPOSE 5000

# Copy package.json, lockfile & install dependencies in the same layer
COPY package* ./
RUN npm install

# Copy rest of source code
COPY . ./

# Build for production
RUN npm run build
RUN npm install -g serve

# Create dedicated user to avoid running processes as root
RUN addgroup -g 1001 frontend
RUN adduser -u 1001 -G frontend -h /home/username -D frontend
RUN chown -R frontend:frontend dist

USER frontend

CMD ["serve",  "-s", "-l", "5000", "dist"]
