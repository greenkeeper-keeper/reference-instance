ARG VCS_REF
ARG VCS_URL
ARG BUILD_DATE
ARG NODE_VERSION
ARG VERSION

FROM mhart/alpine-node:$NODE_VERSION

LABEL org.label-schema.name="greenkeeper-keeper" \
      org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.vcs-url="${VCS_URL}" \
      org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.schema-version=${VERSION}

ENV NODE_ENV=production

COPY . .
EXPOSE 8080
RUN npm install --dev
RUN npm run build
RUN npm prune --production

CMD ["npm", "start"]
