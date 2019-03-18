//pocetna pozicia igraca
var caracterStartPosition;
var positionX;
var positionY;
var direction;
var sign;
var numbOfUnlocked;
var level;

var numOfCommandForLevel;

var engine;
var character;
var highlighter;
var messageBox;
var brNivoa = 4; 
window.onload = function() {

	//broj otkljucanih nivoa
	

    //tipovi polja u matrici
	FIELD_TYPE = {
		EMPTY: 0,
		WALL: 1,
		PIG: 2
	}		
    //matrica polja
    level = [[1,1,0,1,1,1,0,1],
             [1,0,0,0,1,0,0,1],
             [1,0,2,0,1,0,0,1],
             [1,0,0,1,1,1,0,1],
             [1,0,0,0,0,0,0,1],
             [1,0,0,0,1,0,0,1],
             [1,0,0,0,1,1,1,1],
             [1,1,1,1,1,1,1,1]];
	       
	var dragElementi = [];	//niz u kome se nalaze id sprite-ova koje smo prevukli
	id = 0;	//id
	idrag=0;	//brojac u nizu dragElementi
	brKomandi=0;
	
	//ovi podaci bi trebalo da se setuju pri ucitavanju nivoa
	numOfCommandForLevel = 5;
	positionX = 4;
	positionY = 2;
	sign = 2;
	direction = MainCharacter.DIRECTION.UP;
	caracterStartPosition = {
        //pocetna pozicia igraca
        x: positionX,
        y: positionY
    };
    levelNumber = 6;    


	highlighter = new CodeHighlighter();
	engine = new Engine();
	messageBox = new Message();	
	
	//this method shows message boxes with instructions for playing the game
	//this method has to be called here, because it  has to be shown on page_load and after class Message has been initalized... mb
	messageBox.ok();

	engine.loadLevel(level, numOfCommandForLevel, levelNumber);
	
	character = new MainCharacter(caracterStartPosition.x, caracterStartPosition.y, sign, direction);
	character.setStartPositions(caracterStartPosition.x, caracterStartPosition.y);
	//character.setStartDirection(direction);	
	engine.init();
    engine.getLevel(1, "first");
    console.log("msg.lvlNmb: " +messageBox.levelNumber);    
}