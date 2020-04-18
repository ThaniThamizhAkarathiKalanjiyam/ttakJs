$(document).ready(function() {
var searchUrls = [
	{"dict":"தனித் தமிழகராதிக் களஞ்சியம்", "dir":"search/", "id":"ResultDict"},
	{"dict":"பாண்டியராஜா தொடரடைவு சங்க இலக்கியம்", "dir":"tam_con/sanka_ilakkiyam/", "id":"ResultDictSankIlak"}
]

var bseSearchDir = "https://ThaniThamizhAkarathiKalanjiyam.github.io/agarathi/"
var md = window.markdownit();

searchWord = function(searchUrl) {
	
	var id = "#"+searchUrl.id
	var content = "<h1>" + searchUrl.dict + "</h1>" + "<br/>"
	var url = bseSearchDir + searchUrl.dir
	$( id ).html( "Please wait . . . " );
	var txtsearchLow = $("#txtsearch").val().toLowerCase()
	var tamil_letters = get_tamil_letters(txtsearchLow);

	$.ajaxSetup({
        error: AjaxError
    });
	
	function AjaxError(x, e) {
	  if (x.status == 0) {
		$( id ).html(' Check Your Network.');
	  } else if (x.status == 404) {
			content = content + txtsearchLow + ": இச்சொல் அகராதியில் இல்லை.";
			$( id ).html(content);
	  } else if (x.status == 500) {
		$( id ).html('Internel Server Error.');
	  }  else {
		 $( id ).html('Unknow Error.\n' + x.responseText);
	  }
	}
	var gitHubUrl = ""
	if(searchUrl.id == "ResultDict")
	{
		gitHubUrl = url +  tamil_letters[0]+"/"+ txtsearchLow
	}
	else
	{
		gitHubUrl = url + txtsearchLow
	}
	
	$.get(gitHubUrl ,   
	function( data ) {
		if(data.length == 0)
		{
			 content = content + txtsearchLow + ": இச்சொல் அகராதியில் இல்லை.";	  
		}else{
			var result = md.render(data);
			content = content +  result ;	  
		}	
		$( id ).html(content);		
	});	
};

$("#btnSearch").click( function(){
	//$( "#ResultDict" ).html("");
	for(i = 0; i < searchUrls.length; i++)
	{
		searchWord(searchUrls[i]);
	}
});

$("#txtSearch").focus();
});
