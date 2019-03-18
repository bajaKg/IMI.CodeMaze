window.onload = function()
		{
			var string="";
			$.ajax({
				url: 'getKorisnici',
				type: 'get',
				dataType: 'json',
				success: function (data) {
					var tabela = $("#korisnici");
					var vrste = "<tr><th>Name</th><th>Last name</th><th>Email</th><th>Username</th><th>Professor</th><th>Delete</th></tr>";
					$.each(data, function(idx,item) {
						if (item.role == 0){
							vrste += "<tr><td>"+item.ime+"</td><td>"+item.prezime+"</td><td>"+item.email+"</td><td>"+item.username+"</td><td><input type='checkbox' onChange='save("+item.id+",this.checked);' </td><td><button type='button'  onclick='deleteUser("+item.id+");location.reload();'>Delete user</button></td></tr>";
						}
						
						if (item.role == 1){
							vrste += "<tr><td>"+item.ime+"</td><td>"+item.prezime+"</td><td>"+item.email+"</td><td>"+item.username+"</td><td><input type='checkbox' checked='checked' onChange='save("+item.id+",this.checked);'</td><td><button type='button'  onclick='deleteUser("+item.id+");location.reload();'>Delete user</button></td></tr>";	
						}

					});
					tabela.html(vrste);
				}				
			});	        
        }
		
		
function save(id)
        {
			var dataForSend = {id : id};
			$.ajax({
				url: 'save',
				type: 'post',
				dataType: 'json',
				data: dataForSend,
				success: function (data) {
					var tabela = $("#porukaPromene");
					var vrste ="";
					$.each(data, function(idx,item) {
						vrste ="Uspesno ste promenili prava pristupa"; 
						  setTimeout(function(){
						  	$("#porukaPromene").hide("slow");
						  	}, 3000);
						  $("#porukaPromene").show("slow");
					});					
					tabela.html(vrste);
				}				
			});	
		}



		
function deleteUser(id)
        {
			var dataForSend = {id : id};
			$.ajax({
				url: 'deleteUser',
				type: 'post',
				dataType: 'json',
				data: dataForSend,
				success: function (data) {
					var tabela = $("#porukaPromene");
					var vrste ="";
					$.each(data, function(idx,item) {
						vrste ="Uspesno ste obrisali korisnika!"; 
						  setTimeout(function(){
						  	$("#porukaPromene").hide("slow");
						  	}, 3000);
						  $("#porukaPromene").show("slow");
					});					
					tabela.html(vrste);
				}				
			});	
		}








