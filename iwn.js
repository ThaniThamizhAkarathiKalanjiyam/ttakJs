$(document).ready(function(){
	
	$("#btnSearch").click(function(){
		$txtSearchVal = $("#txtSearch").val()
		 $.ajax({
				url: 'https://thanithamizhakarathikalanjiyam.github.io/iwn/wn_synset/entity',
				type: 'GET',
				success: function (ResponseJsonE) {
					
					$response = Json.Parse(ResponseJsonE)
				},
				error: function () {
					//$dfd.reject();
				}
			});
	})
	
})