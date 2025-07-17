# 🏗️ Stage 1: Build Angular application using Node.js
FROM node:20-alpine as build        # Use a lightweight Node.js v20 Alpine image for building the Angular app
WORKDIR /app                        # Set the working directory inside the container to /app
COPY . .                            # Copy all files from current directory on host to /app in the container
RUN npm install                     # Install all npm dependencies defined in package.json
RUN npm run build --prod            # Build the Angular app in production mode (output goes to /app/dist/...)

# 🚀 Stage 2: Serve the Angular app using Nginx
FROM nginx:stable-alpine           # Use a stable version of Nginx on Alpine for serving static files
COPY --from=build /app/dist/* /usr/share/nginx/html # Copy built Angular app from previous stage to Nginx's web root
EXPOSE 80                          # Expose port 80 so Docker knows this container serves on HTTP
CMD ["nginx", "-g", "daemon off;"] # Run Nginx in the foreground (required for Docker to keep the container alive)
