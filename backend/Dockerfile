FROM node:18

WORKDIR /app

# Copiar package.json y package-lock.json si existe
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
