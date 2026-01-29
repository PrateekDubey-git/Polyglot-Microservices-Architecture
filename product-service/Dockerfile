FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies inside the container
RUN npm install --production

# Copy the rest of the app (The .dockerignore will now skip node_modules)
COPY . .

# Set Environment Variables
ENV PORT=5002
ENV NODE_ENV=development
ENV MONGO_URI=mongodb+srv://devtesta9211_db_user:3yEisAreUtSdcGpd@cluster0.vkhymgf.mongodb.net/creative_product

EXPOSE 5002

CMD [ "node", "src/server.js" ]