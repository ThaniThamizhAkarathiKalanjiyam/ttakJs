$(document).ready(function () {

    var bseWeb = "https://ThaniThamizhAkarathiKalanjiyam.github.io/"
        var bseSearchDir = "https://ThaniThamizhAkarathiKalanjiyam.github.io/agarathi/"
        var md = window.markdownit();

    searchWord = function (searchUrl) {

        var id = "#" + searchUrl.id
            var id_card = searchUrl.id
            var dict = searchUrl.dict;
        var sep_dict = searchUrl.sep_dict;
        var dict_full = searchUrl.dict_full;
        var desc = searchUrl.desc;
        //var content = "<h1>" + searchUrl.dict + "</h1>"
        var content = ""
            var url = ""
            if (sep_dict == true) {
                url = bseWeb + searchUrl.dir
            } else {
                url = bseSearchDir + searchUrl.dir
            }
            $(id).html("Please wait . . . ");
        var txtsearchLow = $("#txtsearch").val().toLowerCase()
            var tamil_letters = get_tamil_letters(txtsearchLow);

        var gitHubUrl = ""
            if (searchUrl.id == "ResultDict" ||
                searchUrl.id == "ResultDictTamKal") {
                gitHubUrl = url + tamil_letters[0] + "/" + txtsearchLow
            } else {
                gitHubUrl = url + txtsearchLow
            }
            var pan_id = "#panel_" + id_card
            $(pan_id).css("display", "none")

            $.get(gitHubUrl,
                function (data) {
                if (data.length == 0) {
                    content = content + txtsearchLow + ": இச்சொல் " + dict_full + " அகராதியில் இல்லை.";

                } else {
                    var result = md.render(data);
                    content = content + result;
                    $("#panel_" + id_card).css("display", "block")

                    //$(id).html(content);
                    $("#card_header_" + id_card).html(dict);
                    //$('#card_body_"+ id_card ).html(content);
                    $("#card_title_" + id_card).html(txtsearchLow);
                    $("#card_text_" + id_card).html(replaceIlakText2Links(content));
                    $("#card_footer_" + id_card).html("");
                }
            });
    };

    $.getJSON("https://thanithamizhakarathikalanjiyam.github.io/ttakJs/urls.json", function (searchUrls) {

        $("#btnSearch").click(function () {
            //
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

                    //nav_tabs_content_html += "<div id='" + id + "'></div>"
                    //nav_tabs_content_html += "<div class='card text-left card_div_elem' id='card_div_"+ id +"' style='display:none;'><div class='card-header' id='card_header_"+ id +"'>Featured</div><div class='card-body' id='card_body_"+ id +"'><h5 class='card-title' id='card_title_"+ id +"'>Special title treatment</h5><p class='card-text' id='card_text_"+ id +"'>With supporting text below as a natural lead-in to additional content.</p></div><div class='card-footer text-muted' id='card_footer_"+ id +"'>*-*</div></div>"

                    var panColor = "default"
                    var colInt = i % 6
                    if (colInt == 0) {
                        panColor = "primary"
                    } else if (colInt == 1) {
                        panColor = "success"
                    } else if (colInt == 2) {
                        panColor = "info"
                    } else if (colInt == 3) {
                        panColor = "warning"
                    } else if (colInt == 4) {
                        panColor = "danger"
                    } else {
                        panColor = "default"
                    }

                    nav_tabs_content_html += "<div class='card_div_elem panel panel-" + panColor + "' id='panel_" + id + "' style='display:none;'><div class='panel-heading' id='card_header_" + id + "'>Panel Heading</div><div class='panel-body' id='card_text_" + id + "'></div></div>"
            }

            $("#sidenav_left").html(sidenav_left_html)
            //$("#nav_tabs_content_html").html(nav_tabs_content_html)
            $("#nav_tabs_content_html").html(nav_tabs_content_html)

    });

    $("#txtSearch").focus();

    thodarpudaya_sol = function (search_word) {
        $.getJSON("https://thanithamizhakarathikalanjiyam.github.io/agarathi/ety/etytamildict/" + search_word, function (thod_sol_data) {
            var wordsList = ""
                $.each(thod_sol_data, function (key, val) {
                    cnt = key + 1
                        wordsList += cnt + ". " + val + "&nbsp;"
                })
                $("#thod_sol").html(wordsList)
        });
    }

    var lightbox = $('.lightbox-container'),
    center = function () {
        var T = $(window).height() / 2 - lightbox.height() / 2 + $(window).scrollTop(),
        L = $(window).width() / 2 - lightbox.width() / 2;
        lightbox.css({
            top: T,
            left: L
        }).click(function () {
            $(this).hide();
        });
    };
    $(window).scroll(center);
    $(window).resize(center);

    replaceTheIlakiyaText2Links = function (card_text_id_card) {

        var txtResultDictPathinen = $("#" + card_text_id_card + ">ul>li")
            $.each(txtResultDictPathinen, function (index, value) {
                str = value.innerHTML
                    var patt = /புறம் \d+\/\d+/g;
                var result = str.match(patt);
                $.each(result, function (resultindex, resultvalue) {
                    value.innerHTML = str.replace(resultvalue, "Hi all 3")

                })
            })

    }

    replaceIlakText2Links = function (str) {

        var result_str = str
            var patt = /புறம் \d+\/\d+/g;
        var patt_href = "/purananooru/docs/";

        var result = str.match(patt);
        $.each(result, function (resultindex, resultvalue) {

            //var str = "jhkj7682834";
            var matches = resultvalue.match(/(\d+)/);

            if (matches) {
                $poem_no = matches[0];

				$div = $("<span class='popup_poem'>")
				$div.attr("poem_no", $poem_no)
				$div.attr("patt_href", patt_href)
				$div.html(resultvalue)
				$icon = $("<span class='material-icons'>")
				$icon.html("launch")
				$div.append($icon)
				                
				result_str = result_str.replace(resultvalue, $div[0].outerHTML)
 
            }
        })
        return result_str
    }


$(".popup_poem").click(function(){
	
alert(	$(this).attr("patt_href"))
	
})
});
