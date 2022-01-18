FROM node:15.12.0

LABEL author="Craig Broughton"
LABEL author.email="CRBroughton@posteo.uk"

WORKDIR /app

COPY . .

EXPOSE 3000

RUN npm i --legacy-peer-deps && npx prisma generate

CMD ["npm", "run", "docker"]