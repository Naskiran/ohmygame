const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const connection = require('../conf');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const bcrypt = require('bcryptjs');
const config = require('./config');
const jwt = require('jsonwebtoken');
const VerifyToken = require('./VerifyToken');

const getToken = req => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1]
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

router.post("/protected", (req, res, next) => {
  const token = getToken(req);

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(200).send({auth: false, mess: 'na pas acces au donnes' })
    }
    return res.status(200).send({auth: true, mess: 'Donne du user' })
  })
})


// Register a new user//
router.post('/register', (req, res) => {

  //Paswword crypting
  const hashedPassword = bcrypt.hashSync(req.body.admin_password, 8);

  const values = [req.body.admin_email, hashedPassword, req.body.name]

  connection.query('INSERT INTO admin (admin_email, admin_password, name) VALUES (?,?,?)', values, (err, user) => {

    if (err) return res.status(500).send("There was a problem registering the user.")
    // create a token
    const token = jwt.sign({ idadmin: user.idadmin }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  });
});

// Login user //
router.post('/login', (req, res) => {

  const values = [req.body.admin_email]

  connection.query('SELECT * from admin WHERE admin_email = ?', values, (err, user) => {
    if (err)
      return res.status(500).send('Error on the server.');
    if (!user[0])
      return res.status(404).send('No user found.');

    // Verify the password is valid
    const passwordIsValid = bcrypt.compareSync(req.body.admin_password, user[0].admin_password);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ idadmin: user[0].idadmin }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.header("Access-Control-Expose-Headers", "x-access-token")
    res.set("x-access-token", token)
    res.status(200).send({ auth: true })
  });
});

// Verify Token //
router.get('/verify', VerifyToken, (req, res, next) => {

  const sql = "SELECT * FROM admin WHERE idadmin = ?"
  const token = req.headers['x-access-token'];

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(200).send({ mess: `N'a pas accée au données` })
    }

    const values = [decoded.idadmin]

    connection.query(sql, values, (err, user) => {
      if (err) {
        return res.status(500).send("There was a problem finding the user.")
      }
      else if (!user[0]) {
        return res.status(500).send("No user found.");
      }
      res.status(200).send(user);
    });
  })
});

// Logout user //
router.get('/logout', (req, res) => {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router