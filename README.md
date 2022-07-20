Section I. Setup Project

1. Add all folders
   I. create frontend & npx create-react-app
   II. add all files we need
   III. create backend folder in root folder
   IV. npm init -y,npm i expess mongoose morgan dotenv
   V.create a server
2. cors (cross origin ressource sharing)
   I.npm i cors
   II. add cors options
   III.npm i axios in frontend folder
   IV. test cors

3. setup routes
   I. create routes folder
   II. import express & add C&P routes from server.js
   III import userRoutes in server.js
   IV. create controllers folder

4. variable d'environnements
   I. create .env file & add PORT
   II. import dotenv in server.js

5. MongoDB configuration
   I. add MongoDB url in .env
   II. import mongoose in server.js & add connection to the MongoDB.

6. working with JSON
   I. import JSON in server.js
   II. replace res.send by res.json in routes & controllers folder

Section II. Authentication and sending emails (backend)

7. User Modal
   I. create model->User.js

8. Register and validate data & using Regex to validate email
   I. create userRoutes
   II. create helpers->validation
   III. create register controllers
   IV. test the script in Postman
