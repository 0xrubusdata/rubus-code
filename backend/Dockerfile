# Use an official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage Docker caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Expose the application port
EXPOSE ${BACKEND_PORT}

# Start the NestJS application
CMD ["npm", "run", "start"]
