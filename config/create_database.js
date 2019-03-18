
var mysql = require('mysql');
var dbconfig = require('./database');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE ' + dbconfig.database);


connection.query('\
	CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(20) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
)', function(err){
		if(err){
			console.log("greska pri kreiranju tabele users;");
		}
});

// connection.query('\
//     CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.matrix_table1 + '` ( \
//     `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
//     `matrix` CHAR(100), \   
//         PRIMARY KEY (`id`), \
//     UNIQUE INDEX `id_UNIQUE` (`id` ASC) \    
// )', function(err){
//         if(err){
//             console.log("greska pri kreiranju tabele matrix;");
//         }
// });




console.log('Success: Database Created!');

connection.end();