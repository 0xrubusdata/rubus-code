# Use an official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the frontend port
EXPOSE $FRONTEND_PORT

# Start Next.js
CMD ["sh", "-c", "if [ \"$NODE_ENV_FRONTEND\" = \"development\" ]; then npm run dev; else npm run start; fi"]

