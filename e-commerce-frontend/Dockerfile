# 🏗️ Stage 1: Build Angular application using Node.js
FROM node:20-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy only package files to leverage cache and speed up builds
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application source code
COPY . .

# ✅ Correct build command using double dash to separate npm and Angular CLI args
RUN npm run build -- --configuration=production

# 🚀 Stage 2: Serve the Angular app using Nginx
FROM nginx:stable-alpine

# Replace default Nginx config to support Angular HTML5 routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy Angular build output to Nginx public directory
COPY --from=build /app/dist/e-commerce-frontend/ /usr/share/nginx/html

# Expose port 80 for serving
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
