function intersect(a, b) {
	var t;
	if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
	return a.filter(function (e) {
		if (b.indexOf(e) !== -1) return true;
	});
}

var changeCode = function(){
    highlighter.reset();
    var language = $('#language').val();
    var code = Blocks.workspaceToCode($('#workspace'), language);
    var lines = code.code.split('\n');
    for(var i = 0; i < lines.length; i++){
        highlighter.addLine(lines[i]);
    }
}

var drop = function( event, ui ) {
    //setTimeout(changeCode, 10);
    console.log('drop');
    var block = ui.item;
    var draggable = ui.helper;
	if (draggable  != null) {
		var type = draggable.attr('block-type');
		//block = Blocks.block[type](draggable, css, ulcss);
        block = Blocks.createBlock(type, block);
		//$(block).attr('block-type', type);
		//draggable.after(block);
        $(this).data('new-block', block);
		//draggable.attr('style', 'position: relative;');
        //$(this).droppable("cancel");
	}
    
    // ogranicenje za tip
    var accept = true;
    var a = $(this).attr('accept');
    var returnType = block.attr('return-type');
    //console.log(a);
    //console.log(returnType);
	if(a != undefined){
		a = a.split(' ');
        if(returnType != undefined){
            //console.log('return yes');
            returnType = returnType.split(' ');
            accept = (intersect(a, returnType).length > 0);
        }
        else{
            //console.log('return no');
            accept = false;   
        }
	}
    // ogranicenje za broj blokova
    var maxBlocks = $(this).attr('max-blocks');
    console.log(maxBlocks);
    if(maxBlocks != undefined && parseInt(maxBlocks) < $(this).children().length){
        accept = false;
    }
	console.log(accept);
    block.data('accept', accept);
}

var droppable = {
    greedy: true
}


var sortable = {
    placeholder: "ui-state-highlight",
	connectWith: '.ui-sortable',
    tolerance: 'pointer',
    receive: drop,
	opacity: 0.5,
	cursor: 'crosshair',
   // cursorAt: { left: 0, top: 0},
    stop: function (event, ui){
        console.log('sortable stop');
        var block = ui.item;
        var newBlock = $(this).data('new-block');
        if(newBlock != undefined){
            ui.item.after(newBlock);
            ui.item.remove();
            $(this).removeData('new-block');
            block = newBlock;
        }
        var accept = block.data('accept');
        //console.log(accept);
        if(newBlock != undefined){
            if(!accept){
                newBlock.remove();
                //console.log('cancel new');
            }
        }else{
            if(!accept){
                //console.log('cancel old');
                $(this).sortable('cancel');
            }
        }
        if(ui.item.hasClass('remove')){
            ui.item.remove();   
        }
        $(this).removeData('accept');
        changeCode();
    }
}

$(function() {
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
	
	//$( "#workspace" ).droppable(droppable);
    $( "#workspace" ).sortable(sortable);
	
	$('#run').click(function(){
		highlighter.reset();
		engine.reset();
		character.reset();
		var language = $('#language').val();
        var code = Blocks.workspaceToCode($('#workspace'), language);
		var lines = code.code.split('\n');
		for(var i = 0; i < lines.length; i++){
			highlighter.addLine(lines[i]);
		}
		engine.run(code.eval);
	});
	
	$('.nav-tabs a').click(function (e) {
		e.preventDefault()
		$(this).tab('show')
	});
	
	$('#reset').click(function(){
		//highlighter.reset();
		engine.reset();
		character.reset();
		
		//var code = workspaceToCode($('#workspace'), 'javascript');
		//code.delete;
		character.setStartDirection(character.direction);
		engine.flipCharacter(character.positionX, character.positionY, character.startDirection);
		//caracterStartPosition.x, caracterStartPosition.y, sign, direction
		//$('#workspace').html("");
		//alert("aaaa");
	});
	
	
	
	$('.trash').droppable({
        drop: function(event, ui) {
            var draggable = ui.draggable;
            ui.draggable.addClass('remove');
			$(this).removeClass('over');
        },
        hoverClass: "drop-hover",
        tolerance: "pointer",
		over: function(event, ui){
            //ui.draggable.css('transform', 'scale(0.5)');
            $(this).addClass('over');
		},
		out: function(event, ui){
            //ui.draggable.css('transform', 'scale(1)');
			$(this).removeClass('over');
		}
    });
	
    $('#language').change(changeCode);
    
});