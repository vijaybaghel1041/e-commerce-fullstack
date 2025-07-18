# 🏗️ Stage 1: Build Angular application using Node.js
FROM node:20-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json separately first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Angular app in production mode
RUN npm run build --configuration production

# 🚀 Stage 2: Serve the Angular app using Nginx
FROM nginx:stable-alpine

# Replace default Nginx config to support Angular HTML5 routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy Angular dist output to Nginx public directory
COPY --from=build /app/dist/e-commerce-frontend/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
