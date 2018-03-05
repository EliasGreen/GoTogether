// init project

//multer
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

//express
const express = require('express');
const app = express();

// USEs
app.use(express.static('public'));
app.use(express.static('styles'));


/************/
 /* +Gets+ */
/************/

// GET MAIN PAGE
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

/************/
 /* -Gets- */
/************/

/************/
/* +POSTS+ */
/************/

// POST REGISTRATION
app.post('/register', upload.single('avatar'), function (req, res, next) {
  console.log(req.file);
  res.send(200);
})

/************/
/* -POSTS- */
/************/

// listener
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
