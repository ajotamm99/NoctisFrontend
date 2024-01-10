FROM node:alpine

RUN mkdir -p /usr/src/
WORKDIR /usr/src/

# Copia solo los archivos necesarios para ejecutar el servidor

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

# Inicia el servidor de Next.js
CMD npm run start
