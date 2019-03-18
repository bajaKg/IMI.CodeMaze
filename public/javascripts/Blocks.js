Blocks.block['loop'] = function(){
    this.addInput('type', 'select', {values: ['while', 'until'], change: changeCode});
    this.addInput('condition', 'blocks', {accept: Blocks.RETURN_TYPE.BOOLEAN, maxBlocks: 1});
    this.addText('do');
    this.addInput('do', 'blocks');
    this.setColor(200);
}

Blocks.block['repeat'] = function(){
    this.addText('Repeat');
    this.addInput('times', 'input', {value: 6, change: changeCode});
    this.addText('times');
    this.addInput('do', 'blocks');
    this.setColor(200);
}

Blocks.block['goForward'] = function(){
    this.setName('goForward');
    this.setColor(120);
}

Blocks.block['turnLeft'] = function(){
    this.setName('turnLeft');
    this.setColor(300);
}

Blocks.block['turnRight'] = function(){
    this.setName('turnRight');
    this.setColor(430);
}




Blocks.block['isField'] = function(){
    this.setName('is field in front of me: ');
    this.append(
        '<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" style="width: 80px;">'+
        '<div class="selected field-type-0" value="0"></div>'+
        '<span class="glyphicon glyphicon-chevron-down"></span>'+
        '</button>'+
        '<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">'+
        '<li role="presentation" value="0"><div class="field-type-0"></div></li>'+
        '<li role="presentation" value="1"><div class="field-type-1"></div></li>'+
        '<li role="presentation" value="2"><div class="field-type-2"></div></li>'+
        '<li role="presentation" value="3"><div class="field-type-3"></div></li>'+
        '<li role="presentation" value="4"><div class="field-type-4"></div></li>'+
        '<li role="presentation" value="5"><div class="field-type-5"></div></li>'+
        '<li role="presentation" value="6"><div class="field-type-6"></div></li>'+
        '<li role="presentation" value="7"><div class="field-type-7"></div></li>'+
        '</ul>'
    );
    var self = this;
    this.children('.dropdown-menu').find('li').click(function(){
        var selected = self.children('.dropdown-toggle').find('.selected');
        selected.attr('class', 'selected');
        selected.addClass($(this).find('div').attr('class'));
        selected.attr('value', $(this).attr('value'));
        changeCode();
    });
    this.setReturnType(Blocks.RETURN_TYPE.BOOLEAN);
    this.setColor(0);
}

