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

7.  User Modal
    I. create model->User.js

8.  Register and validate data & using Regex to validate email
    I. create userRoutes
    II. create helpers->validation
    III. create register controllers
    IV. test the script in Postman

9.  JSON web tokens
    I. npm i jsonwebtoken
    II. create helpers->tokens.js->generateToken()
    III. create .env->TOKEN_SECRET,
    IV. create controllers->users.js emailVerificationToken const
    V. test the script in Postman

10. Setup Google OAuth 2.0 to Access Google APIs
    I. go to google search console (console.cloud.google.com)
    II. create a new project (facebook)
    III. go to API et services -> OAuth consent screen

        I. click on create
        II.  then fill the App information
        III. save and continue
        IV. add a test user

    IV. go to credentials

        I. onClick: create credentials->ID Client 0Auth
        II. define the application type (web application)
        III. add name (facebook) & Authorised javascript origine (http://localhost:3000) & Authorised redirect URIs (https://developers.google.com/oauthplayground/)
        IV. download the information we get

    V. add BASE_URL,EMAIL,MAILING_ID & MAILING_SECRET in env file.
    VI. go to (https://developers.google.com/oauthplayground)

        I. go to settinggs (check : use your own oauth)
        II.  add (https://mail.google.com) in authorised APIs field and validate
        III. select the test count.
        IV. onClick: Exchange authorisation code for tokens.
        V. copy Refresh token & Access token to env file

11. Finish register and send emails

    I. npm i googleapis nodemailer
    II. create helpers->mailer.js
    III. create email.html template & add assets folder
    IV. past html content in html compressor (https://htmlcompressor.com/compressor/) & past the result in mailer.js
    V. create controllers->user.js-> url const
    VI. import {sendVerificationEmail,token }
    VII. go to tempmail (https://temp-mail.org/fr/)
    VIII. delete html file
    IX. create token constant and send response to the frontend
    X. verify process in Postman and tempmail

12. Activate email

    I. import jwt from "jsonwebtoken"
    II. create controllers->user.js->ctivateAccount
    III. tes the script in Postman

13. Login
    I. create loginRoute
    II. create login controller
    III. update activateAccount script
    III. test the script in Postman

Section III.
