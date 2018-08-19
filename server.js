const express = require('express');
const hbs =  require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) => {
    if (err) {
      console.log('something when wrong with appendfile');
    }
  })
   next();
});

//maintenence
// app.use((req, res, next) => {
//   res.render('maintenence.hbs');
// });


//http route handlers
app.get('/', (req, resp) => {
  // resp.send('<H1>hello express!</H1>');
  // resp.send({
  //   name:'Gordon',
  //   likes: [
  //     'Cars',
  //     'Bikes'
  //   ]
  // });
  resp.render('home.hbs', {
    pageTitle: 'Home Pagge',
    welcomeMessage: 'Hello, Welcome',
    currentYear: new Date().getFullYear()
  });
})
app.get('/about', (req,resp) => {
  resp.render('about.hbs', {
    pageTitle: 'About Pagge',
    currentYear: new Date().getFullYear()
  });

  //resp.send('About page')
})
app.get('/bad', (req, resp) => {
  resp.send({
    error:  'Sorry, bad request'
  })
})

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
})
