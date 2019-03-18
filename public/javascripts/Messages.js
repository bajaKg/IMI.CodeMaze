var Message = function () {
    //broj zadatih komandi
    this.commandNumber = 0;
    //dozvoljen broj komandi
    this.numOfCommandForLevel = 0;
    //nivo po redu
    this.levelNumber = 1;
    //broj otkljucanih nivoa
    this.numbOfUnlocked = 3;
    
    //prikazuje poruke pri strarovanju za level, commands, workspace i run
    this.ok = function () {
        //$('#MessageDialog').modal('hide');
		var isFieldsHelpSeen = $.cookie("isFieldsHelpSeen") ? $.cookie("isFieldsHelpSeen") : false;
        var isCommandsHelpSeen = $.cookie("isCommandsHelpSeen") ? $.cookie("isCommandsHelpSeen") : false;
        var isDragHelpSeen = $.cookie("isDragHelpSeen") ? $.cookie("isDragHelpSeen") : false;
        var isRunHelpSeen = $.cookie("isRunHelpSeen") ? $.cookie("isRunHelpSeen") : false;
		console.log("FieldsHelpSeen: "+isFieldsHelpSeen);
        if (!isFieldsHelpSeen) {            
            //$('#LevelDialog').modal('hide');
            $('#FieldsDialog').modal('show');
            $.cookie("isFieldsHelpSeen", true);
			}
        else if (!isCommandsHelpSeen) {
            $('#FieldsDialog').modal('hide');
            $('#CommandsDialog').modal('show');
            $.cookie("isCommandsHelpSeen", true);
        } else if (!isDragHelpSeen) {
            $('#CommandsDialog').modal('hide');
            $('#DragDialog').modal('show');
            $.cookie("isDragHelpSeen", true);
        } else if (!isRunHelpSeen) {
            $('#DragDialog').modal('hide');
            $('#RunDialog').modal('show');
            $.cookie("isRunHelpSeen", true);
        }
        if ($.cookie("isRunHelpSeen")) {
            if ($.cookie("isDragHelpSeen")) {
                if (isRunHelpSeen) {
                    $('#RunDialog').modal('hide');
                }
            }
        }
    
    }
    
    //ukoliko igrac udari u zid ili stigne do cilja prikazuje poruku
    this.handleMessage = function (id) {
        switch (id) {
            case 1:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7: 
                document.getElementById("ErrorTitle").innerHTML = "Hit the wall";
                document.getElementById("ErrorMessage").innerHTML = "Try again?";
                document.getElementById("con").style.width = "480px";
                document.getElementById("con").style.left = "0px";
                document.getElementById("con").style.top = "100px";
                $('#ErrorDialog').modal('show');
            break;
            
            case 2:
                if (this.commandNumber > this.numOfCommandForLevel) {
                    var message = " However, you could have used only "+this.numOfCommandForLevel + " blocks.";
                    document.getElementById("SuccessLabelInfo").innerHTML = "Congratulations! You completed Puzzle "+engine.levelNumber+" !";
                    document.getElementById("MessageSuccessInfo").innerHTML = message;
                    $('#SuccessDialogInfo').modal('show');
                    break;
                } else {
                    document.getElementById("SuccessLabel").innerHTML = "Congratulations!";
                    document.getElementById("MessageSuccess").innerHTML = "You are great! You completed Puzzle "+engine.levelNumber+" !";
                    $('#SuccessDialog').modal('show');
                }
        }
    }
    
    //prikazuje poruku za logovanje ako je nivo veci od 3
    this.isNeedToLogin = function () {
        if (this.levelNumber > 3) {
            $('#SuccessDialog').modal('hide');
            $('#LoginDialog').modal('show');
        } else {       
            $('#SuccessDialog').modal('hide');
            //document.getElementById("LevelText").innerHTML = "Level " + this.levelNumber;
            //$('#LevelDialog').modal('show');
        }
    }
    
    //ako je igrac imao poteze ali nije stigao do cilja ili udario u zid ispisuje odgovarajucu poruku
    this.handle = function() {
        if(engine.completed && !MainCharacter.hasHitPig){
            this.handleMessage(2);
        }else{
            document.getElementById("ErrorTitle").innerHTML = "Not good";
            document.getElementById("ErrorMessage").innerHTML = "Try again?";
            document.getElementById("con").style.width = "480px";
            document.getElementById("con").style.left = "0px";
            document.getElementById("con").style.top = "100px";
            $('#ErrorDialog').modal('show');
        }
    }

};
