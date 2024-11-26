# Stage 1: Build the frontend application
FROM node:16 as build

# Set working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application source code and build the app
COPY . ./
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Copy the build files from the previous stage to NGINX's HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
