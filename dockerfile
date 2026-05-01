FROM node:20-alpine

RUN apk add --no-cache libc6-compat
WORKDIR /app

ARG OPENROUTER_API_MODEL
ENV RESEND_API_KEY=$RESEND_API_KEY 

COPY package.json package-lock.json* ./

RUN npm install

COPY . .


RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
