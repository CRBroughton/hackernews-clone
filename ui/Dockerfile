FROM node:16.0.0

LABEL author="Craig Broughton"
LABEL author.email="CRBroughton@posteo.uk"

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ADD . .

RUN npm i --legacy-peer-deps

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 4000

CMD ["npm", "run", "dev"]