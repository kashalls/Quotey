FROM node:current

ARG buildno
ARG commitsha

LABEL maintainer="Jordan Jones <info@kashall.dev>" \
      repository="https://github.com/Kashalls/Quotey"

RUN mkdir /opt/quotey
# Copy files and install modules
COPY . /opt/quotey
WORKDIR /opt/quotey
RUN npm ci --production

CMD ["node", "."]