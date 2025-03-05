const router = require("express").Router();
// 1. Import your model
const User = require("../model/users.model");
// Import bcrypt for password hashing
const bcrypt = require("bcrypt");
// Import jsonwebtoken for creating a token
const jwt = require("jsonwebtoken");

/* 
Endpoint: "localhost:4000/user/register"
Request Type: POST
1 - Create variables to store the data coming in from the req.body
2 - Create a new User Model Object
3 - Save the Data created from the User Model
4 - Send back the User Information 
*/

router.post("/register", async (req, res) => {
  try {
    // 1. Destructure the request body
    const { firstname, lastname, password, email } = req.body;
    // 2. Test your destructuring
    console.log(firstname);
    // 3. create a variable and use the User Model to create a new user

    const user = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: bcrypt.hashSync(password, 10), // hashing the password
    });

    // 4. save the new user in the database and store the response in a variable

    const newUser = await user.save();

    // 5. Create a Token three parameters (what do you want stored in it, secret_word, options like expiring))
    const token = jwt.sign({ id: newUser._id }, "secret", { expiresIn: "45d" });

    // 6. Update your res.json with the newUser that was saved and the token that was created

    res.json({ message: `route works`, user: newUser, sessionToken: token });
  } catch (error) {
    res.json({ message: error.message });
  }
});

/* 
Endpoint: localhost:4000/user/signin
Type: POST
1- create variables that will store the email and password
2- see if the user exists and if does....
3- check the password and if it doesn't... throw and error "user not found"
*/
router.post("/signin", async (req, res) => {
  try {
    // 1. destructure the req.body
    const { email, password } = req.body;
    // 2. check the database to see if the email exists
    const user = await User.findOne({ email: email });
    console.log(user);
    // 3. write an if statement if it's null to throw an error
    if (!user) {
      throw new Error("User Not Found");
    }
    //  4. Check the password

    // const isPasswordCorrect = password === user.password;
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    console.log(isPasswordCorrect);
    // 5. write an if statement if password is not correct throw an error

    if (!isPasswordCorrect) {
      throw new Error("Password not a match");
    }

    // 6. Create the token
    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "45d" });

    //  7. Update your res.json with token

    res.json({ message: `route works`, sessionToken: token });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
