FROM node:16.0.0 AS pnpm

LABEL author="Craig Broughton"
LABEL author.email="CRBroughton@posteo.uk"

RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
  npm install -g pnpm@6.27.1

FROM pnpm AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

FROM deps AS builder

WORKDIR /app

RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
  pnpm install --frozen-lockfile \
  | grep -v "cross-device link not permitted\|Falling back to copying packages from store"

COPY . .

FROM builder AS runner

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 3000

CMD ["npm", "run", "dev"]