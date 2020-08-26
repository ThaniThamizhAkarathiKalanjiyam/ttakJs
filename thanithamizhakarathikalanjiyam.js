$(document).ready(function () {

    var bseWeb = "https://ThaniThamizhAkarathiKalanjiyam.github.io/";
    var bseSearchDir = "https://ThaniThamizhAkarathiKalanjiyam.github.io/agarathi/";
    var md = window.markdownit();
    var searchUrls = [];

    init_getJSON = function () {
        $.getJSON("https://thanithamizhakarathikalanjiyam.github.io/ttakJs/urls.json", function (data) {
            searchUrls = data;
            var sidenav_left_html = "";
            var nav_tabs_content_html = "";

            for (i = 0; i < searchUrls.length; i++) {
                var id = searchUrls[i].id;
                var dict = searchUrls[i].dict;
                var dict_full = searchUrls[i].dict_full;
                var desc = searchUrls[i].desc;
                var active_class = "",
                show_active_class = "";
                if (i == 0) {
                    active_class = "active"
                        show_active_class = "show active"
                }

                sidenav_left_html += "<div class='form-check'><input class='form-check-input' type='checkbox' value='' id='sideLink" + id + "'> <label class='form-check-label' for='defaultCheck1'>" + dict + "</label></div>"

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

                    nav_tabs_content_html += "<div class='card_div_elem panel panel-" + panColor + "' id='panel_" + id + "' style='display:block;'><div class='panel-heading' id='card_header_" + id + "'>Panel Heading</div><div class='panel-body' id='card_text_" + id + "' style='overflow:auto;'></div></div>"
            }

            $("#sidenav_left").html(sidenav_left_html)
            //$("#nav_tabs_content_html").html(nav_tabs_content_html)
            $("#nav_tabs_content_html").html(nav_tabs_content_html)

            //btnSearch_click(searchUrls)

        });
    }

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
            // $(id).html("Please wait . . . ");
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

                    $("#card_header_" + id_card).html(dict);
                    $("#card_header_" + id_card).append("<span class='material-icons copy_content_str' title='Copy'>content_copy</span>");

                    $("#card_title_" + id_card).html(txtsearchLow);
                    $("#card_text_" + id_card).html(replaceIlakText2Links(content));
                    popup_poem("#card_text_" + id_card)
                    $("#card_footer_" + id_card).html("");

                    if (searchUrl.id == "ResultWNDict") {}
                }
            });

    };

    init_click_event = function () {
        for (i = 0; i < searchUrls.length; i++) {
            searchWord(searchUrls[i]);
        }
    };

    $("#btnSearch").click(function () {
        init_click_event()
    });

    $.when(
        init_getJSON()).then(function () {});

});
