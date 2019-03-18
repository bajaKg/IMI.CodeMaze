// var express = require('express');
// var passport = require('passport');
// var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../config/database.js');


 module.exports = function(app, passport){
 	var connection = mysql.createConnection(dbconfig.connection);
	/* GET login page. */

	app.post('/saveGame',  function(req, res){
		if(req.isAuthenticated()){
			var connection = mysql.createConnection(dbconfig.connection);
			// req.body.predjen
			// req.body.kod
			// req.body.levelId
			// req.user.id
			// req.body.brKomandi
			console.log(req.body.kod);
			connection.query('SELECT * FROM igra WHERE IdNivoa ='+req.body.levelId+' and IdUcenika='+req.user.id, function(err, rows, fileds){
				if(!err){
					if(rows.length){
						// if(req.body.predjen){ //ako je nivo predjen uradi update, ali prvo treba da se postavi pitanje
							//query nije zavrsen
						// 	connection.query('UPDATE `igra` SET `IdUcenika` = '3', `kod` = 'printf("Hello world");', `brKomandi` = '1' WHERE `igra`.`IdNivoa` = 1 AND `igra`.`IdUcenika` = 1;', function(err){

						// 	});
						// }
						console.log("Nivo je vec predjen, presnimavanje drugom prilikomS");
						res.sendStatus(200);
					}
					else{
						console.log("USER ID: "+req.user.id);
						console.log("Kod : "+JSON.stringify(req.body.kod));
						console.log("levelId: "+req.body.levelId);
						console.log("predjen "+req.body.predjen);
						console.log("kod: "+JSON.stringify(req.body.kod));
						console.log("brKOmandi: "+req.body.brKomandi);
						// console.log(""+);
						connection.query('INSERT INTO `igra` (`IdNivoa`, `IdUcenika`, `predjen`, `kod`, `brKomandi`) VALUES ('+req.body.levelId+', '+req.user.id+', '+req.body.predjen+', '+JSON.stringify(req.body.kod)+', '+req.body.brKomandi+');', function(err){
							if(err){
								console.log("Greska pir insertu na tabeli Igra");
								res.sendStatus(1312);
							}
							else{
								res.sendStatus(200);
							}
						});													
					}
				}
				else{
					console.log("Greska pri upitu na tabeli Igra, u '/saveGame");
				}
			});	
			//connection.end();
		}
		else{
			//console.log(req.body.kod);
		}	
    });
        
	app.get('/contact', function(req, res){
		if(req.isAuthenticated()){
			var connection = mysql.createConnection(dbconfig.connection);
			connection.query('SELECT role FROM `ucenik` WHERE id='+req.user.id, function(err, rows, fields){
			if(!err){
				if (rows[0].role == 0) res.render('contact', {nastavnik:false, auth: true, username: req.user.ime});							
					else
						if (rows[0].role == 2) res.render('contact', {admin:true,  auth: true, username: req.user.ime});
				        else res.render('contact', {nastavnik:true, auth: true, username: req.user.ime});
					 
						//res.render('home', {nastavnik: true, brNivoa: levelNumber , auth: true, statusArray: JSON.stringify(niz)});
				}
				else {
					console.log("Greska pri upitu na tabeli ucenik");
					res.render('contact');
				}
		});
		}// res.render('contact', {nastavnik:true, auth: true, username: req.user.ime});
		else
			res.render('contact');
	});

	app.get('/help', function(req, res){
		if(req.isAuthenticated()){
			var connection = mysql.createConnection(dbconfig.connection);
			connection.query('SELECT role FROM `ucenik` WHERE id='+req.user.id, function(err, rows, fields){
			if(!err){
				if (rows[0].role == 0) res.render('help', {nastavnik:false, auth: true, username: req.user.ime});							
					else
						if (rows[0].role == 2) res.render('help', {admin:true,  auth: true, username: req.user.ime});
				        else res.render('help', {nastavnik:true, auth: true, username: req.user.ime});
					 
						//res.render('home', {nastavnik: true, brNivoa: levelNumber , auth: true, statusArray: JSON.stringify(niz)});
				}
				else {
					console.log("Greska pri upitu na tabeli ucenik");
					res.render('help');
				}
		});
		}// res.render('contact', {nastavnik:true, auth: true, username: req.user.ime});
		else
			res.render('help');
	});
	
	app.get('/privacypolicy', function(req, res){
		if(req.isAuthenticated())
		res.render('privacypolicy', {username: req.user.ime});
		else
			res.render('privacypolicy');
	});

	app.get('/loginStrana', function(req, res){
		res.render('login',  { message: req.flash('loginMessage') });
	});
	
	
	app.get('/', function(req, res, next) {
		res.redirect('/home');
	  //res.render('login',  { message: req.flash('loginMessage') });
	  //res.render('gate');
	});

	app.post('/passGate', function(req, res){
		if(req.body.username === "pmf05" && req.body.password ==="05pmf"){
			res.redirect('/home');
		}
		else{
			res.render('gate', { message: "Wrong passwrod or username." });
		}
	});
	app.get('/gate', function(req, res){
		res.render('gate');
	});
	//Handle Login POST
	app.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/loginStrana',
		failureFlash: true
	}),
	function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });
	
		app.get('/registracija', function(req, res){
		res.render('registracija',  { message: req.flash('signupMessage') });
	});

	
	 	app.post('/registracija', passport.authenticate('signup', {
		successRedirect : '/home', // redirect to the secure profile section
		failureRedirect : '/registracija', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	
	
	



	app.post('/showLevel', function(req, res){
    	var connection = mysql.createConnection(dbconfig.connection);
    	//console.log(req.user);
    	// ovo treba izbaciti: connection.query('USE ' + dbconfig.database);    	
    	connection.connect(function(err) {
			if (err) {
				console.error('Greska pri konekciji showLevel: ' + err.stack);
				return;
			}
		});
		if(req.isAuthenticated() && req.body.first !=null){
			// res.send({
	  //   	  			"id" : 10,
	  //   	  			"redniBrNivoa": 2,
	  //   	  			"matrica": '[[1,1,1,1,1,1,1,1],[1,0,0,1,1,1,1,1],[1,0,0,1,1,1,1,1],[1,0,0,0,0,0,0,1],[1,1,1,1,1,1,0,1],[1,0,0,0,1,0,0,1],[1,0,0,0,0,0,1,1],[1,1,1,1,1,1,1,1]]',
	  //   	  			"optBrKomandi": 2,
	  //   	  			"ponudjeneKomande": '[1,2,3]',
	  //   	  			"smerKaraktera": 1,
	  //   	  			"xKoordKaraktera": 1,
	  //   	  			"yKoordKaraktera": 1
	  //   	  		});
			connection.query('SELECT *\
				FROM `level`\
				LEFT JOIN\
				(SELECT * FROM `igra` where `igra`.IdUcenika = '+req.user.id+') as s \
				ON `level`.id = s.IdNivoa\
				WHERE s.predjen is null or s.predjen=0\
				ORDER BY `level`.id\
				LIMIT 1', function(err, rows, fields){
					if(!err){	
					console.log(rows);					
						if(rows[0]!=null){
							
							res.send({
			    	  			"id" : rows[0].id,
			    	  			"redniBrNivoa": rows[0].redniBrNivoa,
			    	  			"matrica": rows[0].matrica,
			    	  			"optBrKomandi": rows[0].optBrKomandi,
			    	  			"ponudjeneKomande": rows[0].ponudjeneKomande,
			    	  			"smerKaraktera": rows[0].smerKaraktera,
			    	  			"xKoordKaraktera": rows[0].xKoordKaraktera,
			    	  			"yKoordKaraktera": rows[0].yKoordKaraktera
		    	  			});
						}
						else{
							console.log("Preso si sve nivoe!");
							res.render('error', {message: "Preso si sve nivoe!"});
						}
					}
					else{
						console.log("Greska pri select upitu showLevel index.js ln 150");
					}
				}
			);
		}    	
		else{						
    	connection.query('SELECT *\
    	 FROM level\
    	  WHERE id = ' + req.body.id, function(err, rows, fields){
    	 	if(!err){
    	 		if(!(!(req.isAuthenticated()) && req.body.id > 3) && rows.length){ //ako nije autentifikovan i levelId je veci od 3, ne salji podatke o nivou
	    	  		res.send({
	    	  			"id" : rows[0].id,
	    	  			"redniBrNivoa": rows[0].redniBrNivoa,
	    	  			"matrica": rows[0].matrica,
	    	  			"optBrKomandi": rows[0].optBrKomandi,
	    	  			"ponudjeneKomande": rows[0].ponudjeneKomande,
	    	  			"smerKaraktera": rows[0].smerKaraktera,
	    	  			"xKoordKaraktera": rows[0].xKoordKaraktera,
	    	  			"yKoordKaraktera": rows[0].yKoordKaraktera
	    	  		});
	    	  	}
    	  	}
    	  	else{
    	  		console.log("Greska pri select upitu na tabeli level u /showLevel");
    	  	}
    	});
    	}
    });



    app.post('/saveLevel', function(req, res){    	
    	//probati bez createConnection		

    	var connection = mysql.createConnection(dbconfig.connection);
    	connection.connect(function(err) {
			if (err) {
				console.error('Greska pri konekciji saveLevel: ' + err.stack);
				return;
			}
		});
		console.log("komande"+req.body.komande);
    	console.log("("+req.body.xKoordKaraktera+","+ req.body.yKoordKaraktera+")");
        connection.query("INSERT INTO `level` (`id`, `redniBrNivoa`, `matrica`, `optBrKomandi`, `ponudjeneKomande`, `smerKaraktera`, `xKoordKaraktera`, `yKoordKaraktera`) VALUES (NULL, '2', '"+req.body.matrica+"', '6', '"+req.body.komande+"', '3', '"+req.body.xKoordKaraktera+"', '"+req.body.yKoordKaraktera+"');", function(err, rows, fields){
    		    	 	if(!err){
			    	  		console.log("Upisivanje proslo kako treba.");
			    	  		res.send(222);
			    	  	}
			    	  	else{
			    	  		console.log("Greska pri upitu na tabeli matrix");
			    	  	}
		});
//provera da li u tabeli vec postoji poslati nivo
		/*connection.query("SELECT * FROM level WHERE id = "+req.body.Id, function(err, rows, fields){
			if(!err){
			// ako postoji uraditi update nivoa
				if(rows.length){
					console.log("Postoji");
					console.log(req.body.matrica);
					connection.query("UPDATE `imi_codemaze_shema`.`level` SET `matrica` = '"+req.body.matrica+"', `xKoordKaraktera` = '"+req.body.xKoordKaraktera+"', `yKoordKaraktera` = "+req.body.yKoordKaraktera+",`ponudjeneKomande` = '"+req.body.ponudjeneKomande+"',`optBrKomandi` = '"+req.body.optBrKomandi+"', `smerKaraktera` = '"+req.body.smerKaraktera+"' WHERE `level`.`id` = "+req.body.Id+";", function(err, rows, fields){
			    	 	if(!err){
			    	 		console.log(req.body.lorem);
			    	  		console.log("UPDATE prosao kako treba.");
			    	  		res.send(222);

			    	  	}
			    	  	else{
			    	  		console.log("Greska pri UPDATE na tabeli level");
			    	  	}
			    	});
				}
				// ako ne postoji uraditi insert
				else{
					console.log("Ne postoji");
					connection.query("INSERT INTO `imi_codemaze_shema`.`level` (`id`, `levelId`, `matrica`, `optBrKomandi`, `ponudjeneKomande`, `smerKaraktera`, `xKoordKaraktera`, `yKoordKaraktera`) VALUES (NULL, '2', '[[1,1,1,1,1,1,1,1],[1,0,0,1,1,1,1,1],[1,0,0,1,1,1,1,1],[1,0,0,0,0,0,0,1],[1,1,1,1,1,1,0,1],[1,0,0,0,1,0,0,1],[1,0,2,0,0,0,1,1],[1,1,1,1,1,1,1,1]]', '6', '[1,2,3]', '2', '5', '1');", function(err, rows, fields){
			    	 	if(!err){
			    	  		console.log("Upisivanje proslo kako treba.");
			    	  		res.send(222);
			    	  	}
			    	  	else{
			    	  		console.log("Greska pri upitu na tabeli matrix");
			    	  	}
			    	});
				}
			}
			else{
				console.log("Greska pri upitu select na tabeli level");
			}

		});		*/

    });

	//brisanje nivoa iz tabele
	app.post('/deleteLevel', function(req, res){
		//potrebno je da se nivo obrise i iz tabele Igra
		console.log("Level obrisan.");
	});

	app.post('/signup', passport.authenticate('signup', {
		successRedirect : '/home', // redirect to the secure profile section
		failureRedirect : '/home', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
		

	app.get('/home', /*isLoggedIn,*/ function(req, res, next){
		//var num = 2;				
		var connection = mysql.createConnection(dbconfig.connection);
		connection.connect(function(err) {
			var num = 1;
			if (err) {
				console.error('Greska pri konekciji /home: ' + err.stack);
				return;
			}
			connection.query('SELECT count(*) as brNivoa FROM `level`', function(err, rows, fields) {
			if (!err)
			{
				var levelNumber = rows[0].brNivoa;
				//console.log('rows ', rows[0].brNivoa);
				//num = rows[0].brNivoa;
				if(req.isAuthenticated()){
					console.log("Uloga korisnika: "+req.user.role);
					connection.query('SELECT IdNivoa FROM `igra` WHERE IdUcenika='+req.user.id, function(err, rows, fields){
						if(!err){
							var niz = [];							
							for (var i = 0; i < rows.length; i++) {
								niz.push(rows[i].IdNivoa);
							};
							console.log(niz);
							console.log(JSON.stringify(niz));
							connection.query('SELECT role FROM `ucenik` WHERE id='+req.user.id, function(err, rows, fields){
							if(!err){
								if (rows[0].role == 0) res.render('home', {nastavnik:false, brNivoa: levelNumber , auth: true, statusArray: JSON.stringify(niz), username: req.user.ime});							
									else
										if (rows[0].role == 2) res.render('home', {admin:true, brNivoa: levelNumber , auth: true, statusArray: JSON.stringify(niz), username: req.user.ime});
								        else res.render('home', {nastavnik:true, brNivoa: levelNumber , auth: true, statusArray: JSON.stringify(niz), username: req.user.ime});
									 
										//res.render('home', {nastavnik: true, brNivoa: levelNumber , auth: true, statusArray: JSON.stringify(niz)});
								}
								else {
									console.log("Greska pri upitu na tabeli ucenik");
									res.render('home');
								}
							
							});
							

							//res.cookie.statusArray, JSON.stringify(niz), {})
							//res.render('home', {brNivoa: levelNumber , auth: true, statusArray: JSON.stringify(niz)});
						}
						else{
							console.log("Greska pri upitu na tabeli igra");
							res.render('home');
						}
					});
					
				}
				else{
					res.render('home', {brNivoa: levelNumber, auth: false});	
				}				
			}
			else{
				res.render('home');
				console.log('Error while performing Query.');
			}
			});
			
		});
 //	  	res.render('home', {brNivoa: num});
	});

	app.get('/adminStrana', isLoggedIn, function(req, res, next){
		res.render('adminStrana', {nastavnik:true, auth: true, username: req.user.ime});
	});
	app.get('/listaUcenika',isLoggedIn,function(req, res, next){
		res.render('listaUcenika', {username: req.user.ime});
	});
	
	app.get('/korisnici', isLoggedInAsAdmin , function(req, res, next){
		res.render('korisnici', {username: req.user.ime});
	});
	
	app.get('/getKorisnici',isLoggedIn,function(req, res,next){
		var connection = mysql.createConnection(dbconfig.connection);
    	connection.connect(function(err) {
			if (err) {
				console.error('Greska pri konekciji getKorisnici: ' + err.stack);
				return;
			}
			connection.query('SELECT * from ucenik', function(err, rows, fields) {
			if (!err)
			{
				//console.log('rows ', rows);
				res.json(rows);
			}
			else
				console.log('Error while performing Query.');
			});
		});

	});
	
	
	app.post('/save',isLoggedIn,function(req, res,next){
		var connection = mysql.createConnection(dbconfig.connection);
    	connection.connect(function(err) {
			if (err) {
				console.error('Greska pri konekciji save: ' + err.stack);
				return;
			}
		connection.query('UPDATE ucenik SET role = CASE WHEN role = 1 THEN 0 WHEN role = 0 then 1 else role END where id=' + req.body.id, function(err, rows, fields) {
		if (!err)
		{
			console.log('rows: ', rows);
			res.json(rows);
		}
		else
			console.log('Error while performing Query.');
		});
		});

	});
	
		app.post('/deleteUser',isLoggedIn,function(req, res,next){
		var connection = mysql.createConnection(dbconfig.connection);
    	connection.connect(function(err) {
			if (err) {
				console.error('Greska pri konekciji save: ' + err.stack);
				return;
			}
		connection.query('DELETE from ucenik where id=' + req.body.id, function(err, rows, fields) {
		if (!err)
		{
			console.log('rows: ', rows);
			res.json(rows);
		}
		else
			console.log('Error while performing Query.');
		});
		});

	});




	

	app.get('/getUsers',isLoggedIn,function(req, res,next){
		var connection = mysql.createConnection(dbconfig.connection);
    	connection.connect(function(err) {
			if (err) {
				console.error('Greska pri konekciji getUsers: ' + err.stack);
				return;
			}
			connection.query('SELECT id,ime,prezime from ucenik where role=0', function(err, rows, fields) {
			if (!err)
			{
				//console.log('rows ', rows);
				res.json(rows);
			}
			else
				console.log('Error while performing Query.');
			});
		});

	});


	app.post('/showUser',isLoggedIn,function(req, res,next){
		var connection = mysql.createConnection(dbconfig.connection);
    	connection.connect(function(err) {
			if (err) {
				console.error('Greska pri konekciji showUser: ' + err.stack);
				return;
			}
		connection.query('SELECT IdNivoa,predjen,kod,brKomandi from igra where IdUcenika=' + req.body.id, function(err, rows, fields) {
		if (!err)
		{
			console.log('rows: ', rows);
			res.json(rows);
		}
		else
			console.log('Error while performing Query.');
		});
		});

	});


	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');

	});
	// return router;
}



// module.exports = router;


function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

function isLoggedInAsAdmin(req, res, next){	
	// if user is authenticated in the session, and his role is admin, carry on
	if (req.isAuthenticated() && (req.user.role == 2))
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}