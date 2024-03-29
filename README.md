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

Section III. Authentification frontend

14. Let's setup react router dom
    I. frontend->npm i react-router-dom
    II. add {BrowserRouter} in index.js & {Router,Routes} in App.js
    III. create pages->login->index.js & style.css
    IV. create pages->profile->index.js & style.css
    V. create pages->Home->index.js & style.css
    VI. import <Home/>,<Login/> & <Profile/> in App.js
    VII. test pages

15. React Redux store
    I. npm i redux react-redux redux-devtools-extension
    II. create index.js-> store, import the Provider & composeWithDevTools
    III. create reducers->index.js
    IV. create userReducer.js

16. Login and Register Part 1
    I. npm i formik yup
    II. create Login fors with Formik
    III. style the <Login/>
    III. create components->inputs-> <LoginInput/>
    IV. style the <LoginInput/>

17. Login and Register Part 2
    I. style the <LoginInput/> used in <Login/>

18. Login and Register Part 3
    I. create validationSchema in <Login/> using Formik
    II. import Yup for validate form data
    III. create loginValidation function
    IV. handle the error in ...inputs->loginInput
    V. setting error from manifest.json
    VI. add bottom in <Login/> attribute to handle displaying error

19. Login and Register Part 4 (responsiveness)
    I. add a breakPoint in pages->login->style.css
    II. npm i react-responsive
    III. import { useMediaQuery } from 'react-responsive' <LoginInput/>
    IV. create desktopView const & add it in the <LoginInput/>

20. Login and Register Part 5 (Footer)
    I. create components->login-> <Footer/>
    II.style the component
    III. create components-login-><LoginForm/>(C&P login content) & <Footer/>
    IV. import <LoginForm/> & <Footer/> in login
    V. style the <Footer/>

21. Register form
    I. create component->login-><RegisterForm/>
    II.update index.css file
    III. import pages->login->index.js-><RegisterForm/>.
    IV. create components->inputs-><RegisterInput/>
    V.style the <RegisterForm/>

22. Working with dates for birthday
    I. <RegisterForm/>

        I. extract all the user information
        II. set current year,month and day in userInfos.
        III. create const years array & show all years in the input.
        IV. create const months array to show all month
        V. create getDays() & const days array to show all days.

23. Register form validation
    I. <RegisterForm/>
    <Formik>
    I. Define initialValues props
    II. add enableReinitialize props
    III. create validationSchema props using Yup

24. Register form error handling

    <RegisterForm/>
        I. add style <RegisterForm/>
        II. remove props bottom && add register_input_wrap

    <RegisterInput/>
        I. add style <RegisterInput/>
        II. create view constant breakPoint and replace desktopView
        III. create test variables

25. Finish register error handling and fix errors
    <RegisterInput/> -> <Formik>
    I. add onSubmit method to validate user age & gender using if statement.
    II. add date and Gender States to manage errors
    III. create components->login-> <GenderSelect/>
    IV. create components->login-> <DateOfBirthSelect/>
    V.style <DateOfBirthSelect/> & <GenderSelect/>

26. Register Submit
    I. create registerSubmit() in <RegisterForm/>
    II.add {error,success,loading} states & npm i axios in frontend
    III. add backend url in .env file
    IV. retrieve error & success from the backend & display it
    V. style error and success
    VI.npm i react-spinners et use it (https://www.davidhu.io/react-spinners/)
    VII. fill registerSubmit()
    VIII. try the script

27. Add the backend information to userReducer
    I. retrieve backend info without message
    II. set setTimeout & dispatch the data in the store using LOGIN action
    III. use js-cookie to persist user informations in the store.

28. Login Submit
    I. define state in pages->login->index.js
    II. pass setVisible proprety to the <LoginForm/> & <RegisterForm/>
    III. create loginSubmit()
    IV. add spinners after the form and manage error.

Section IV. Header

29. Header base Part 1
    I. create components->header->index.js-><Header/> & style.css
    II. import <Header/> in App.js

30. Header base Part 2
    I. add header_right content and style it
    II. select user from the store and create a conditional rendering

31. CLick outside and element and close
    I. add <Header/> -> <Home/>
    II. create helpers->[useClickOutside] hook

32. Search Menu
    I. create header-><SearchMenu/> & style it
    II. add states showSearchMenu to the <Header/>
    III. add a conditional rendering to <SearchMenu/>
    IV.add [useClickOutside] to <SearchMenu/> & pass setShowSearchMenu
    V. create input ref and iconVisible state in <SearchMenu/>
    VI. add useEffect to set onFocus when the component mount

33. All Menu
    I. components->header->AllMenu.jsx
    II. add AllMenu in <Header/>
    III. create <AllMenuItem/>
    IV. create src->data->allMenu.js
    V. import { menu, create } from data/allMenu
    VI. style the <AllMenu/> & manage it's state (useState,useRef,useClickOutside)

34. User menu part 1
    I. create header->userMenu.jsx
    II. import <userMenu/> in <Header/> & pass the user
    III. style the <userMenu/>
    IV. create usermenu folder,paste <userMenu/> & renmane it
    V. create <SettingsPrivacy/>

35. User menu part 2
    I. Update <SettingsPrivacy/> and manage the it's visibility
    II. create <HelpSupport.js/>
    III. create <DisplayAccessibility/>

36. Responsive Header
    I. add mediaqueries to the header->style.css

37. Finish Header and fix issues
    I. add active_header style
    II. add conditional rendering to active_header
    III/ add a forgot key at last mapping element in <allMenu/>

Section V. Home

38. Protected routes (very important !
    I. create routes-><LoggedInRoutes/> to check if the user exists in the store
    II. create routes-><NotLoggedInRoutes/> to redirect the logged user at homePage
    III. create nested protected routes in App.js using <LoggedInRoutes/> & NotLoggedInRoutes

39. Left home menu (update LeftHome information)
    I. create components->home->left->index.jsx-> <LeftHome/> & style.css
    II. import <LeftHome/> to the <Home/> & pass the {user} info as a props
    III. create src->data->home.js
    IV. create <LeftLink/>
    V. create <Shortcut/>

40. Right home side
    I. create components->home->right->index.jsx-> <RighttHome/> & style.css
    II. import <RighttHome/> to the <Home/> & pass the {user} info as a props
    III. create right-><Contact>
    IV. Fix the <Header/> position

41. Let's work on stories
    I. create components->home->stories->index.jsx-> <Stories/> & style.css
    II.create components->home->stories-><story/>
    III. import <Stories> to the <Home/>
    IV.add data src->data->home.js
    V. Stylize the <Home/> component and make it responsive

42. Create post form
    I. create components->createPost->index.jsx-> <CreatePost /> & style.css
    II. import <CreatePost> to the <Home/>

43. Update Responsive home advanced
    I. update home->left->style.css

Section VI. Forgot ,reset password,activate account,logout

44. Authentification middlware
    I. create auth route and controller in user.js
    II. create middlwares->auth.js & add it in auth route.

45. Activate account part 1
    I. create pages->home->activate.js && App.js
    II. <Activate/>

            I. create [success, setSuccess],[error, setError] & [loading, setLoading]
            II. create <ActivateForm/> && <Activate/>
            III. retrieve the token from URL using useParams
            IV. style <ActivateForm/>

46. Activate account part 2
    I. use useEffect & add activateAccount
    II. update <ActivateForm/>
    III. dispatch VERIFY action, setTimeout() & redirect to <Home/>
    IV. test all verification process using a new user

47. Activate Account and fix a security risk
    I. add a if statement to secure activateAccount in user controller.

48. re-Send verification code
    I. create sendVerification route and controller in user.js
    II. create components->home-><SendVerification/> && App.js
    III.add a conditional rendering in pages->home->index.js

49. Logout
    I. add logout case in userReducer
    II.<userMenu/>

            I. add onClick event in logout tag.
            II. create logout()

50. Reset password part 1
    I. pages->reset-><Reset/> && App.js
    II. add reset Link in <LoginForm/>
    III. update <Reset/>

51. Reset password part 2
    I. update style.css
    II. create [visible, setVisible]
    III. create <searchAccount/> && <Reset/>
    IV. create <SendEmail/>
    V. create <CodeVerification>

52. Reset password part 3
    I. Change <ChangePassword/> && <Reset/>
    II. work on responsiveness style.css

53. Reset password part 4
    I. update <LoginInput/>

54. Find user
    I. create findUser route and controller in user.js
    II.<searchAccount/> && create handleSearch()

55. Send reset code email
    I. create code model
    II. create helpers->mailer->sendResetCode().
    III. create findUser route and controller in user.js
    IV. <SendEmail/> && sendEmail()

56. Validate reset code email
    I. create validateResetCode route and controller in user.js
    II. create verifyCode() -> <CodeVerification/>

57. Change password
    I. create changePassword route and controller in user.js
    II. create changePassword() -> <ChangePassword/>

Section VI. Create,Post,Cloudinary,emojis...etc

58. Create post popup
    I. create component->CreatePostPopup-><CreatePostPopup/> & style.css

59. Emoji picker
    I. <CreatePostPopup/>

            I. npm i emoji-picker-react
            II. use handleEmoji()

60. Reactoring,add to your post ,post
    I. create <EmojiPickerBackgrounds/>,<AddToYourPost/> <ImagePreview/>
    II. update style.css file

61. Preview Images part 1
    I. <ImagePreview/>

62. Preview Images part 2
    I. <ImagePreview/>

            I. user input & add a useRef in it
            II. create handleImages()
            III. pass images & setImages as a props
            IV. add conditional rendering to see if we have images or not?
            V. update style.css file.

63. Preview Images part 3 ( images grid structure))
64. Post model + create post function
65. Upload Images to Cloudinary part 1
66. Upload Images to Cloudinary part 2
67. Post backgrounds
68. Hide-open click outside popup
69. Submit Post with background + loader
70. Error popup & error handling
71. Upload images and submit post
72. Finish post submit fixing errors,validation
