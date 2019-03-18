var Engine = function(){
	//NAPOMENA> instanca objekta MainCharacter se koristi u kodu, bez prosledjivanja ili instanciranja, sto mislim da je lose. mb
	this.commands = [];
	this.commandNumber = 0;
	this.levelNumber = 1;
	this.game;
	this.level = null;
	// key predstavlja broj linije komande gde pocinje while
	// value predstavlja broj linije gde se zavrsava while
	this.loopBegin = [];
	// key predstavlja broj linije gde se zavrsava while
	// value predstavlja broj linije komande gde pocinje while
	this.loopEnd = [];
	// cuvamo pozicije whileBegin i ibacujemo one koje su uparene sa whileEnd
	this.loops = [];	
	this.completed = 0; //promenljiva koja se koristi samo kao informacija pri obelezavanju predjenih nivoa
	var self = this;
	var isRun=false;

	this.loadLevel = function(level, numOfCommandForLevel, levelNumber){
		//kada se nivo ucita setovati broj nivoa u messageBox.levelNumber
	    messageBox.levelNumber = levelNumber;    
	    messageBox.numOfCommandForLevel = numOfCommandForLevel;
		self.level = level;
	}
	jQuery(document).on('keyup',function(evt) {
    if (evt.keyCode == 27) {
      
			highlighter.reset();
		self.reset();
		character.reset();	
    }
});

	this.drawMap = function(){  
		var polje;
		for(var i = 0; i < self.level.length; i++){
			for(var j = 0; j < self.level[i].length; j++){
			polje = self.game.add.sprite(40 * j, 40 * i, "prazno1");
				switch(self.level[i][j]){
					case FIELD_TYPE.WALL:
						polje = self.game.add.sprite(40 * j, 40 * i, "zid");
					break;
					case FIELD_TYPE.EMPTY:
						polje = self.game.add.sprite(40 * j, 40 * i, "polja");
					break;
					case FIELD_TYPE.PIG:
						polje = self.game.add.sprite(40 * j, 40 * i, "prase");
					break;
					case 3: 
						polje = self.game.add.sprite(40*j,40*i,"zid1");
					break;
					case 4: 
						polje = self.game.add.sprite(40*j,40*i,"tnt");
					break; 
					case 5: 
						polje = self.game.add.sprite(40*j,40*i,"tr1");
					break;
					case 6: 
						polje = self.game.add.sprite(40*j,40*i,"tr2");
					break;		
					case 7: 
						polje = self.game.add.sprite(40*j,40*i,"tr3");
					break;																						
				}
				// if (self.level[i][j] == FILED_TYPE.PLAYER)
				//  polje=game.add.sprite(40 * j, 40 * i, "self.igrac");
			}
		}
	}
	this.run = function(comm){			
		self.isRun = true;
		document.getElementById('run').style.visibility = 'hidden';
		document.getElementById('resetShowCode').style.visibility = 'hidden';
		self.commandNumber = 0;
		self.commands = [];
		this.loopBegin = [];
		this.loopEnd = [];
		this.loops = [];
		eval(comm);
		messageBox.commandNumber = self.commands.length;
		console.log("Broj komandi: "+ self.commands.length);
		console.log("optBrKoraka" + messageBox.numOfCommandForLevel);
		self.nextCommand();
	}

	this.nextCommand = function(){
		var command = self.commands[self.commandNumber];
		console.log(self.commandNumber);
        console.log(self.commands.length);
		//console.log(command);
		highlighter.highlight(self.commandNumber+1);
		if(command != undefined && (typeof command.command) == "function"){
			 if( self.isRun == true ){
                self.commandNumber++;
                command.command(self.nextCommand, command.args);
				 document.getElementById('stop').style.visibility = 'visible';
				 document.getElementById('resetShowCode').style.visibility = 'hidden';
            }
		} else {
		    //kada nema vise komandi a igrac nije udario u zid ili stigao do cilja prikazuje se odgovarajuca poruka
		    messageBox.handle();
            //console.log('nema vise');
		}
	}

	this.init = function(){
		self.game = new Phaser.Game(320, 320, Phaser.CANVAS, "poligon", {
			preload: self.onPreload,
			create: self.onCreate,
			resize: self.onResize 
		});
		(document.getElementById('blocklyDiv'),
			{
				toolbox: document.getElementById('toolbox')
			}
		);
		 document.getElementById('resume').style.visibility = 'hidden';
		 document.getElementById('stop').style.visibility = 'hidden';
		 document.getElementById('resetShowCode').style.visibility = 'hidden';
		 document.getElementById('btnReset').style.visibility = 'hidden';

	}
    
	this.stop = function(){
		self.isRun=false;
		 document.getElementById('resume').style.visibility = 'hidden';
	    document.getElementById('run').style.visibility = 'hidden';
		this.game.stop = true;
		 document.getElementById('stop').style.visibility = 'hidden';
		  document.getElementById('resume').style.visibility = 'visible';
		  document.getElementById('btnReset').style.visibility = 'visible';
		
	}
    
	this.resume = function(){
	 document.getElementById('resume').style.visibility = 'hidden';
	 document.getElementById('btnReset').style.visibility = 'hidden';
	 document.getElementById('stop').style.visibility = 'visible';
		 
		self.isRun=true;
		this.game.stop = false;
		self.nextCommand();
	}
	
	$('#resetShowCode').click(function(){
		highlighter.reset();
		engine.reset();
		
		$('#workspace').html("");
		
	});
	
	this.reset = function(){
		//Naravio izmenu da se prvo setuje y pa onda x; igrac.y koordinta je x koordinata u matrici, igrac.x je y koordinata u matrici
		/*self.igrac.y = 4 * 40;
		self.igrac.x = 2 * 40;*/
		document.getElementById('run').style.visibility = 'visible';
		document.getElementById('stop').style.visibility = 'hidden';
		document.getElementById('resume').style.visibility = 'hidden';
		
		if($('#workspace').html() != "")
			document.getElementById('resetShowCode').style.visibility = 'visible';
		else
			document.getElementById('resetShowCode').style.visibility = 'hidden';
		
		self.igrac.y = character.startPositionX * 40;
		self.igrac.x = character.startPositionY * 40;
		self.commandNumber = 0;
		self.commands = [];
		self.loopBegin = [];
		self.loopEnd = [];
		self.loops = [];
		self.forN = [];
	}	

	this.onPreload = function() {
		self.game.stage.backgroundColor = "#66FFFF";
		self.game.load.spritesheet("polja", "public/images/polja.png", 40, 40);
		self.game.load.spritesheet("zid", "public/images/zid.png", 40, 40);
		self.game.load.spritesheet("self.igrac", "public/images/ledja2.png", 40, 40);
		self.game.load.spritesheet("prase", "public/images/prase.png", 40, 40);

		
		self.game.load.spritesheet("zid1","public/images/zid1.png",40,40);//prepreka
		self.game.load.spritesheet("zid2","public/images/zid2.png",40,40);//prepreka
        self.game.load.spritesheet("prazno","public/images/prazno.jpg",40,40);//pocetno polje ti si postavio
		self.game.load.spritesheet("prazno1","public/images/prazno1.png",40,40);// pocetno polje ja postavio, trava lepsa
		//game.load.spritesheet("ptica","public/images/lice.png",40,40);//PTICA 
		//game.load.spritesheet("prase","public/images/prase.png",40,40);//PRASE-CILJ
		self.game.load.spritesheet("tnt","public/images/tnt.png",40,40);//prepreka
		self.game.load.spritesheet("tr1","public/images/tr1.png",40,40);//prepreka
	    self.game.load.spritesheet("tr2","public/images/tr2.png",40,40);//prepreka
		self.game.load.spritesheet("tr3","public/images/tr3.png",40,40);//prepreka


		self.game.load.spritesheet("move", "public/images/move.png", 53, 23);
		self.game.load.spritesheet("right", "public/images/right.png", 53, 43);
		self.game.load.spritesheet("reset", "public/images/left.png", 53, 43);
		self.game.load.spritesheet("whenRun", "public/images/whenRun.jpg", 113, 20);
		self.game.load.image('zone', 'public/images/platforma.png');
		self.game.load.image('recyle', 'public/images/recyle.png');
		self.game.load.spritesheet("run", "public/images/run.png", 45, 45);
		self.game.load.spritesheet("self.igracDesno", "public/images/pticadesno.png", 40, 40);
		self.game.load.spritesheet("self.igracLevo","public/images/pticalevo.png", 40, 40);
		self.game.load.spritesheet("self.igracDole","public/images/lice.png", 40, 40);
		
		
		self.game.load.spritesheet("wall", "public/images/wall.png", 55, 41);
	}

	this.onCreate = function() {
		
		// dgmRun = self.game.add.sprite(350, 120, 'run');
		// dgmRun.inputEnabled = true;;
		self.drawMap();   

		// dgmRun.events.onInputDown.add(self.run);
				
		//self.igrac = self.game.add.sprite(40 * character.positionY,40 * character.positionX, "self.igrac");
		self.flipCharacter(character.positionX, character.positionY, character.direction);
	}

	this.onResize = function(){
		
	}

	this.flipCharacter = function (i, j, direction){
			switch (direction) {
				case MainCharacter.DIRECTION.UP:
					self.igrac = self.game.add.sprite(40 * j, 40 * i, "polja");
					self.igrac = self.game.add.sprite(40 * j, 40 * i, "self.igrac");
					break;
				case MainCharacter.DIRECTION.RIGHT:
					self.igrac = self.game.add.sprite(40 * j, 40 * i, "polja");
					self.igrac = self.game.add.sprite(40 * j, 40 * i, "self.igracDesno");
					break;
				case MainCharacter.DIRECTION.DOWN: 
					self.igrac = self.game.add.sprite(40 * j, 40 * i, "polja");
					self.igrac = self.game.add.sprite(40 * j, 40 * i, "self.igracDole");
					break;
				case MainCharacter.DIRECTION.LEFT:
					self.igrac = self.game.add.sprite(40 * j, 40 * i, "polja");
					self.igrac = self.game.add.sprite(40 * j, 40 * i, "self.igracLevo");
					break;
			}
		}

	this.addCommand = function(command, args){
		if(command == self.beginWhile){
			self.loopBegin[self.commands.length] = null;
			self.loops.push(self.commands.length);
		}
		if(command == self.endWhile){
			// poslednji loopStart koji nema loopEnd
			var ls = self.loops.pop();
			self.loopEnd[self.commands.length] = ls;
			self.loopBegin[ls] = self.commands.length;
		}

		if(command == self.beginFor){
			self.loopBegin[self.commands.length] = null;
			self.loops.push(self.commands.length);
		}
		if(command == self.endFor){
			// poslednji loopStart koji nema loopEnd
			var ls = self.loops.pop();
			self.loopEnd[self.commands.length] = ls;
			self.loopBegin[ls] = self.commands.length;
		}
		self.commands.push({
			command: command,
			args: args
		});
	}
	
	this.beginWhile = function(callback, args){
		//console.log(args);
		var test = false;
		if(args != undefined){
			test = args.test;
		}
		if((typeof test) == "string"){
			test = eval(test);
		}
		if(args.type == 'until'){
			test = !test;
		}
		console.log(args.test +' = '+test);
		if(test){
			//nastavimo dalje 
			setTimeout(callback, 500); //timeout da bi se primetilo kada ispituje uslov
		}
		else{
			//skocimo na liniju posle whileEnd
			self.commandNumber = self.loopBegin[self.commandNumber - 1] + 1;
			console.log('skoci na '+self.commandNumber);
			setTimeout(callback, 500);
		}
	}
	
	this.endWhile = function(callback){
		//skoci na while pocetak
		var beginLine = self.loopEnd[self.commandNumber - 1];
		self.commandNumber = beginLine;
		console.log('vrati se na '+self.commandNumber);
		callback();
	}
	
	
	this.beginFor = function(callback, args){
		if(self.forN[self.commandNumber] == undefined){
			self.forN[self.commandNumber] = 0;
		}
		if(self.forN[self.commandNumber] < args.n){
			//nastavimo dalje 
			self.forN[self.commandNumber]++;
		}
		else{
			//skocimo na liniju posle forEnd
			self.forN[self.commandNumber] = undefined;
			self.commandNumber = self.loopBegin[self.commandNumber - 1] + 1;
			console.log('skoci na '+self.commandNumber);
		}
		setTimeout(callback, 500);
	}
	
	this.endFor = function(callback){
		//skoci na for pocetak
		var beginLine = self.loopEnd[self.commandNumber-1];
		self.commandNumber = beginLine;
		console.log('vrati se na '+self.commandNumber);
		callback();
	}

	this.postaviKomande = function(komande){
		var string = "";

		for (var i = 0; i < komande.length; i++) {
			var komanda = "";
			switch(komande[i]){
				case 1: 
					komanda = 'goForward';    
				break;
				case 2:
					komanda = 'turnRight';
				break;
				case 3: 
					komanda = 'turnLeft';
				break;
				case 5:
					komanda = 'repeat';
				break;
				case 4:
					komanda = 'loop';
				break;
		
			}
			 if (komande[i]==6 || komande[i] == 7){
    string += "<li class='boolean bool' block-type='bool' value="+komanda;
       string += ">"+komanda+"</li>";
   			}else{
			string += "<li class="+komanda+" block-type='"+komanda;
			string += "'>"+komanda+"</li>";
		}
		if (komande[i]==4){
    		string += "<li class='isField' block-type='isField' value=isField"
      		string += ">isField</li>";
   			}
		};  
		document.getElementById("toolbox").innerHTML = string;    
		    $( "#toolbox li" ).draggable({ 
        revert: "invalid", 
        connectToSortable: ".ui-sortable",
        helper: "clone",
     //   cursorAt: {top: 0, left: 0},
		//appendTo: $("#toolbox"),
        zIndex: 999,/*
        start: function( event, ui ) {
            ui.helper.css('position', 'fixed !important');
        },*/
        drag: function( event, ui ) {
            //console.log(event);
            ui.helper.css('position', 'fixed');
            //console.log(ui.position.top, event.pageY , event.clientY, $('#workspace').offset().top, ui.offset.top, ui.originalPosition.top)
            //console.log(ui.position.top, event.pageY - ui.offset.top)
            console.log(ui.helper.css('position'));
            ui.position.top = event.pageY-$(window).scrollTop();
            ui.position.left = event.pageX;
        }
    });
	}
 	this.resetLevel = function(){
 		highlighter.reset();
		self.reset();
		character.reset();				
		$('#workspace').html("");		
 	}
	this.tryAgain = function(){
 		// highlighter.reset();
		self.reset();
		character.reset();				
		character.setStartDirection(character.direction);
		engine.flipCharacter(character.positionX, character.positionY, character.startDirection);
		
		//it's been used with button resume which is located under button "Run"
		document.getElementById('btnReset').style.visibility = 'hidden';
		// $('#workspace').html("");
 	}

 	this.markLevel = function(level){
 		$('.navbar-levels #meniZaIzborNivoa li').removeClass('activeLevel');
		var levelSelector = '.navbar-levels #meniZaIzborNivoa #'+(level-1)+'1';
		$(levelSelector).addClass('activeLevel');
 	}

	this.postaviNivo = function(character, x, y, direction, numOfCommandForLevel, levelNumber, komande, completed){
		self.game.world.removeAll(); 
		self.drawMap();
		self.postaviKomande(komande); //Ne radi kada se kreira nov nivo-Ne prikazuje svinju-cilj
		self.completed = completed;
		if(completed==1){
			//Posalji zahtev za podacima iz tabele igra sa {levelId: levelNumber, userId: req.user.id}
			//getCommands
		}
		character.setStartPositions(x, y);
		character.setStartDirection(direction);
		character.positionX = x;
		character.positionY = y;
		character.direction = direction;
		self.flipCharacter(character.positionX, character.positionY, character.direction);
		//pri ucitavanju nivoa mora da se setuje optbrKoraka do svinje i rbrNivoa
		messageBox.numOfCommandForLevel = numOfCommandForLevel;
		self.levelNumber = messageBox.levelNumber = levelNumber;
		self.markLevel(levelNumber); //oblezi nivo navbar-u 
		//nije moglo drugacije		
		//document.getElementById("LevelText").innerHTML = "Level " + messageBox.levelNumber;		
		//$('#LevelDialog').modal('show');
		highlighter.reset();
		document.getElementById('resetShowCode').style.visibility = 'hidden';
	}

	

	//Funkcija za ucitavanje nivoa
	//Argument first se koristi kada se zahteva pocetni nivo, i moze biti bilo kog tipa
	this.getLevel = function(levelId, first){
		var data;
		var smer;
		var x;
		var y;
		var dataForSend = {id : levelId};		
		//ako se zahteva pocetni nivo
		if(first!=null){
			dataForSend = {id: levelId, first: true}
		}
		
		$.ajax({
			url:'showLevel',
			type: 'post',
			dataType: 'json',
			data: dataForSend,
			success: function (object) {								
				data = object;//JSON.parse(data.matrica); //JSON.parse(data);								
			}		
		}).done(function(matrica){ //obratiti paznju na ovaj metod
			self.level = JSON.parse(data.matrica);						
			smer = JSON.parse(data.smerKaraktera);												
			x = JSON.parse(data.xKoordKaraktera);			
			y = JSON.parse(data.yKoordKaraktera);	
			//character.positionY = JSON.parse(data.yKoordKaraktera);	
			optBrKoraka = JSON.parse(data.optBrKomandi);
			rbrNivoa = JSON.parse(data.id);
			komande = JSON.parse(data.ponudjeneKomande);
			//predjen = JSON.parse(data.predjen);
			predjen = 0;

			$('#workspace').html("");
			self.postaviNivo(character, x, y, smer, optBrKoraka, rbrNivoa, komande, predjen);
			
			highlighter.reset();
		self.reset();
		character.reset();	
			//self.drawMap();
			//self.igrac = self.game.add.sprite(40 * character.positionX, 40 * character.positionY, "self.igrac");								
			//self.flipCharacter(character.positionX, character.positionY, character.direction);						
			//self.igrac = self.game.add.sprite(40 * character.positionX, 40 * character.positionY, "self.igrac");					
		});	
		
	}

	this.sendLevel = function(){
		//messageBox.levelNumber
		//kod
		//self.completed
		//brKomandi		
		var dataForSend = {
				levelId : self.levelNumber, //levelNumber bi trebalo da se cuva u nekoj globalnoj promenljivoj
				kod:JSON.stringify(Blocks.exportFromWorkspace($('#workspace'))),
				predjen: self.completed, 
				brKomandi: self.commands.length
			};
		$.ajax({
			url: 'saveGame',
			type: 'post',
			dataType: 'json',
			data: dataForSend,
			// success: function (data) {					
			// 	$.each(data, function(idx,item) {
			// 		str += item.Name + "<br />";
			// 	});					
			// 	$('#models').html(str);
			// }				
		});	
	}

	this.getLogin = function(){				
    	var xmlHttp = new XMLHttpRequest();
    	xmlHttp.open( "GET", '/loginStrana', false );
    	xmlHttp.send( null );
    	return xmlHttp.responseText;		
	}

}

Engine.FIELD_TYPE = {
    NONE: 0,
    WALL: 1,
    PIG: 2,
    WALL1: 3,
    TNT: 4,
    TRIANGLE1: 5,
    TRIANGLE2: 6,
    TRIANGLE3: 7,
    BIRD: 8
}

