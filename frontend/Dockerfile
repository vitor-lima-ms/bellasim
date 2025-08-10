# --- Estágio 1: Builder ---
# Usamos uma imagem Node.js para instalar as dependências e construir o projeto
FROM node:18-alpine AS builder

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia package.json e o arquivo de lock (package-lock.json ou yarn.lock)
COPY package*.json ./

# Instala todas as dependências do projeto
RUN npm install

# Copia todo o resto do código-fonte para o contêiner
COPY . .

# Roda o comando de build para gerar os arquivos estáticos na pasta /dist
RUN npm run build


# --- Estágio 2: Runner ---
# Usamos uma imagem Nginx super leve para servir os arquivos estáticos
FROM nginx:stable-alpine

# Copia os arquivos da pasta 'dist' do estágio anterior para a pasta padrão do Nginx que serve conteúdo web
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia o nosso arquivo de configuração para o local onde o Nginx o lê,
# substituindo o arquivo de configuração padrão.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80, que é a porta padrão que o Nginx escuta
EXPOSE 80

# O comando para iniciar o Nginx já vem configurado na imagem base, não precisamos adicionar um CMD.