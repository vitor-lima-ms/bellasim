# Dockerfile

# --- Estágio 1: Builder ---
# Usamos uma imagem Node.js completa para instalar dependências e compilar o código
FROM node:18-alpine AS builder

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de definição de pacotes
COPY package*.json ./

# Instala TODAS as dependências (incluindo as de desenvolvimento)
RUN npm install

# Copia todo o resto do código do projeto para o contêiner
COPY . .

# Gera o cliente do Prisma
RUN npx prisma generate

# Compila o código TypeScript para JavaScript
RUN npm run build

# --- Estágio 2: Runner ---
# Usamos uma imagem Node.js limpa e leve para rodar a aplicação
FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache curl

# Copia apenas as dependências de produção do estágio 'builder'
COPY --from=builder /app/node_modules ./node_modules

# Copia o código JavaScript compilado do estágio 'builder'
COPY --from=builder /app/dist ./dist

# Copia o schema do Prisma para que o cliente possa encontrá-lo em tempo de execução
COPY --from=builder /app/prisma ./prisma

# Expõe a porta que a aplicação usará
EXPOSE 3000

# O comando para iniciar a aplicação
CMD ["node", "dist/server.js"]