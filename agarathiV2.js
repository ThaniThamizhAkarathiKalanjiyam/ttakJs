$(document).ready(function() {
var searchUrls = [
	{"dict":"ததஅக", "dir":"search/", "id":"ResultDict"},
	{"dict":"சங்கம்", "dir":"tam_con/sanka_ilakkiyam/", "id":"ResultDictSankIlak"},
	{"dict":"தமாகதி", "dir":"tnkt/", "id":"ResultDictTNKT"},
	{"dict":"வடசொல்", "dir":"neela/vasol_tamil/", "id":"ResultDictVTAS"}
]

var bseSearchDir = "https://ThaniThamizhAkarathiKalanjiyam.github.io/agarathi/"
var md = window.markdownit();

searchWord = function(searchUrl) {
	
	var id = "#"+searchUrl.id
	//var content = "<h1>" + searchUrl.dict + "</h1>"
	var content = ""
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
	

	
	for(i = 0; i < searchUrls.length; i++)
	{
		searchWord(searchUrls[i]);
	}
});

	var nav_tabs_html = ""
	var nav_tabs_content_html = ""
	
	for(i = 0; i < searchUrls.length; i++)
	{
		var id  = searchUrls[i].id;
		var dict = = searchUrls[i].dict;
		nav_tabs_html += '<a class="nav-item nav-link active" id="nav-'+id+'-tab" data-toggle="tab" href="#nav-'+id+'" role="tab" aria-controls="nav-'+id+'" aria-selected="true">'+dict+'</a>' 
	}
	
	$("#nav_tab").html(nav_tabs_html)
	

$("#txtSearch").focus();


});
