## Libraries

## Front-end
- **react** - The app's front-end was built primarily in React as per the assignment specifications. React provides a reactive user interface through JavaScript and JSX.
- **axios** - This library is for making HTTP requests. It was used as a more compact way of writing requests than using fetch, and also because creating an Axios instance makes it easy to include login tokens for every request to the server.
- **react-mic** - This library allows the user to start and stop recording audio from the microphone, and stores the audio to allow the app to process it.
- **redux** and **react-redux** - Redux is a framework that provides a central "store" of values that can be accessed and modified from anywhere in the app. This negates the need for unnecessary props being passed down a line of React components.
- **universal-cookie** - This library provides a way to store and retrieve cookies for a React app.

## Back-end
- **express** - The server was built primarily in Express as per the assignment specifications.
- **aws-sdk** - This is a library used for interaction with AWS storage. It allows files to be processed and uploaded to an S3 bucket on AWS.
- **bcrypt** - This is an encryption library used for user passwords. It allows submitted passwords to be stored as hashes, and can compare login credentials to the hashed passwords.
- **cookie-parser**
- **cors** - This library prevents CORS policy from blocking incoming requests from the front-end.
- **dotenv** - This library allows access to environment variables, so that sensitive information such as secret keys and database passwords are not visible in code.
- **http-errors**
- **jsonwebtoken** - This app uses JSON web tokens for user authentication. Upon successful login, a JWT is generated and returned, to be used as an authorization header for future requests to the server.
- **mongoose** - This library is used to interact with the MongoDB database used in the app. Mongoose is used to specify schema validations as well as retrieve and update data in the database.
- **mongoose-unique-validator** - This library is used to add a uniqueness validator to Mongo schema fields . The user's email address is used as a login credential, so it is essential
- **jest**