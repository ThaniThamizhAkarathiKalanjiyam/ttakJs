$(document).ready(function () {

    var bseWeb = "https://ThaniThamizhAkarathiKalanjiyam.github.io/"
        var bseSearchDir = "https://ThaniThamizhAkarathiKalanjiyam.github.io/agarathi/"
        var md = window.markdownit();
    var searchUrls = []

    init_getJSON = function () {
        $.getJSON("https://thanithamizhakarathikalanjiyam.github.io/ttakJs/urls.json", function (data) {

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

                        nav_tabs_content_html += "<div class='card_div_elem panel panel-" + panColor + "' id='panel_" + id + "' style='display:none;'><div class='panel-heading' id='card_header_" + id + "'>Panel Heading</div><div class='panel-body' id='card_text_" + id + "' style='overflow:auto;'></div></div>"
                }

                $("#sidenav_left").html(sidenav_left_html)
                //$("#nav_tabs_content_html").html(nav_tabs_content_html)
                $("#nav_tabs_content_html").html(nav_tabs_content_html)

                //btnSearch_click(searchUrls)

        });
    }

    $.when(
        init_getJSON()
		).then(function () {
        init_click_event()
    })

});
