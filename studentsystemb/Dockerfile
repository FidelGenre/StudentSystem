# ===== Build stage (JDK 25 + Maven) =====
FROM eclipse-temurin:25-jdk AS build
ENV MAVEN_VERSION=3.9.9
ENV MAVEN_HOME=/opt/apache-maven-${MAVEN_VERSION}
ENV PATH=$MAVEN_HOME/bin:$PATH

# Instalar Maven manualmente
RUN apt-get update && apt-get install -y curl tar \
 && curl -fsSL https://archive.apache.org/dist/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.tar.gz \
 | tar -xz -C /opt \
 && ln -s ${MAVEN_HOME}/bin/mvn /usr/bin/mvn \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -q -DskipTests clean package

# ===== Run stage (JDK 25 también) =====
FROM eclipse-temurin:25-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

ENV JAVA_OPTS="-Dserver.port=${PORT}"
EXPOSE 8080
CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
