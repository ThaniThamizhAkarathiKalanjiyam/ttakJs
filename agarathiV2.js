$(document).ready(function() {
var searchUrls = [
"tam_con/sanka_ilakkiyam/"
]

var bseSearchDir = "https://ThaniThamizhAkarathiKalanjiyam.github.io/agarathi/search/"
var md = window.markdownit();

searchWord = function(searchUrl) {
	$( "#ResultDict" ).html( "Please wait . . . " );
	var txtsearchLow = $("#txtsearch").val().toLowerCase()
	var tamil_letters = get_tamil_letters(txtsearchLow);

	$.ajaxSetup({
        error: AjaxError
    });
	
	function AjaxError(x, e) {
	  if (x.status == 0) {
		$( "#ResultDict" ).html(' Check Your Network.');
	  } else if (x.status == 404) {
		$( "#ResultDict" ).html('Requested URL not found.');
	  } else if (x.status == 500) {
		$( "#ResultDict" ).html('Internel Server Error.');
	  }  else {
		 $( "#ResultDict" ).html('Unknow Error.\n' + x.responseText);
	  }
	}

	if(gitHubUrl == "" || gitHubUrl == undefined)
	{
		gitHubUrl = bseSearchDir + tamil_letters[0]+"/"+ txtsearchLow
	}
	else
	{
		gitHubUrl = bseSearchDir + searchUrl + txtsearchLow
	}
	
	$.get(gitHubUrl ,   
	function( data ) {
		if(data.length == 0)
		{
			$( "#ResultDict" ).html(txtsearchLow + ": இச்சொல் அகராதியில் இல்லை.");	  
		}else{
			var result = md.render(data);
			$( "#ResultDict" ).append( result );	  
		}	  
	});	
};

$("#btnSearch").click( function(){
	$( "#ResultDict" ).html("");
	searchWord()
	for(i = 0; i < searchUrls.length; i++)
	{
		searchWord(searchUrls[i]);
	}
});

$("#txtSearch").focus();
});
