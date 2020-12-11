// Load express
const express = require('express');
let app = express();

// Add body parser/json and url encode 
const bodyParser = require('body-parser'); 
app.use(bodyParser.json());           
app.use(bodyParser.urlencoded({ extended: true })); 

// Create Database Connection
const pgp = require('pg-promise')();

let dbConfig = {
    host: 'localhost',
    port: '4000',
    database: 'finalExam',
    user: 'postgres',
    //password: 'postgres'
};

const isProduction = process.env.NODE_ENV === 'production'
dbConfig = isProduction ? process.env.DATABASE_URL : dbConfig;
let db = pgp(dbConfig);

// Set the view engine to ejs
app.set('view engine', 'ejs');

app.use("/resources", express.static('./resources/'));

// Use res.render to load up an ejs view file
app.get('/', function(req, res) {
    res.render('pages/main');
});

app.post('/reviews', function(req, res) {
	var all_reviews = 'select * from reviews;';

  db.task('get-everything', task => {
        return task.batch([
            task.any(all_reviews)
        ]);
    })
    .then(data => {
    	res.render('pages/reviews',{
				my_title: "Movie Reviews",
				games: data[0],
			})
    })
    .catch(error => {
        // display error message in case an error
            request.flash('error', err);
            response.render('reviews', {
                title: 'Movie Reviews',
                data: '',
            })
    });

});

// Local host
app.listen(4000);
console.log('4000 is the magic port');