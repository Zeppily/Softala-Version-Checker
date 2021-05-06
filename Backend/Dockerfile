# Base Image
FROM node:14

# Work directory
WORKDIR /backend

# Installling App dependencies (Wildcard for both package + lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy over the code
COPY . .

# Migrate Database (creates)
RUN npm install -g sequelize-cli

# Port Forward
EXPOSE 8000

# Start the server
CMD cd api/ | npx sequelize-cli db:migrate | npm start