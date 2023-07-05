FROM node:16.0.0
WORKDIR /app
COPY ./package-lock.json /app/package-lock.json
COPY ./package.json /app/package.json
RUN npm i 
COPY . /app
CMD ["node","-v"]