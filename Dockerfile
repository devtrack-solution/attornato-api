# Use uma imagem base Node.js
FROM node:20-alpine

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie os arquivos de dependências para aproveitar o cache do Docker
COPY package*.json pnpm-lock.yaml yarn.lock ./

# Instale as dependências
# RUN yarn install
# ou, se usar npm:
# RUN npm install
RUN npm run prepare:setup
RUN pnpm install

# Copie o restante do código-fonte
COPY . .

# Construa a aplicação NestJS
# RUN yarn build
# ou:
# RUN npm run build
RUN pnpm build

# Exponha a porta usada pela aplicação
EXPOSE $API_PORT || 3000

# Comando padrão para iniciar a aplicação em produção
#CMD ["yarn", "start:prod"]
# ou:
# CMD ["npm", "run", "start:prod"]
CMD ["pnpm", "start:prod"]