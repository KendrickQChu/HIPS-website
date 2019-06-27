var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('Public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4997);

app.get('/', function(req,res){
    var param = {};
    param.css = 'styleHome.css'
    param.js = 'carousel.js';
    res.render('home', param);
});

app.get('/collection', function(req,res){
    var param = {};
    param.css = 'styleCollection.css';
    res.render('collection', param);
});

app.get('/about', function(req,res){
    var param = {};
    param.css = 'styleAbout.css'
    param.js = 'downloadResume.js';
    res.render('about', param);
});

app.get('/contact', function(req,res){
    var param = [];
    param.css = 'styleContact.css';
    res.render('contact', param);
});

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on ' + app.get('port') + '; press Ctrl-C to terminate.');
});