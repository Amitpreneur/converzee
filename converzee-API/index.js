const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const path = require('path');


//app.use(cors());

app.use(cors({
  origin: [
    'https://app.converzee.com',
    'https://api.converzee.com',
    'https://converzee-astro.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Only if you use cookies or authentication headers
}));

// Body Parser config...
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Port Setup....
const port = process.env.PORT || 5000;
console.log(port);

// Route Setup...
const users = require('./routes/api/users');
const post = require('./routes/api/post');
const profile = require('./routes/api/profile');

//config DB..
const db = require('./config/keys.js').mongoURI;

//Connect to mongoDB...
mongoose
  .connect(db)
  .then(() => console.log('mongoDB connectedddd'))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

//Route Setup...
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/post', post);


//Heroku setup
// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static('client/build'))
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }


//Round 2 deploy

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'))
  })
}

//Route Operations...
app.get('/', (req, res) => {
  res.send('Root route of server');
});


//Start Server....
app.listen(port, () => {
  `server started on ${port}`;
});
