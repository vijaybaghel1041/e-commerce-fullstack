# 🏗️ Stage 1: Build Angular application using Node.js
# Use a lightweight Node.js v20 Alpine image for building the Angular app
FROM node:20-alpine AS build

# Set the working directory inside the container to /app
WORKDIR /app

# Copy all files from current directory on host to /app in the container
COPY . .

# Install all npm dependencies defined in package.json
RUN npm install

# Build the Angular app in production mode (output goes to /app/dist/<project-name>)
RUN npm run build --prod

# 🚀 Stage 2: Serve the Angular app using Nginx
# Use a stable version of Nginx on Alpine for serving static files
FROM nginx:stable-alpine

# Replace default Nginx website config (optional, for Angular routing support)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built Angular app from previous stage to Nginx's web root
COPY --from=build /app/dist/e-commerce-frontend/ /usr/share/nginx/html

# Expose port 80 so Docker knows this container serves on HTTP
EXPOSE 80

# Run Nginx in the foreground (required for Docker to keep the container alive)
CMD ["nginx", "-g", "daemon off;"]
