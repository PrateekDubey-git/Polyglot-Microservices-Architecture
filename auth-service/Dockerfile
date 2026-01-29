# Base Java image
FROM eclipse-temurin:21-jre

# App directory
WORKDIR /app

# JAR copy
COPY target/*.jar app.jar

# Port expose
EXPOSE 8080

# Run app
ENTRYPOINT ["java","-jar","app.jar"]
