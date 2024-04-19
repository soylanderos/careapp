# Usar una imagen base de Node.js
FROM node:16 AS build

# Configurar el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm ci

# Copiar el resto de los archivos
COPY . .

# Construir la aplicación Ionic
RUN npm run build

# Usar una imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Copiar el contenido de build a la carpeta de contenido de Nginx
COPY --from=build /usr/src/app/www /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Configurar el punto de entrada
CMD ["nginx", "-g", "daemon off;"]
