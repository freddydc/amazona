# --> Build Image.
FROM node:14-alpine AS builder
WORKDIR /usr/src/frontend
COPY ["package*.json", "./"]
# RUN npm install --only=production
RUN npm install
COPY [".", "./"]
# RUN npm install --only=development
# RUN npm run test

# --> Production Image.
FROM node:14-alpine
WORKDIR /usr/src/frontend
COPY --from=builder ["/usr/src/frontend", "./"]
EXPOSE 3000
CMD ["npm", "start"]
