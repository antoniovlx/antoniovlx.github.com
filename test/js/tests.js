;(function($) {
	ui = {
		loadHome: function(){
			$quiz = $('#quiz');

			$list_test = 
			$('<ul>')
			.attr('class', 'collapse list-unstyled')
			.attr('id', 'testSubmenu')
			.appendTo($('#tests'));

			$table_container = $('<div>').attr('class', 'table-responsive')
			.appendTo($quiz);

			$table = $('<table>')
			.attr('class', 'table table-sm table-hover')
			.html('<thead class="thead-dark"><tr>'+
				'<th>Test</th>'+
				'<th>#</th>'+
				'</tr></thead>')
			.appendTo($table_container);

			$table_body = $('<tbody>').appendTo($table);

			var testNo = []

			for (var i = 1; i <= 25; i++) 
			{
				if(testNo.indexOf(i) == -1){

					$('<li>')
					.attr('class','startTestTema'+ i)
					.html('<a href="#">Tema '+ i +'</a>')
					.appendTo($list_test);

					this.loadContent($table_body, i);
				}

			}
		}, 
		loadContent: function($table_body, i){
			$tr = $('<tr>')
			.html('<td>Tema '+i+'</td>')
			.appendTo($table_body);

			button = $('<td class="startTestTema'+i+'"><button class="btn btn-success">Empezar</button></td></tr>')
			.appendTo($tr);
		}
	};
})(jQuery);