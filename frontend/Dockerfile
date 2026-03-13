FROM node:20-alpine

WORKDIR /app

# Copy package files first to optimize build caching
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Next.js dev server runs on 3000 by default
EXPOSE 3000

CMD ["npm", "run", "dev"]