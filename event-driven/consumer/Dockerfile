FROM eclipse-temurin:17.0.6_10-jre-alpine

COPY build/libs/*.jar /app/application.jar
RUN addgroup -S spring && adduser -S spring -G spring

WORKDIR /app
USER spring:spring
RUN ls
CMD [ "tail", "-f",  "/dev/null"]
