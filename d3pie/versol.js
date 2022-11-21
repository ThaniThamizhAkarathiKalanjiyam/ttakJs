 $(document).ready(function(){

//added with 

kilaichorkal = function(searchword){

//https://raw.githubusercontent.com/ThaniThamizhAkarathiKalanjiyam/agarathi/master/ety/etytamildict/%E0%AE%85

$("#versorkal").html("")//added

if(searchword === undefined || searchword === "")
    {
      searchword = "தமிழ்";
    }

var versolcontent = []
  $.getJSON("https://raw.githubusercontent.com/ThaniThamizhAkarathiKalanjiyam/agarathi/master/ety/etytamildict/"+searchword, 
  	function (responseData) {

  			var per_value =0

  			

            
            $.each(responseData,function(index,responseDatavalue){

            	 per_value = (index + 1) * 5

				if(per_value <= 100){
					versolcontent.push({

						label: responseDatavalue, 
						value: per_value
					})
				}

            })



            var pie = new d3pie("versorkal", {
    header: {
      title: {
        text: "கிளைச்சொற்கள்",
        fontSize: 14
      }
    },
    data: {
      content: versolcontent
    }
});

        });

}





 })
