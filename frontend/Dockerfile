FROM node:18

WORKDIR /app

# Copia dependencias primero
COPY package*.json ./

# Instala todas las dependencias (no solo las de prod)
RUN npm install --legacy-peer-deps

# Copia el resto del código
COPY . .

# Expone el puerto usado por Vite en desarrollo
EXPOSE 5173

# Comando de desarrollo
CMD ["npm", "run", "dev", "--", "--host"]
