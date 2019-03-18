function CodeHighlighter(){
	
	var holder = $('#code');
	var blocks = [];
	
	this.addLine = function(line){
		holder.append('<div>'+line+'</div>');
	}
	
	this.addBlock = function(block){
		blocks.push(block);
	}
	
	this.reset = function(){
		holder.html('');
		blocks = [];
	}
	
	this.highlight = function(lineNumber){
		holder.children().removeClass('highlight');
		holder.find(':nth-child('+lineNumber+')').addClass('highlight');
		$(blocks).each(function(i, b){ $(b).removeClass('highlight')});
		$(blocks[lineNumber-1]).addClass('highlight');
	}
}
