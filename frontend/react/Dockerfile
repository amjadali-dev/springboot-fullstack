FROM node:19-alpine
ARG API_BASE_URL
WORKDIR /app
COPY package*.json .
RUN npm i --silent
COPY . .
RUN echo "VITE_API_BASE_URL=${API_BASE_URL}">.env
EXPOSE 5173
CMD ["npm","run","dev"]
