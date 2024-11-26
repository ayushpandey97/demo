# Stage 1: Build the JAR file
FROM maven:3.9.4-eclipse-temurin-17-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files for dependency resolution
COPY pom.xml ./
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime image
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/librarymanagement-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your Spring Boot app is running on
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
