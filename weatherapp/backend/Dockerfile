FROM node:16.15-alpine
WORKDIR /usr/src/app

# Copy package.json, lockfile & install dependencies in the same layer
COPY package* ./
RUN npm ci --only=production

# Copy rest of source code
COPY . ./

# Create dedicated user to avoid running processes as root
RUN addgroup -g 1001 backend
RUN adduser -u 1001 -G backend -h /home/username -D backend
RUN chown -R backend:backend ./

USER backend

CMD ["node", "src/index.js"]