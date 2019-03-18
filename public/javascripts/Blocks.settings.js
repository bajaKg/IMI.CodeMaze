var Blocks = {block: [], javascript: []};
Blocks.RETURN_TYPE = {
	BOOLEAN: "boolean",
	INTEGER: "integer",
	FLOAT: "float",
	STRING: "string"
};

Blocks.createBlock = function (type, block) {
    var Block = $('<li></li>');
    //var type = block.attr('block-type');
    Block.attr('block-type', type);
    Block.addClass('block');
    var proto = {
        setColor: function (h) {
            var border = 'hsl(' + h + ', 50%, 60%)';
            var gradient = 'linear-gradient(to bottom, hsl(' + h + ', 50%, 85%) 0px, hsl(' + h + ', 50%, 70%) 40px)';
            var css = {
                'background-image': gradient,
                'border-color': border
            };
            var ulcss = {
                'background': 'hsl(' + h + ', 50%, 95%)'
            }
            this.css(css);
            this.find('ul, select, input').css(ulcss);
            this.find('span, div').css({color: 'hsl(' + h + ', 50%, 30%)'});
        },
        setName: function (name) {
            this.prepend('<div class="ui-draggable-handle">'+name+'</div>');
        },
        setReturnType: function (returnType) {
            this.attr('return-type', returnType);
        },
        addText: function(text, className){
            var span = $('<span>'+text+'</span>');
            if(className != undefined){
                span.addClass(className);
            }
            this.append(span);
        },
        addInput: function (name, type, options) {
            if(name == undefined) return;
            if(type == 'select'){
                var select = $('<select class="'+name+'"></select>');
                if(options != undefined){
                    if(options.values instanceof Array){
                        for(var key in options.values){
                            var value = options.values[key];
                            select.append('<option value="'+value+'">'+value+'</option>');
                        }
                    }else{
                        for(var key in options.values){
                            var value = options.values[key];
                            select.append('<option value="'+key+'">'+value+'</option>');
                        }
                    }
                    if((typeof options.change) == 'function'){
                        select.change(options.change);
                    }
                }
                this.append(select);    
            }
            if(type == 'blocks') {
                var ul = $('<ul class="'+name+' ui-sortable ui-droppable"></ul>');
                if(options != undefined){
                    if(options.accept != undefined){
                        if(options.accept instanceof Array){
                            ul.attr('accept', options.accept.join(' '));
                        }
                        else{
                            ul.attr('accept', options.accept);
                        }
                    }
                    if(options.maxBlocks != undefined){
                        ul.attr('max-blocks', options.maxBlocks);
                    }
                }
                this.append(ul);
                ul.sortable(sortable);
                //ul.droppable(droppable);
            }
            if(type == 'input'){
                var input = $('<input class="'+name+'"/>');
                if(options != undefined){
                    if(options.value != undefined){
                        input.val(options.value);
                    }
                    if((typeof options.change) == 'function'){
                        input.change(options.change);
                    }
                }
                this.append(input);
            }
            if(type == 'text'){
                var input = $('<textarea class="'+name+'"></textarea>');
                if(options != undefined){
                    if(options.value != undefined){
                        input.text(options.value);
                    }
                    if((typeof options.change) == 'function'){
                        input.change(options.change);
                    }
                }
                this.append(input);
            }
        },
        init: Blocks.block[type]
    }
    $.extend(Block, proto);
	console.log(Block);
    Block.init();
    return Block;
}

Blocks.workspaceToCode = function(workspace, language){
    var result = {code: "", eval: ""};

    var generateCode = function(block, indention){
        var type = block.attr('block-type');
        //console.log(block);
        if(type != undefined){
        //console.log(type);
            var toCode = Blocks[language][type];
            if(toCode != undefined){
                var code = toCode(block, indention, generateCode);
                //console.log(code);
                return code;
            }
        }
        return {code: "", eval: ""};
    }

    workspace.children().each(function(i, c){
        var r = generateCode($(c), "");
        result.code += r.code;
        result.eval += r.eval;
    });

    return result;
}
