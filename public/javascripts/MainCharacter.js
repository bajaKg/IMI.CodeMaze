
var MainCharacter = function (positionX, positionY, sign, direction){
	this.startPositionX = 0;
	this.startPositionY = 0;
	//this.startDirection = 3;
	this.positionX = positionX;
	this.positionY = positionY;
	this.sign = sign;
	this.direction = this.startDirection = direction;
	this.isRunning = false;

	this.hasHitPig = false;
	//this.isEnd = false;

	this.playerTween;
	var self = this;
	
	this.setStartDirection = function(direc){
		self.startDirection = direc;
	}
	this.setStartPositions = function(x, y){
		self.startPositionX = x;
		self.startPositionY = y;
	}

	this.reset = function(){
		engine.game.tweens.remove(self.playerTween);
		engine.level[self.positionX][self.positionY] = 0;
		this.positionX = self.startPositionX;
		this.positionY = self.startPositionY;
		this.direction = self.startDirection;
		this.isRunning = false;
		this.isEnd = false;
		engine.flipCharacter();
	}

	this.goForward = function(callback){
		self.isRunning = true;
		//engine.game.tweens.remove(self.playerTween);
		switch(self.direction){
			case MainCharacter.DIRECTION.UP:
				if(engine.level[self.positionX - 1][self.positionY] == 0){
					engine.level[self.positionX][self.positionY] = 0;
					self.positionX -= 1;
					//engine.level[self.positionX][self.positionY] = 2;
					//crtajLavirint();
					self.playerTween = engine.game.add.tween(engine.igrac);
					self.playerTween.to({
						x: self.positionY * 40,
						y: self.positionX * 40
					}, 
					800, 
					Phaser.Easing.Linear.None,
					true
					);
                    if(engine.level[self.positionX - 1][self.positionY] == Engine.FIELD_TYPE.PIG){
                        self.hasHitPig = true;
						//engine.completed = 1;
					}
					self.playerTween.onComplete.add(function(){
						self.isRunning = false;
						callback();
					});
				}else {
				    if(engine.level[self.positionX - 1][self.positionY] == Engine.FIELD_TYPE.PIG){
                        self.hasHitPig = true;
						engine.completed = 1;
					}
					//ako nije slobodno polje prikazuje oodgovarajucu poruku
				    messageBox.handleMessage(engine.level[self.positionX - 1][self.positionY]);
				}
				break;
				
			case MainCharacter.DIRECTION.RIGHT:
				if(engine.level[self.positionX][self.positionY + 1] == 0){
					engine.level[self.positionX][self.positionY] = 0;
					self.positionY += 1;
					//engine.level[self.positionX][self.positionY] = 2;
					//crtajLavirint();
					self.playerTween = engine.game.add.tween(engine.igrac);
					self.playerTween.to({
						x: self.positionY * 40,
						y: self.positionX * 40
					}, 
					800, 
					Phaser.Easing.Linear.None,
					true
					);
					
                    if(engine.level[self.positionX][self.positionY + 1] == Engine.FIELD_TYPE.PIG){
                        self.hasHitPig = true;
						//engine.completed = 1;
					}
					
					self.playerTween.onComplete.add(function(){
						self.isRunning = false;
						callback();
					});
				}
				else {
                    if(engine.level[self.positionX][self.positionY + 1] == Engine.FIELD_TYPE.PIG){
                        self.hasHitPig = true;
						engine.completed = 1;
					}
					
				    //ako nije slobodno polje prikazuje oodgovarajucu poruku
				    messageBox.handleMessage(engine.level[self.positionX][self.positionY + 1]);
				}
				break;
			
			
			case MainCharacter.DIRECTION.DOWN:
				if(engine.level[self.positionX + 1][self.positionY] == 0){
					engine.level[self.positionX][self.positionY] = 0;
					self.positionX += 1;
					//engine.level[self.positionX][self.positionY] = 2;
					//crtajLavirint();
					self.playerTween = engine.game.add.tween(engine.igrac);
					self.playerTween.to({
						x: self.positionY * 40,
						y: self.positionX * 40
					}, 
					800, 
					Phaser.Easing.Linear.None,
					true
					);
						
                    if(engine.level[self.positionX + 1][self.positionY] == Engine.FIELD_TYPE.PIG){
                        self.hasHitPig = true;
						//engine.completed = 1;
					}
					
					self.playerTween.onComplete.add(function(){
						self.isRunning = false;
						callback();
					});
				}else {
					if(engine.level[self.positionX + 1][self.positionY] == Engine.FIELD_TYPE.PIG){
                        self.hasHitPig = true;
						engine.completed = 1;
					}
					
				    //ako nije slobodno polje prikazuje oodgovarajucu poruku
				    messageBox.handleMessage(engine.level[self.positionX + 1][self.positionY]);
				}
				break;
				
			
			case MainCharacter.DIRECTION.LEFT:
				if(engine.level[self.positionX][self.positionY - 1] == 0){
					engine.level[self.positionX][self.positionY] = 0;
					self.positionY-=1;
					//engine.level[self.positionX][self.positionY] = 2;
					//crtajLavirint();
					self.playerTween = engine.game.add.tween(engine.igrac);
					self.playerTween.to({
						x: self.positionY * 40,
						y: self.positionX * 40
					}, 
					800, 
					Phaser.Easing.Linear.None,
					true
					);
						
                    if(engine.level[self.positionX][self.positionY - 1] == Engine.FIELD_TYPE.PIG){
                        self.hasHitPig = true;
						//engine.completed = 1;
					}
					
					self.playerTween.onComplete.add(function(){
						self.isRunning = false;
						callback();
					});
				}else {
					if(engine.level[self.positionX][self.positionY - 1] == Engine.FIELD_TYPE.PIG){
                        self.hasHitPig = true;
						engine.completed = 1;
					}
				    //ako nije slobodno polje prikazuje oodgovarajucu poruku
				    messageBox.handleMessage(engine.level[self.positionX][self.positionY - 1]);
				}
				break;
		}
		//console.log(self.positionY+"x"+self.positionX+' -> '+self.end);
	}

	this.turnLeft = function (callback){        
		self.direction -= 1;
		if(self.direction < 1){
			self.direction = 4;
		}
		engine.flipCharacter(self.positionX, self.positionY, self.direction);
        if(self.isFrontField(Engine.FIELD_TYPE.PIG)){
            self.hasHitPig = true;   
        }
		setTimeout(callback, 800);
	}

	this.turnRight = function(callback){      
		self.direction += 1;
		if(self.direction > 4){ 
			self.direction = 1;
		}
		engine.flipCharacter(self.positionX, self.positionY, self.direction);
        if(self.isFrontField(Engine.FIELD_TYPE.PIG)){
            self.hasHitPig = true;   
        }
		setTimeout(callback, 800);
	}
    
    this.say = function(text){
        alert('Bird say: '+text);   
    }
    
    this.isFrontField = function(field){
        console.log('isFrontField: '+field);
        switch(self.direction){
            case MainCharacter.DIRECTION.UP:
                return (engine.level[self.positionX - 1][self.positionY] == field);
                break;
            case MainCharacter.DIRECTION.LEFT:
                return (engine.level[self.positionX][self.positionY - 1] == field);
                break;
            case MainCharacter.DIRECTION.RIGHT:
                return (engine.level[self.positionX][self.positionY + 1] == field);
                break;
            case MainCharacter.DIRECTION.DOWN:
                return (engine.level[self.positionX + 1][self.positionY] == field);
                break;
        }
    }
}
		
MainCharacter.DIRECTION = {
	UP: 1,
	RIGHT: 2,
	DOWN: 3,
	LEFT: 4,
}
