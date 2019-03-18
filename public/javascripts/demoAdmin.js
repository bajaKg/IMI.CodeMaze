var level;
var xKoordKaraktera;
var yKoordKaraktera;
var komande=[];
// function saveRequest(){																					
// 		level[xKoordKaraktera][yKoordKaraktera]=0;
			
// 		var url = "saveLevel";
// 		var params = "yKoordKaraktera="+yKoordKaraktera+"&xKoordKaraktera="+xKoordKaraktera+"&komande="+JSON.stringify(komande)+"&matrica="+JSON.stringify(level);
// 		var xhr = new XMLHttpRequest();
// 		xhr.open("POST", url, true);

// 		//Send the proper header information along with the request
// 		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 		xhr.send(params);
// }
var snimljen;

function saveRequest(){
	snimljen = true;	
	//level[xKoordKaraktera][yKoordKaraktera]=0   ;
	
	console.log("komande[0] "+komande[0]);
	var centar=0;	
		for(var i=0;i<level.length;i++){
                for(var j=0;j<level[i].length;j++){
					if(level[i][j]==2) 
					{					
						centar=1;
						break;
					}
				}
				}
				
				
	if(komande[0]==1 && xKoordKaraktera>0 && centar==1)
	{
	var dataForSend = {
			xKoordKaraktera: xKoordKaraktera,
			yKoordKaraktera: yKoordKaraktera,
			komande: JSON.stringify(komande),
			matrica: JSON.stringify(level)			
		};
	$.ajax({
		url: 'saveLevel',
		type: 'post',
		dataType: 'json',
		data: dataForSend,
		complete: function (status) {											
			$('#SaveDialog').modal('show');
			console.log("Level uspesno snimljen");
		}				
	});	
	}
	else
	{
	$('#Dialog').modal('show');
	}
}

window.onload = function() {
    snimljen = false;
    //moze da bude i Phaser.AUTO da on sam odredi sta ce da koristi
    var game = new Phaser.Game(1110, 500, Phaser.CANVAS,"poligon",{
		preload:onPreload,
		create:onCreate,
		resize:onResize 
	});
    
    //tipovi polja u matrici
    
    var put = 0;
    var zid = 1;
    var igrac = 2;
    
	var pozicija={
		'x':0,
		'y':0
	}

	
	var nivo = {
    'matrica':  -1,
    'optBrKomand': -1,
	'ponudjeneKomande': [-1,-1,-1,-1,-1],
    'smerKaraktera': -1,
    'xKoordKaraktera': -1,
    'yKoordKaraktera': -1,
    'brojNivoa': -1
}
		
    //matrica polja
	level = [[1,1,1,1,1,1,1,1],
                 [1,0,0,0,0,0,0,1],
                 [1,0,0,0,0,0,0,1],
                 [1,0,0,0,0,0,0,1],
                 [1,0,0,0,0,0,0,1],
                 [1,0,0,0,0,0,0,1],
                 [1,0,0,0,0,0,0,1],
                 [1,1,1,1,1,1,1,1]];
				 

	
	var spriteb=0;// za svaki sprite se popunjava jedinstveni broj i na osnovu toga se preslikava na poligonu
    var brPtica=0;// omogucava nam da samo jednu pticu postavimo u poligon
    var brPrase=0;// omogucava nam da samo jedno prase-cilj postavimo u poligon
	
    function onPreload() {
         game.stage.backgroundColor = "#FFFFFF";
		//game.load.image("polja","images/polja.png");
        
         game.load.spritesheet("zid","public/images/zid.png",40,40);//prepreka
		 game.load.spritesheet("zid1","public/images/zid1.png",40,40);//prepreka
		 game.load.spritesheet("zid2","public/images/zid2.png",40,40);//prepreka
         game.load.spritesheet("prazno","public/images/prazno.jpg",40,40);//pocetno polje ti si postavio
		 game.load.spritesheet("prazno1","public/images/prazno1.png",40,40);// pocetno polje ja postavio, trava lepsa
		 game.load.spritesheet("ptica","public/images/lice.png",40,40);//PTICA 
		 game.load.spritesheet("prase","public/images/prase.png",40,40);//PRASE-CILJ
		 game.load.spritesheet("tnt","public/images/tnt.png",40,40);//prepreka
		 game.load.spritesheet("tr1","public/images/tr1.png",40,40);//prepreka
	     game.load.spritesheet("tr2","public/images/tr2.png",40,40);//prepreka
		 game.load.spritesheet("tr3","public/images/tr3.png",40,40);//prepreka
               
		game.load.spritesheet("left","public/images/komande/turnLeft.png",172,33);
		game.load.spritesheet("right","public/images/komande/turnRight.png",172,33);
		game.load.spritesheet("move","public/images/komande/goForward.png",172,33);
		game.load.spritesheet("loop","public/images/komande/loop.png",172,33);
		game.load.spritesheet("repeat","public/images/komande/repeat.png",172,33);
		game.load.spritesheet("check","public/images/komande/check.png",44,40);
    }
    
    
    
    function onCreate() {
				  console.log("crtanje");
						crtajLavirint()
						
						dodajStavke();
						//zid.events.onInputDown.add(dodajBorder, this);

	   
	}
		
		
		
    function crtajLavirint(){  
	nivo.matrica=level;
	
	   var polje;
	   //prvo iscrtamo pocetno stanje
	   pocetnoCrtanje();
	   //na osnovu matrice level dodamo odgovarajuce slicice;
			for(var i=0;i<8;i++){
						for(var j=0;j<8;j++){
								
								if(level[i][j]==1)
								{
								polje=game.add.sprite(40*j,40*i,"zid");
								}
								if(level[i][j]==2)
								{
								polje=game.add.sprite(40*j,40*i,"prase");
								}
								if(level[i][j]==3)
								{
								polje=game.add.sprite(40*j,40*i,"zid1");
								}
								 if(level[i][j]==4)
								{
								polje=game.add.sprite(40*j,40*i,"tnt");
								}
								if(level[i][j]==5)
								{
								polje=game.add.sprite(40*j,40*i,"tr1");
								}
								if(level[i][j]==6)
								{
								polje=game.add.sprite(40*j,40*i,"tr2");
								}
								if(level[i][j]==7)
								{
								polje=game.add.sprite(40*j,40*i,"tr3");
								}
								if(level[i][j]==8)
								{
								polje=game.add.sprite(40*j,40*i,"ptica");
								}														  
						}			
				}				
    }   
		
	function pocetnoCrtanje()
	{
	game.world.removeAll(); 		//ovo mozda mozemo da iskoristimo pa da nam ne usporoava;
	dodajStavke();
	nadjiKordinateKaraktera();
	//ovde se iscrtava pocetno stanje lavirint, zidovi okolo sa traavom unutra
	for(var i=0;i<8;i++){
						for(var j=0;j<8;j++){
								if(i==0 || i==7 || j==0 || j==7){
										polje=game.add.sprite(40*j,40*i,"zid");
									}
									else{
										polje=game.add.sprite(40*j,40*i,"prazno1");
										polje.inputEnabled = true;
										polje.events.onInputDown.add(Dodaj, this);
								}
									}
	}
	}
    
	
	
	function render() {}
    
    function Dodaj()	
	{	
		//uzimamo i,j
		pozicija.x=Math.floor(game.input.x/40);
				
		pozicija.y=Math.floor(game.input.y/40);
		
		//proveramo da li su trenutni sprite i mesto gde smo kliknuli isti
		//ako jesu postavi to mesto za 0, i pri iscrtavanju se stampa trava
			if(spriteb == level[pozicija.y][pozicija.x])
				{
					level[pozicija.y][pozicija.x]=0;
				}
				
		//ako nisu isti u matricu se upisuje odgovarajuci broj
			else
			{
				if(spriteb==8 && brPtica==0){
						game.add.sprite(40*pozicija.x,40*pozicija.y,"zid2");	//ovo pogledati kako ptica i zid2 ali radi xD					
						++brPtica;
						level[pozicija.y][pozicija.x]=8;
										console.log(brPtica+"  zid2");
				}
				else 
					if(spriteb==2 && brPrase==0){
					level[pozicija.y][pozicija.x]=2;
						game.add.sprite(40*pozicija.x,40*pozicija.y,"prase");
						++brPrase;
										console.log(brPrase+"  prase");
					}
				
				else
					if(spriteb==3){
						game.add.sprite(40*pozicija.x,40*pozicija.y,"zid1");
							level[pozicija.y][pozicija.x]=3;					
					}
					
				else 
					if(spriteb==4){
					
						game.add.sprite(40*pozicija.x,40*pozicija.y,"tnt");	
						level[pozicija.y][pozicija.x]=4;						
					}
				
				else
					if(spriteb==5){
					level[pozicija.y][pozicija.x]=5;
						game.add.sprite(40*pozicija.x,40*pozicija.y,"tr1");										
					}
				
				else 
					if(spriteb==6){
					level[pozicija.y][pozicija.x]=6;
						game.add.sprite(40*pozicija.x,40*pozicija.y,"tr2");										
					}
				else 
					if(spriteb==7){
					level[pozicija.y][pozicija.x]=7;
						game.add.sprite(40*pozicija.x,40*pozicija.y,"tr3");										
					}
				
				else 
					if(spriteb==1){
						level[pozicija.y][pozicija.x]=1;	
						game.add.sprite(40*pozicija.x,40*pozicija.y,"ptica");										
					}
			}
				
				
				
				
				console.log("X:"+pozicija.x+"Y:"+pozicija.y+"level"+level[pozicija.x][pozicija.y]);
				crtajLavirint();
				proveriStatuseKaraktera();
				stampajIzbor()
				//else
				//game.add.sprite(40*pozicija.x,40*pozicija.y,"zid");
				//level[pozicija.x,pozicija.y]=1;
	}
   
    
    function onResize(){}
    
    
    function dodajStavke()
	{
	
						var pticaSprite = game.add.sprite(370,10,'zid',1);
								pticaSprite.inputEnabled = true;					
								pticaSprite.events.onInputDown.add(function prikazi(){spriteb=1;console.log(spriteb+"  ");}, this);
											
						var praseSprite = game.add.sprite(370,60,'prase',2);
								praseSprite.inputEnabled = true;					
								praseSprite.events.onInputDown.add(function prikazi(){spriteb=2;console.log(spriteb+"  ");}, this);
						
						var zid1Sprite = game.add.sprite(370,110,'zid1',3);
								zid1Sprite.inputEnabled = true;
								zid1Sprite.events.onInputDown.add(function prikazi(){spriteb=3;console.log(spriteb+"  ");}, this);
																																								
						var tntSprite = game.add.sprite(370,160,'tnt',4);
								tntSprite.inputEnabled = true;
								tntSprite.events.onInputDown.add(function prikazi(){spriteb=4;console.log(spriteb+"  ");}, this);
																																																									
						var tr1Sprite = game.add.sprite(370,210,'tr1',5);
								tr1Sprite.inputEnabled = true;		
								tr1Sprite.events.onInputDown.add(function prikazi(){spriteb=5;console.log(spriteb+"  ");}, this);
																																										
						var tr2Sprite = game.add.sprite(370,260,'tr2',6);
								tr2Sprite.inputEnabled = true;
								tr2Sprite.events.onInputDown.add(function prikazi(){spriteb=6;console.log(spriteb+"  ");}, this);
																																				
						var tr3Sprite = game.add.sprite(450,10,'tr3',7);
								tr3Sprite.inputEnabled = true;
								tr3Sprite.events.onInputDown.add(function prikazi(){spriteb=7;console.log(spriteb+"  ");}, this);	
																																																							
						var zid2Sprite = game.add.sprite(450,60,'ptica',8);
								zid2Sprite.inputEnabled = true;
								zid2Sprite.events.onInputDown.add(function prikazi(){spriteb=8;console.log(spriteb+"  ");}, this);	
						
			
						console.log(spriteb+"  ");// provera kako se vrednost promenljive menja klikom na razlicite sprite-ove
						
							
									var moveSprite = game.add.sprite(520,10,'move');
								moveSprite.inputEnabled = true;
								moveSprite.events.onInputDown.add(function izbor(){
								if (nivo.ponudjeneKomande[0]==-1) {nivo.ponudjeneKomande[0]=1;}
									else nivo.ponudjeneKomande[0]=-1;
									stampajIzbor();
									}, this);	
													
						var rightSprite = game.add.sprite(520,50,'right');
								rightSprite.inputEnabled = true;
								rightSprite.events.onInputDown.add(function izbor(){
								if (nivo.ponudjeneKomande[1]==-1) {nivo.ponudjeneKomande[1]=2;}
									else nivo.ponudjeneKomande[1]=-1;
									stampajIzbor();
									}, this);	
						
						
							
				var leftSprite = game.add.sprite(520,90,'left');
								leftSprite.inputEnabled = true;
								leftSprite.events.onInputDown.add(function izbor(){
									if (nivo.ponudjeneKomande[2]==-1) {nivo.ponudjeneKomande[2]=3;}
									else nivo.ponudjeneKomande[2]=-1;
									stampajIzbor();
									}, this);	
						
																																																			
				
																																																									
					
						
						
						var loop = game.add.sprite(520,130,'loop');
								loop.inputEnabled = true;
								loop.events.onInputDown.add(function izbor(){
								if (nivo.ponudjeneKomande[3]==-1) {nivo.ponudjeneKomande[3]=4;}
									else nivo.ponudjeneKomande[3]=-1;
									stampajIzbor();
									}, this);	
									
									
					
						
						
						
						
						var repeat = game.add.sprite(520,170,'repeat');
								repeat.inputEnabled = true;
								repeat.events.onInputDown.add(function izbor(){
								if (nivo.ponudjeneKomande[4]==-1) {nivo.ponudjeneKomande[4]=5;}
									else nivo.ponudjeneKomande[4]=-1;
									stampajIzbor();
									}, this);	
						
						zid.inputEnabled = true;
						
						
						
	}
	
	function proveriStatuseKaraktera()
	{	
	var pomPrase=0;
	var pomPtica=0;
		for(var i=0;i<level.length;i++){
                for(var j=0;j<level[i].length;j++){
					if(level[i][j]==8) pomPtica=1;
					if(level[i][j]==2) pomPrase=1;
				}
				}
				
		if (pomPtica==0) brPtica=0;
		if (pomPrase==0) brPrase=0;
	}
	
	function nadjiKordinateKaraktera()
	{

	for(var i=0;i<level.length;i++){
                for(var j=0;j<level[i].length;j++){
					if(level[i][j]==8) 
					{					
						xKoordKaraktera = i;
						yKoordKaraktera = j;
						break;
					}
					
					
				}
	}
	
	}
	function stampajIzbor()
	{	
	game.world.removeAll();
	pocetnoCrtanje();
	crtajLavirint();
	komande=[];
	
	//console.log(komande);
	for(var i=0;i<5;i++)
		{	
			console.log("komande"+i+nivo.ponudjeneKomande[i]);
			if(nivo.ponudjeneKomande[i]>0)
			{	
				komande.push(nivo.ponudjeneKomande[i]);
				game.add.sprite(693,i*40,'check');
			}
		}
	}
    
	function reset(){

	}
    
}