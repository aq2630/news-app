# News App

This is a simple News Articles Application built with React and TypeScript. It fetches data from three different sources:

- NewsAPI
- The Guardian
- The New York Times

News Application has Side Drawer which shows Filters and Personalisation Options for the User to filter the News Articles based on Specific Categories and Authors. User can also select Date Ranges to filter out the Articles in between specific dates.
User can also search for specific keywords to fetch the desired News Articles.

## Running the Application

### With Docker

#### Prerequisites

- Docker installed on your machine
- Docker Compose installed on your machine

#### Steps

1. **Build and Run the Container**

   ```bash
   # Using Docker Compose (recommended)
   docker-compose up --build

   # OR using Docker directly
   docker build -t news-app .
   docker run -p 3000:3000 news-app

   ```

2. **project will be running on localhost:3000**

### locally withiout Docker

#### Steps

1. clone the project from github
2. go into the project folder
3. create .env file in the root directory of the project folder with below variables

   ```bash
    VITE_NEWSAPI_API_KEY=newsapi_key
    VITE_GUARDIAN_API_KEY=guardian_api_key
    VITE_NYTIMES_API_KEY=nytimes_api_key

   ```

4. run the below commands

   ```bash
   npm install
   # OR
   yarn

   ```

5. run the below commands

   ```bash
   npm run dev
   # OR
   yarn dev

   ```

6. **project will be running on localhost:5173**
