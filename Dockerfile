# Stage for build application
FROM node:14.15.5-alpine3.13 as ng-app
ARG configuration="production"
ENV configuration="${configuration}"
WORKDIR /app-angular
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --silent
COPY ["./src", "./src/"]
COPY ["tsconfig*", "angular.json", "./"]
RUN npm run ng build -- --configuration=$configuration

# Stage for deploy and hosting application
FROM nginx:alpine
COPY --from=ng-app /app-angular/dist /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/nginx.conf
