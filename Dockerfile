# Use node:18.15.0-alpine as base image
FROM node:18.15.0-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Build the application
RUN npm run build

# Expose the port used by the application
EXPOSE 3000

# Define the command to start the application
CMD ["npm", "run","preview"]