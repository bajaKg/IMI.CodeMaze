window.onload = function()
		{
			$.ajax({
				url: 'getUsers',
				type: 'get',
				dataType: 'json',
				success: function (data) {
					var tabela = $("#korisnici");
					var vrste = "<tr><th>Name</th><th>Last name</th><th>Show data</th></tr>";
					$.each(data, function(idx,item) {
						vrste += "<tr><td>" + item.ime + "</td>" + "<td>"+"&nbsp"+ item.prezime +"</td><td><button type='button'  onclick='showUser("+item.id+")'>Show data</button></td></tr>";
						
					});
					tabela.html(vrste);
				}				
			});	        
        }


         function showUser(id)
        {
			var dataForSend = {id : id};
			$.ajax({
				url: 'showUser',
				type: 'post',
				dataType: 'json',
				data: dataForSend,
				success: function (data) {
					var tabela = $("#korisnik");
					var vrste = "<tr><th>Level</th><th>Code</th><th>Number of commands</th></tr>";
					$.each(data, function(idx,item) {
						var jsontext = item.kod;
						var kodiranje = JSON.parse(jsontext);
						var i = kodiranje.length;
						var s="";
						for (var j = 0;j<i;j++){
							if (kodiranje[j].block_type == "loop"){
							s+=kodiranje[j].type;
							s+="(";
							s+=kodiranje[j].condition.value;
							s+="){ ";
							var k = kodiranje[j].do.length;
							for (var l = 0;l<k;l++){
								if (kodiranje[j].do[l].block_type == "loop"){
									s+=kodiranje[j].do[l].type;
									s+="(";
									s+=kodiranje[j].do[l].condition.value;
									s+="){ ";
									var k = kodiranje[j].do[l].do.length
									for (var p = 0; p <k ; p++) {
										s+=kodiranje[j].do[l].do[p].block_type;
										s+=";";
									}
						} else {
							s+=kodiranje[j].do[l].block_type;
							s+=";";
							s+="	";
								}
							
						s+=" }";
						}
					}
							else if (kodiranje[j].block_type == "repeat") {
								s+=kodiranje[j].block_type;
								s+="(";
								s+=kodiranje[j].times;
								s+="){ ";
								var k = kodiranje[j].do.length;
								for (var l = 0;l<k;l++){
									if(kodiranje[j].do[l].block_type == "repeat"){
										s+=kodiranje[j].do[l].block_type;
										s+="(";
										s+=kodiranje[j].do[l].times;
										s+="){ ";
										var m = kodiranje[j].do[l].do.length;
											for (var p = 0; p<m; p++){
												s+=kodiranje[j].do[l].do[p].block_type;
												s+=";";
												s+="	";
											}
									}
									else {
										s+=kodiranje[j].do[l].block_type;
										s+=";";
										s+="	";
									}
						
								s+=" }";
								}
							}
								else{

							s+=kodiranje[j].block_type;
							s+=";";
						}
							
							s+="\n";
						}

						vrste += "<tr><td>" + item.IdNivoa + "</td>" + "<td>"+s+"</td><td>"+ item.brKomandi+"</td></tr>"
					});					
				
					tabela.html(vrste);
				}				
			});	
		}
