# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.19

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV=development

RUN npm install -g @angular/cli

WORKDIR /app

# Copier le package.json et le package-lock.json, et installer les dépendances
COPY package*.json ./
# RUN npm ci
RUN npm install

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 4200

# Run the application.
# CMD ng serve --host 0.0.0.0 --poll 2000
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]