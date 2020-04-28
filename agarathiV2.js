$(document).ready(function() {
var searchUrls = [
	{
		"dict": "ததஅக",
		"dict_full": "தனித் தமிழகராதிக் களஞ்சியம்",
		"desc":"இசையினி யாஹூ குழுமம் தொகுத்த அகராதி தொகுப்பு",
		"dir": "search/",
		"id": "ResultDict"
	},
	{
		"dict": "சங்கம்",
		"dict_full": "பாண்டியராஜா தொடரடைவு சங்க இலக்கியம்",
		"desc":"பாண்டியராஜா அவர்களின் சங்க இலக்கிய தொடரடைவு தொகுப்பிலிருந்து உருவாக்கப் பட்டது",
		"dir": "tam_con/sanka_ilakkiyam/",
		"id": "ResultDictSankIlak"
	},
	{
		"dict": "தமாகதி",
		"dict_full": "தமிழ்நாடு மாணவர் கணினித் திட்டம்",
		"desc":"தமிழ்நாடு மாணவர்களுக்கு வழங்கிய மடிக்கணியில் இருக்கும் அகராதி",
		"dir": "tnkt/",
		"id": "ResultDictTNKT"
	},
	{
		"dict": "வடசொல்",
		"dict_full": "வடசொல் தமிழ் அகர வரிசைச் சுருக்கம்",
		"desc":"திருவரங்க நீலாம்பிகை அம்மையார் அவர்களின் வடசொல் தமிழ் அகர வரிசைச் சுருக்கம் தொகுப்பிலிருந்து உருவாக்கப் பட்டது",
		"dir": "neela/vasol_tamil/",
		"id": "ResultDictVTAS"
	}
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
		var dict = searchUrls[i].dict;
		var dict_full = searchUrls[i].dict_full;
		var desc = searchUrls[i].desc;
		var active_class = "",show_active_class = ""
		if(i == 0){
			active_class = "active"
			show_active_class = "show active"
		}
		nav_tabs_html += '<a class="nav-item nav-link '+active_class+'" id="nav-'+id+'-tab" data-toggle="tab" href="#nav-'+id+'" role="tab" aria-controls="nav-'+id+'" aria-selected="true">'+dict+'</a>' 
		nav_tabs_content_html += '<div class="tab-pane fade '+show_active_class+'" id="nav-'+id+'" role="tabpanel" aria-labelledby="nav-'+id+'-tab"><div class="card"><div class="card-body" id="'+id+'"><h1 class="card-title">"'+dict_full+'"</h1><p class="card-text">"'+desc+'"</p></div></div></div>'
	}
	
	$("#nav_tab").html(nav_tabs_html)
	$("#nav_tabContent").html(nav_tabs_content_html)

$("#txtSearch").focus();


});
