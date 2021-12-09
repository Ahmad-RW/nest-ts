
#-- Multi Stage building
#-- Build and install deps stage
FROM node:14-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY --chown=node:node .. /home/node
RUN npm i
RUN npm run build


# --- setting deps and running prod

FROM node:14-alpine

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/dist/ /home/node/dist/
COPY --from=builder /home/node/tsconfig.json /home/node/
COPY --from=builder /home/node/tsconfig.build.json /home/node/