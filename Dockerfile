# Use the official Node.js 14 image as a parent image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install any dependencies
RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the application
CMD ["node", "index.js"]
