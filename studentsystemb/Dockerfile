# syntax=docker/dockerfile:1

# ===== Build (JDK 21 + Maven) =====
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Cache de dependencias
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 mvn -q -DskipTests dependency:go-offline

# Código fuente
COPY src ./src
RUN --mount=type=cache,target=/root/.m2 mvn -q -DskipTests clean package

# ===== Run (JRE 21) =====
FROM eclipse-temurin:21-jre
WORKDIR /app

# Ajustes de JVM y puerto dinámico de Render
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75 -Dserver.port=${PORT}"

# Copia el jar generado
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
CMD ["java","-jar","/app/app.jar"]
