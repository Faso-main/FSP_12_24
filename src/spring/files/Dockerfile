FROM openjdk:17-jdk-slim AS build
WORKDIR /app

COPY gradlew gradlew
COPY gradle gradle
COPY build.gradle build.gradle
COPY settings.gradle settings.gradle
COPY src src

RUN chmod +x gradlew
RUN ./gradlew build -x test


FROM openjdk:17-jdk-slim
WORKDIR /app

COPY --from=build /app/build/libs/*.jar files.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "files.jar"]
