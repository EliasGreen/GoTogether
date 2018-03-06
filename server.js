// *init project*

//express
const express = require('express');
const app = express();

//body parser
const bodyParser = require('body-parser')

/*********************************************/



// USEs
app.use(express.static('public'));
app.use(express.static('styles'));

app.use(bodyParser.json());   
app.use(bodyParser.urlencoded({ 
  extended: true
}));


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
app.post('/register', function (req, res,) {
  //console.log(req.body);
  res.sendStatus(200);
})

/************/
/* -POSTS- */
/************/

// listener
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
