
var LocalStrategy = require('passport-local').Strategy;

var mysql = require('mysql'); 
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.connect(function(err){
	if(err){
		console.error("Greska pri konekciji: " + err.stack);
		return;
	}
});
//connection.query('USE ' + dbconfig.database);

module.exports = function(passport){	
	//passport session setup
	passport.serializeUser(function(user, done){  //Ne razjasnjena svrha ovih funkcija (serializeUser i deserializeUser)
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		connection.query("SELECT * FROM ucenik WHERE id = ? ",[id], function(err, rows){
			done(err, rows[0]);
		});		
	});	

	//Login
	passport.use(
		'login',
		new LocalStrategy({
		usernameField : 'username',
        passwordField : 'password',
		passReqToCallback : true
	},
	function(req, username, password, done){
		var connection = mysql.createConnection(dbconfig.connection);
		connection.connect(function(err){
			if(err){
				console.error("Greska pri konekciji passport.js ln:41: " + err.stack);
				return;
			}
		});
		//check if a user with username exists or not
		connection.query("SELECT * FROM ucenik WHERE username = ?", [username], function(err, rows){			
			if(err)
				return done(err);
			if(!rows.length) {
				return done(null, false, req.flash('loginMessage', 'No user found'));
				
			} 

			//if the user is found but the password is wrong
			if(!bcrypt.compareSync(password, rows[0].password)){
				return done(null, false, req.flash('loginMessage', 'Oops! Wrong password'));

			}
			//all is well
			return done(null, rows[0]);
		});
	}
	));

	//Registration later...	

	passport.use(
        'signup',
        new LocalStrategy({
       
            usernameField : 'username',
            passwordField : 'password',
            imeField: 'ime',
            prezimeField:'prezime',
            emailField:'email',
            passReqToCallback : true 
        },
        function(req, username, password, done) {
        	var connection = mysql.createConnection(dbconfig.connection);
        	connection.connect(function(err){
				if(err){
					console.error("Greska pri konekciji passport.js ln 79: " + err.stack);
					return;
				}
			});
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query("SELECT * FROM ucenik WHERE username = ?",[username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                	//return done(err);
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                    // if there is no user with that username
                    // create the user
                    var newUserMysql = {
                        username: username,
                        email: req.param('email'),
          				ime: req.param('ime'),
          				prezime: req.param('prezime'),
                        password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                    };
                    
                  

                    var insertQuery = "INSERT INTO ucenik ( ime, prezime, email, username, password ) values (?,?,?,?,?)";

                    connection.query(insertQuery,[newUserMysql.ime,newUserMysql.prezime,newUserMysql.email,newUserMysql.username, newUserMysql.password],function(err, rows) {
                        newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

}
