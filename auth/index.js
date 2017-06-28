const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../db/signup');

require('dotenv').config();

router.get('/', (req, res) => {
  res.json({
    message: "It's Working"
  })
})

// User Validation
function isUserValid (user) {
  const hasValidFirstName = typeof user.first_name == "string" && user.first_name.trim() != '';
  const hasValidLastName = typeof user.last_name == "string" && user.last_name.trim() != '';
  const hasValidEmail = validEmailAddress(user.email);
  const hasValidPassword = validPassword(user.password)
  return hasValidEmail && hasValidFirstName && hasValidLastName && hasValidPassword;
}

// Validation for Login
function isLoginValid(user) {
  const hasValidEmail = validEmailAddress(user.email);
  const hasValidPassword = validPassword(user.password);
  return hasValidEmail && hasValidPassword;
}

// Validation for email address
function validEmailAddress(useremail) {
  const filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (filter.test(useremail)) {
    return true;
  } else {
    return false;
  }
}
//
// Validation for password, Password must contain be 8-16 charachters, contain 1 upper and lower case, 1 numeric and a special character
function validPassword(userPassword) {
  const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
  if (userPassword.match(password)) {
    return true;
  } else {
    return false;
  }
}

// SIGNUP ROUTE
router.post('/signup', (req, res, next) => {
  if(isUserValid(req.body)) {
    User.getUserByEmail(req.body.email)
      .then(user => {
        console.log("user:", user);
        if(!user) {
          return bcrypt.hash(req.body.password, 10)
            .then(hash => {
              const user => {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email
                password: hash,
                is_landlord: req.body.is_landlord
              };
              User.createNewAccount(account)
                .then(id => {
                  res.json({
                    id,
                    message: "New User Created"
                  });
                });
            });
        } else {
          next(new Error ("Email is already in use"));
        }
      });
  } else {
    next(new Error ("Invalid User"));
  }
});

router.post('/login', (req, res, next) => {
  console.log(req.body);
});
