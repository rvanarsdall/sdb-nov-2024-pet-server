/* 
Middleware:
We want this middleware to authenticate requests to our server..
It will evaluate the sessionToken in the request header.
If the token is valid, it will allow the request to continue to the intended endpoint.
If the token is invalid, it will return a 401 status code and a message.

*/

const jwt = require("jsonwebtoken");
const User = require("../model/users.model");

const validateSession = async (req, res, next) => {
  try {
    // 1. Extract the token from the header
    const token = req.headers.authorization;
    console.log(token);
    // 2. validate the token and make sure it is not expired
    const decodedToken = jwt.verify(token, "secret");
    console.log(decodedToken);
    // 3. Check the database to verify that you are an active user. We will use the "user" model.

    const user = await User.findById(decodedToken.id);

    //4. if the user doesn't exist throw an error

    if (!user) {
      throw Error("User Not Found");
    }
    // 5. create a new key on the req object called user

    req.user = user;

    return next();
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = validateSession;
