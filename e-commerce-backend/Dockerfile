# 🧱 Stage 1: Build the Spring Boot application using Maven
FROM maven:3.9.4-eclipse-temurin-17 as builder  # Use Maven with Java 17 (Temurin) for building the app
WORKDIR /app                                   # Set the working directory inside the container to /app
COPY . .                                       # Copy all files from the current host directory into /app in the container
RUN mvn clean package -DskipTests              # Build the Spring Boot app and skip tests for faster build (outputs a JAR in /target)

# 🚀 Stage 2: Run the Spring Boot application with a lightweight JDK
FROM eclipse-temurin:17-jdk                    # Use a base image with Java 17 JDK (Temurin) for running the app
WORKDIR /app                                   # Set working directory inside the container to /app
COPY --from=builder /app/target/*.jar app.jar  # Copy the built JAR file from the builder stage into this image as app.jar
EXPOSE 8080                                    # Expose port 8080 (default Spring Boot port) for Docker networking
ENTRYPOINT ["java", "-jar", "app.jar"]         # Run the Spring Boot application using the JAR file
