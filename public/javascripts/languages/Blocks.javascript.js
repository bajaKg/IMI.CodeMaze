/* Engine */

Blocks.javascript['loop'] = function(block, indention, generateCode){
	var result = {code: "", eval: ""};
	var type = block.find('.type:first').val();
	result.code += indention+"while(";
	result.eval += "engine.addCommand(engine.beginWhile, "+
	"{test: '";
	if(type == 'until'){
		result.code += "!";
	}
	{
		var c = block.find('.condition:first').children().get(0);
		var r = generateCode($(c), "", generateCode);
		result.code += r.code;
		result.eval += r.eval;
	}
		
	result.code += "){\n";
	indention += "&emsp;";
	result.eval += "', type: '"+type+"'});";
	block.children('ul.do').children().each(function(i, c){
		var r = generateCode($(c), indention, generateCode);
		result.code += r.code;
		result.eval += r.eval;
	});
	indention = indention.substring(0, indention.length-6);
	result.code += indention+"};\n";
	result.eval += "engine.addCommand(engine.endWhile);\n";
	highlighter.addBlock(block);
	highlighter.addBlock(null);
	return result;
}

Blocks.javascript['bool_operator'] = function(block, indention, generateCode){
	var result = {code: "", eval: ""};
	result.code += '(';
	result.eval += '('; 
	block.children('ul:first').children().each(function(i, c){
		var r = generateCode($(c), "", generateCode);
		result.code += r.code;
		result.eval += r.eval;
	});
	result.code += ' '+block.children('.type').val()+' ';
	result.eval += ' '+block.children('.type').val()+' ';
	block.children('ul:last').children().each(function(i, c){
		var r = generateCode($(c), "", generateCode);
		result.code += r.code;
		result.eval += r.eval;
	});
	result.code += ')';
	result.eval += ')'; 
	highlighter.addBlock(block);
	return result;
}

Blocks.javascript['operator'] = Blocks.javascript['bool_operator'];
Blocks.javascript['test_operator'] = Blocks.javascript['bool_operator'];

Blocks.javascript['repeat'] = function(block, indention, generateCode){
	var result = {code: "", eval: ""};
	var n = block.children('input').val();
	result.code += indention+"for(var i = 0; i < "+n+"; i++){\n";
	result.eval += "engine.addCommand(engine.beginFor, "+
	"{n: "+n+"});\n";
	indention += "&emsp;";
	block.find('ul:first').children().each(function(i, c){
		//console.log(c, generateCode);
		var r = generateCode($(c), indention, generateCode);
		result.code += r.code;
		result.eval += r.eval;
	});
	indention = indention.substring(0, indention.length-6);
	result.code += indention+"};\n";
	result.eval += "engine.addCommand(engine.endFor);\n";
	highlighter.addBlock(block);
	highlighter.addBlock(null);
	return result;
}

Blocks.javascript['string'] = function(block, indention, generateCode){
	var result = {code: "", eval: ""};
	result.code += indention+'"'+block.children('.text').val()+'"';
	result.eval += '"'+block.children('.text').val()+'"';
	highlighter.addBlock(block);
	return result;
}

Blocks.javascript['number'] = function(block, indention, generateCode){
	var result = {code: "", eval: ""};
	result.code += indention+block.children('.value').val();
	result.eval += block.children('.value').val();
	highlighter.addBlock(block);
	return result;
}

Blocks.javascript['bool'] = function(block, indention, generateCode){
	var result = {code: "", eval: ""};
	result.code += block.children('.type').val();
	result.eval += block.children('.type').val();
	highlighter.addBlock(block);
	return result;
}

Blocks.javascript['array'] = function(block, indention, generateCode){
	var result = {code: "", eval: ""};
	result.code += indention+'[';
	result.eval += '[';
    block.children('.items').children().each(function(i, c){
		//console.log(c, generateCode);
		var r = generateCode($(c), indention, generateCode);
        if(i > 0){
            result.code += ', ';
            result.eval += ',';
        }
		result.code += r.code;
		result.eval += r.eval;
	});
    result.code += ']';
    result.eval += ']';
	highlighter.addBlock(block);
	return result;
}

Blocks.javascript['define_variable'] = function(block, indention, generateCode){
	var result = {code: "", eval: ""};
    var name = block.children('.name').val();
	result.code += indention+'var '+name;
	result.eval += 'var '+name;
    var value = block.children('.value').children().first();
    if(value.length > 0){
        var r = generateCode(value, indention, generateCode);
		result.code += ' = ' + r.code;
		result.eval += ' = ' + r.eval;
	}
    result.code += ';\n';
    result.eval += ';\n';
	highlighter.addBlock(block);
	return result;
}

Blocks.javascript['variable'] = function(block, indention, generateCode){
	var result = {code: "", eval: ""};
    var name = block.children('.name').val();
	result.code += indention+name;
	result.eval += name;
	highlighter.addBlock(block);
	return result;
}

Blocks.javascript['print'] = function(block, indention, generateCode){
	var result = {code: "", eval: ""};
	result.code += indention+'alert(';
    result.eval += 'engine.addCommand(engine.alert, {text: "';
    var r = generateCode(block.children('.text').find('.block:first'), "", generateCode);
	result.code += r.code;
    result.eval += r.eval;
    result.code += ');\n';
    result.eval += '"});\n';
	highlighter.addBlock(block);
	return result;
}

/* MainCharacter */

Blocks.javascript['goForward'] = function(block, indention, generateCode){
	var result = {code: "", eval: ""};
	result.code += indention+"character.goForward();\n";
	result.eval += "engine.addCommand(character.goForward);\n";
	highlighter.addBlock(block);
	return result;
}

Blocks.javascript['turnLeft'] = function(block, indention, generateCode){
	var result = {code: "", eval: ""};
	result.code += indention+"character.turnLeft();\n";
	result.eval += "engine.addCommand(character.turnLeft);\n";
	highlighter.addBlock(block);
	return result;
}

Blocks.javascript['turnRight'] = function(block, indention, generateCode){
	var result = {code: "", eval: ""};
	result.code += indention+"character.turnRight();\n";
	result.eval += "engine.addCommand(character.turnRight);\n";
	highlighter.addBlock(block);
	return result;
}

Blocks.javascript['hasHitPig'] = function(block, indention, generateCode){
	var result = {code: "", eval: ""};
	result.code += indention+"character.hasHitPig";
	result.eval += "character.hasHitPig";
	highlighter.addBlock(block);
	return result;
}	

Blocks.javascript['say'] = function(block, indention, generateCode){
	var result = {code: "", eval: ""};
	result.code += indention+'character.say("'+block.children('.text').val()+'");\n';
	result.eval += 'engine.addCommand(character.say, {text: "'+block.children('.text').val()+'"});\n';
	highlighter.addBlock(block);
	return result;
}

Blocks.javascript['isField'] = function(block, indention, generateCode){
	var result = {code: "", eval: ""};
    var fieldId = block.children('.dropdown-toggle').find('.selected').attr('value');
    var fieldName = Object.keys(Engine.FIELD_TYPE).filter(function(key) {
        return Engine.FIELD_TYPE[key] == fieldId
    })[0];
	result.code += indention+'character.isFrontField('+fieldName+')';
	result.eval += 'character.isFrontField('+fieldId+')';
	highlighter.addBlock(block);
	return result;
}
