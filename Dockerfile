FROM node:lts-alpine

# Instala el servidor HTTP de npm de manera global en el contenedor
RUN npm install -g http-server

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y el package-lock.json (si existe) al directorio de trabajo
COPY package*.json ./

# Crea un directorio diferente para la instalación de los módulos npm
RUN mkdir -p /usr/src/node_modules && \
    ln -s /usr/src/node_modules /usr/src/app/node_modules

# Instala los módulos npm utilizando el package.json
RUN npm install

# Copia todos los archivos del contexto de construcción al directorio de trabajo en el contenedor
COPY . .

# Ejecuta el comando para construir la aplicación (suponemos que este comando es para construir tu aplicación)
RUN npm run build

# Expone el puerto 8080 para acceder a la aplicación desde fuera del contenedor
EXPOSE 8080

# Comando que se ejecuta al iniciar el contenedor, inicia el servidor HTTP para servir la aplicación
CMD [ "http-server", "dist" ]
