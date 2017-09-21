ARG VCS_REF
ARG BUILD_DATE
ARG NODE_VERSION

FROM node:alpine:$NODE_VERSION

LABEL org.label-schema.name="greenkeeper-keeper" \
      org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.vcs-url="e.g. https://github.com/greenkeeper-keeper/reference-instance" \
      org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.schema-version="1.0.0-rc.1"

ENV NODE_ENV=production

COPY . .
EXPOSE 8080
RUN npm install --dev
RUN npm run build
RUN npm prune --production

CMD ["npm", "start"]
