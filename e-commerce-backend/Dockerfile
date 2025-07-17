# 🧱 Stage 1: Build the Spring Boot application using Maven
# Use Maven with Java 17 (Temurin) for building the app
FROM maven:3.9.4-eclipse-temurin-17 AS builder

# Set the working directory inside the container to /app
WORKDIR /app

# Copy all files from the current host directory into /app in the container
COPY . .

# Build the Spring Boot app and skip tests for faster build (outputs a JAR in /target)
RUN mvn clean package -DskipTests

# 🚀 Stage 2: Run the Spring Boot application with a lightweight JDK
# Use a base image with Java 17 JDK (Temurin) for running the app
FROM eclipse-temurin:17-jdk

# Set working directory inside the container to /app
WORKDIR /app

# Copy the built JAR file from the builder stage into this image as app.jar
COPY --from=builder /app/target/*.jar app.jar

# Expose port 8080 (default Spring Boot port) for Docker networking
EXPOSE 8080

# Run the Spring Boot application using the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
