# Use the official Node image as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /LessonPlan/my_app

# Copy package.json and package-lock.json into the container at /app
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code into the container at /app
COPY . .


# Build the React app
RUN npm run build

# Expose the port that the React app will run on
EXPOSE 2021

# Start the React app
CMD ["npm", "start"]
