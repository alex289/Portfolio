FROM node:16-alpine

WORKDIR /usr/app

COPY ./ ./

RUN npm i pnpm -g
RUN pnpm i --frozen-lockfile

RUN pnpm prisma generate
RUN pnpm build

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

USER node

CMD ["pnpm", "start"]