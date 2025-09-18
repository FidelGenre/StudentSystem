# ===== Build =====
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -q -DskipTests clean package

# ===== Run =====
FROM eclipse-temurin:17-jre
WORKDIR /app
# Copia el jar generado (ajustá el nombre si cambia)
COPY --from=build /app/target/*.jar app.jar

# Render te pasa $PORT; forzamos Spring a usarlo
ENV JAVA_OPTS="-Dserver.port=${PORT}"
EXPOSE 8080
CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
