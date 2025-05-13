# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port 3000 (adjust as per your application's port)
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
