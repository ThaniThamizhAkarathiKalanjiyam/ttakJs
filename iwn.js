$(document).ready(function(){
	
	$("#btnSearch").click(function(){
		 $.ajax({
				url: '../wn_synset/entity',
				type: 'GET',
				success: function (ResponseJsonE) {
					
				},
				error: function () {
					//$dfd.reject();
				}
			});
	})
	
})