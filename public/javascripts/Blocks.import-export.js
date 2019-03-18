Blocks.import = {};
Blocks.export = {};

Blocks.importBlock = function(block, parent){
    var type = block.block_type;
    if(type != undefined){
        var importHandler = Blocks.import[type];
        if(importHandler != undefined){
            importHandler(block, parent);
        }
    }
}

Blocks.importToWorkspace = function(json, workspace){
    for(var i in json){
        Blocks.importBlock(json[i], workspace);
    }
};

Blocks.exportBlock = function(block){
    var type = block.attr('block-type');
    if(type != undefined){
        var exportHandler = Blocks.export[type];
        if(exportHandler != undefined){
            var result = exportHandler(block);
            result.block_type = type;
            return result;
        }
    }
    return null;
}

Blocks.exportFromWorkspace = function(workspace){
    var result = [];
    workspace.children().each(function(i, c){
        var r = Blocks.exportBlock($(c));
        result.push(r);
    });
    return result;
};

Blocks.export['loop'] = function(block){
	var type = block.find('.title .type').val();
    var result = {
        block_type: 'loop',
        type: type,
        condition: [],
        do: []
        
    };
    
	var con = block.find('.condition:first').children().get(0);
    result.condition = Blocks.exportBlock($(con));

	block.children('ul.do').children().each(function(i, c){
		var r = Blocks.exportBlock($(c));
		result.do.push(r);
	});
	return result;
}	

Blocks.import['loop'] = function(json, parent){
    console.log('import loop');
    var li = $('<li block-type="loop"></li>');
    var block = Blocks.block['loop'](li, {}, {});
    parent.append(block);
	block.find('.title .type').val(json.type);
    var con = block.find('.condition:first');
    Blocks.importBlock(json.condition, con);
    
    var doParent = block.children('ul.do');
    for(var i in json.do){
        Blocks.importBlock(json.do[i], doParent);
    }
}	

Blocks.export['bool'] = function(block){
	var value = block.attr('value');
    var result = {
        block_type: 'bool', 
        value: value
    }
    return result;
}

Blocks.import['bool'] = function(json, parent){
    var li = $('<li block-type="bool" value="'+json.value+'">'+json.value+'</li>');
    var block = Blocks.block['bool'](li, {}, {});
	block.attr('value', json.value);
    parent.append(block);
}

Blocks.export['bool_operator'] = function(block){
    var type = block.find('.type').val();
	var result = {
        block_type: 'bool_operator', 
        type: type, 
        first: [], 
        last: []
    }
	block.children('ul:first').children().each(function(i, c){
		var r = Blocks.exportBlock($(c));
		result.first.push(r);
	});
	block.children('ul:last').children().each(function(i, c){
		var r = Blocks.exportBlock($(c));
		result.last.push(r);
	});
	return result;
}

Blocks.import['bool_operator'] = function(json, parent){
    var li = $('<li block-type="bool_operator"></li>');
    var block = Blocks.block['bool_operator'](li, {}, {});
    var type = block.find('.type').val(json.type);
    parent.append(block);
    
    var first = block.children('ul:first');
    for(var i in json.first){
        Blocks.importBlock(json.first[i], first);
    }
    
    var last = block.children('ul:last');
	for(var i in json.last){
        Blocks.importBlock(json.last[i], last);
    }
}

Blocks.export['repeat'] = function(block){
	var n = block.find('.title input').val();
	var result = {
        block_type: 'repeat', 
        times: n,
        do: []
    }
	
	block.find('ul:first').children().each(function(i, c){
		var r = Blocks.exportBlock($(c));
		result.do.push(r);
	});
	return result;
}

Blocks.import['repeat'] = function(json, parent){
    var li = $('<li block-type="repeat"></li>');
    var block = Blocks.block['goForward'](li, {}, {});
	block.find('.title input').val(json.n);
	parent.append(block);
	
    var doParent = block.find('ul:first');
    for(var i in json.do){
        Blocks.importBlock(json.do[i], doParent);
    }
}

/* MainCharacter */

Blocks.export['goForward'] = function(block){
	var result = {
        block_type: 'goForward'
    }
	return result;
}

Blocks.import['goForward'] = function(json, parent){
	var li = $('<li block-type="goForward"></li>');
    var block = Blocks.block['goForward'](li, {}, {});
    parent.append(block);
}

Blocks.export['turnLeft'] = function(block){
    var result = {
        block_type: 'turnLeft'
    }
	return result;
}

Blocks.import['turnLeft'] = function(json, parent){
	var li = $('<li block-type="turnLeft"></li>');
    var block = Blocks.block['turnLeft'](li, {}, {});
    parent.append(block);
}

Blocks.export['turnRight'] = function(block){
    var result = {
        block_type: 'turnRight'
    }
	return result;
}

Blocks.import['turnRight'] = function(json, parent){
	var li = $('<li block-type="turnRight"></li>');
    var block = Blocks.block['turnRight'](li, {}, {});
    parent.append(block);
}

Blocks.export['isEnd'] = function(block){
    var result = {
        block_type: 'isEnd'
    }
	return result;
}	

Blocks.import['isEnd'] = function(json, parent){
	var li = $('<li block-type="isEnd"></li>');
    var block = Blocks.block['isEnd'](li, {}, {});
    parent.append(block);
}