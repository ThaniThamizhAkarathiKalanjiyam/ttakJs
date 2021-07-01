$(document).ready(function () {

    GetAgarathiV2 = function (funcData) {
		debugger
       
		$.getJSON("https://thanithamizhakarathikalanjiyam.github.io/ttakJs/tam_letters.json", function (ResponseJsonE) {
			
			$.each(ResponseJsonE.tam_first_letters,function(value, index){
					var option = $("<option>").val(value).html(value)
					$("#sel_first_letter").append(option);
				});
			
		});
    }

    //Initial method call
    var jqxhr = $.when().then(function () {
            GetAgarathiV2()
        });
    // Set another completion function for the request above
    jqxhr.always(function () {
        //Elements event Functionality Starts
        //Elements event Functionality Ends

    });

});
