FROM node:18

WORKDIR /app

# Copia dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto de NestJS en desarrollo
EXPOSE 3001

# Comando de desarrollo (con hot-reload si usas ts-node-dev o similar)
CMD ["npm", "run", "start:dev"]
