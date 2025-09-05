# -------- Build Stage --------
FROM maven:3.9.11-eclipse-temurin-21 AS build
WORKDIR /app

# Copy only the files needed for dependency resolution first (speeds up caching)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code
COPY src ./src

# Build the application JAR
RUN mvn clean package -DskipTests

# -------- Runtime Stage --------
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the JAR
ENTRYPOINT ["java", "-jar", "app.jar"]
