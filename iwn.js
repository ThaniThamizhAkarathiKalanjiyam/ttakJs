$(document).ready(function(){
	
	$("#btnSearch").click(function(){
		$txtSearchVal = $("#txtSearch").val()
		 $.ajax({
				url: 'https://thanithamizhakarathikalanjiyam.github.io/iwn/wn_synset/'+$txtSearchVal,
				type: 'GET',
				success: function (ResponseJsonE) {
					$response = JSON.Parse(ResponseJsonE)
					alert($response)
				},
				error: function () {
					//$dfd.reject();
				}
			});
	})
	
})