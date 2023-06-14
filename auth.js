const jwt = require("jsonwebtoken");

// User defined string data that will be used to create our JSON web token
// Used is the algorithm for encrypting our data which make difficult to decode the information without the defined secret code
const secret = "TourBookingAPI";

// [Section] JSON Web Tokens
/*
- JSON Web Token or JWT is a way of securely passing information from the server to the frontend or to other parts of server
- Information is kept secure through the use of the secret code
- Only the system that knows the secret code can decode the encrypted information

- Imagine JWT as a gift wrapping service that secures the gift with a lock
- Only the person who knows the secret code can open the lock
- And if the wrapper has been tampered with, JWT also recognizes this and disregards the gift
- This ensures that the data is secure from the sender to the receiver
*/

// Token creation
// Analogy: Pack the gift and provide a lock with the secret code as the key
module.exports.createAccessToken = (user) => {

  // The data will be received from the registration form
  // When the user logs in, a token will be created with the user's information
  // payload
  const data = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin
  };

  // Generate a JWT using the jwt's sign method
  /*
    Syntax:
    jwt.sign(payload, secret, {options/callBackFunctions})
  */
  return jwt.sign(data, secret, {});
}

module.exports.verify = (req, res, next) => {
  let token = req.headers.authorization;

  if (token !== undefined) {
    console.log(token);

    token = token.slice(7, token.length);

    jwt.verify(token, secret, (err, data) => {
      if (err) {
        return res.send({ auth: "failed" });
      } else {
        // Check if the user is an admin
        const isAdmin = data.isAdmin;

        if (isAdmin) {
          next(); // Proceed to the next middleware or route handler
        } else {
          return res.send({ auth: "failed", message: "Not authorized as admin" });
        }
      }
    });
  } else {
    return res.send({ auth: "failed", message: "Missing token" });
  }
};


// Token decryption
// Analogy: Open the gift and get the content
module.exports.decode = (token) => {

  if(token !== undefined) {

    token = token.slice(7, token.length);

    return jwt.verify(token, secret, (err, data) => {

      if(err) {

        return null;
      } else {
        return jwt.decode(token, {complete:true}).payload;
      }
    }) 
  } else {
    return null;
  }
}

module.exports.authenticate = (req, res, next) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      console.log(error);
      res.send({ message: "Error occurred" });
    });
};
  