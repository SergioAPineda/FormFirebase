const {Router} = require('express');
const { route } = require('../app');
const admin = require('firebase-admin');

const serviceAccount = require("../../node-firebase-example-f18bc-firebase-adminsdk-e54ja-217105aa68.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://node-firebase-example-f18bc-default-rtdb.firebaseio.com/'
});

const db = admin.database();

const router = Router();

router.get('/', (req, res) => {
  db.ref('contacts').once('value', (snapshot) => {
    const data = snapshot.val();
    res.render('index', {contacts: data})
  })
})

router.post('/new-contact', (req, res) => {
  console.log(req.body);
  const newContact = {
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone
  }
  db.ref('contacts').push(newContact)
  res.redirect('/');
});

router.get('/delete-contact/:id', (req, res) => {
  db.ref('contacts/' + req.params.id).remove();
  res.redirect('/');
})

router.get('/update-contact/:id', (req, res) => {
  db.ref('contacts/' + req.params.id).toJSON;
  res.redirect('/')
})

module.exports = router; 