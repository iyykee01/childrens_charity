var express = require('express');
var path = require('path');
var hbs = require("express-handlebars");
var bodyParser = require('body-parser');
var stripe = require('stripe')("sk_test_Vr7q5lUTfgobvCZOzADueJ9l")

var app = express();

app.set('port', (process.env.PORT || 3000))

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}) );
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'hbs')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', function(req, res){
    res.render('index', {title: "Children's Charity"});
});

app.get('/success', function(req, res){
    res.render('success', {});
});

app.get('/donate', function(req, res){
    res.render('donate', {})
});

app.post('/amount', function(req, res, next){
   var amount = req.body.amount;
    res.redirect('/donate')
})


    
app.post('/checkout', function(req, res){
  var amount = req.body.amount ;
    
    
     stripe.charges.create({
      amount: amount * 100, //always in cents ** 100
      currency: "usd",
      source: req.body.stripeToken, // obtained with Stripe.js
      description: "Testin charges"
    }, function(err, charge) {
      // asynchronously called
         if(err) {
             console.log(err)
         }
    });
    
    res.redirect('/success')
});



app.listen(app.get('port'), function(err){
    if(err) throw err;
    
    console.log("listening. on port.. 3000")
})
