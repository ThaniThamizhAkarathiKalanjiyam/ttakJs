$(document).ready(function () {

    var bseSearchDir = "https://ThaniThamizhAkarathiKalanjiyam.github.io/agarathi/"
        var md = window.markdownit();

    searchWord = function (searchUrl) {

        var id = "#" + searchUrl.id
            var dict = searchUrl.dict;
        var dict_full = searchUrl.dict_full;
        var desc = searchUrl.desc;
        //var content = "<h1>" + searchUrl.dict + "</h1>"
        var content = ""
            var url = bseSearchDir + searchUrl.dir
            $(id).html("Please wait . . . ");
        var txtsearchLow = $("#txtsearch").val().toLowerCase()
            var tamil_letters = get_tamil_letters(txtsearchLow);

        $.ajaxSetup({
            error: AjaxError
        });

        function AjaxError(x, e) {
            if (x.status == 0) {
                $(id).html(' Check Your Network.');
            } else if (x.status == 404) {
                content = content + txtsearchLow + ": இச்சொல் " + dict_full + " அகராதியில் இல்லை.";
                $(id).html(content);
            } else if (x.status == 500) {
                $(id).html('Internel Server Error.');
            } else {
                $(id).html('Unknow Error.\n' + x.responseText);
            }
        }
        var gitHubUrl = ""
            if (searchUrl.id == "ResultDict") {
                gitHubUrl = url + tamil_letters[0] + "/" + txtsearchLow
            } else {
                gitHubUrl = url + txtsearchLow
            }

            $.get(gitHubUrl,
                function (data) {
                if (data.length == 0) {
                    content = content + txtsearchLow + ": இச்சொல் " + dict_full + " அகராதியில் இல்லை.";
                } else {
                    var result = md.render(data);
                    content = content + result;
                }
                $(id).html(content);
            });
    };

    $.getJSON("https://thanithamizhakarathikalanjiyam.github.io/ttakJs/urls.json", function (searchUrls) {

        $("#btnSearch").click(function () {
			var txtsearchLow = $("#txtsearch").val().toLowerCase()
            $("#div_intro").html("")
            for (i = 0; i < searchUrls.length; i++) {
                searchWord(searchUrls[i]);
            }
			thodarpudaya_sol(txtsearchLow)
        });

        var sidenav_left_html = ""
            var nav_tabs_content_html = ""

            for (i = 0; i < searchUrls.length; i++) {
                var id = searchUrls[i].id;
                var dict = searchUrls[i].dict;
                var dict_full = searchUrls[i].dict_full;
                var desc = searchUrls[i].desc;
                var active_class = "",
                show_active_class = ""
                    if (i == 0) {
                        active_class = "active"
                            show_active_class = "show active"
                    }

                    sidenav_left_html += "<div class='form-check'><input class='form-check-input' type='checkbox' value='' id='sideLink" + id + "'> <label class='form-check-label' for='defaultCheck1'>" + dict + "</label></div>"

                    nav_tabs_content_html += "<div id='" + id + "'></div>"
            }

            $("#sidenav_left").html(sidenav_left_html)
            $("#nav_tabs_content_html").html(nav_tabs_content_html)
    });

    $("#txtSearch").focus();
	
	thodarpudaya_sol = function(search_word){
		$.getJSON("https://thanithamizhakarathikalanjiyam.github.io/agarathi/ety/etytamildict/"+search_word, function (thod_sol_data) {
			var wordsList = ""
			$.each(thod_sol_data,function(key,val){
				wordsList += val+"<br/>"
			})
			$("#thod_sol").html()
		});
	}

});
