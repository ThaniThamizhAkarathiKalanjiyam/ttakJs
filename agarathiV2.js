$(document).ready(function() {
	
var md = window.markdownit();

searchWord = function() {
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

var gitHubUrl = "https://ThaniThamizhAkarathiKalanjiyam.github.io/agarathi/search/"+tamil_letters[0]+"/"+ txtsearchLow
//var gitHubUrlOpenDict = "https://github.com/ThaniThamizhAkarathiKalanjiyam/agarathi"
	
	$.get(gitHubUrl ,   
	function( data ) {
		if(data.length == 0)
		{
			$( "#ResultDict" ).html("The Result not available");	  
		}else{
			var result = md.render(data);
			//result += "<br/>Thanks <a href="+gitHubUrlOpenDict+">Open Sourced Tamil Dictionary</a>"
			$( "#ResultDict" ).html( result );	  
		}	  
	});	
};


gitHubUrl = "https://thanithamizhakarathikalanjiyam.github.io/ttakJs/tabs.html"
$.get(gitHubUrl ,   
	function( data ) {
		if(data.length == 0)
		{
			$( "#ResultDict" ).html( data );	    
		}	  
	});

$("#btnSearch").click( function(){
	searchWord();
});

$("#txtSearch").keypress( function(){
	if (event.which == 13)
	{
		searchWord();
	}
});

$("#txtSearch").focus();
});
