FROM ubuntu

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Update package repositories for Ubuntu
RUN apt-get update

# Install some necessary prerequisite packages
RUN apt-get install -y apt-utils curl git-core gnupg2
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

# Install global and local dependencies
RUN npm install -g codecov jest firebase-tools
RUN npm install
RUN npm audit fix

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# What port are we using?
EXPOSE 8080
EXPOSE 8081

# Start the app
# CMD [ "npm", "start" ]

