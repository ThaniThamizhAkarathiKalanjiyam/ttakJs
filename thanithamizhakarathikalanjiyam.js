var searchUrls;

$(document).ready(function () {
    var bseWeb = "https://ThaniThamizhAkarathiKalanjiyam.github.io/";
    var bseSearchDir = "https://ThaniThamizhAkarathiKalanjiyam.github.io/agarathi/";
    var md = window.markdownit();

    init_getJSON = function () {
        $.getJSON("https://thanithamizhakarathikalanjiyam.github.io/ttakJs/urls.json", function (data) {
            searchUrls = data;
            console.log("init_getJSON");
            var sidenav_left_html = "";
            var nav_tabs_content_html = "";

            for (i = 0; i < searchUrls.length; i++) {
                var id = searchUrls[i].id;
                var dict = searchUrls[i].dict;
                var dict_full = searchUrls[i].dict_full;
                var desc = searchUrls[i].desc;
                var kaan = searchUrls[i].kaan;
                var getAllUrlParams_url = window.location.href;
                var kaan_url = getAllUrlParams(getAllUrlParams_url).kaan;
                if (kaan_url === kaan || kaan_url === undefined) {

                    var active_class = "",
                    show_active_class = "";
                    if (i == 0) {
                        active_class = "active";
                        show_active_class = "show active";
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
            }
            $("#sidenav_left").html(sidenav_left_html)
            //$("#nav_tabs_content_html").html(nav_tabs_content_html)
            $("#nav_tabs_content_html").html(nav_tabs_content_html)
            //btnSearch_click(searchUrls)
            init_text_click_event()
        });
    }
    searchWord = function (searchUrl) {

        var id = "#" + searchUrl.id;
        var id_card = searchUrl.id;
        var dict = searchUrl.dict;
        var sep_dict = searchUrl.sep_dict;
        var dict_full = searchUrl.dict_full;
        var desc = searchUrl.desc;
        var kaan = searchUrls[i].kaan;
        //var content = "<h1>" + searchUrl.dict + "</h1>"
        var content = "";
        var url = "";
        if (sep_dict == true) {
            url = bseWeb + searchUrl.dir;
        } else {
            url = bseSearchDir + searchUrl.dir;
        }
        // $(id).html("Please wait . . . ");
        var txtsearchLow = $("#txtsearch").val().toLowerCase()
            var tamil_letters = get_tamil_letters(txtsearchLow);
        var gitHubUrl = "";
        if (searchUrl.id == "ResultDict" ||
            searchUrl.id == "ResultDictTamKal") {
            gitHubUrl = url + tamil_letters[0] + "/" + txtsearchLow
        } else {
            gitHubUrl = url + txtsearchLow
        }
        var pan_id = "#panel_" + id_card;
        $(pan_id).css("display", "none");
        var getAllUrlParams_url = window.location.href;
        var kaan_url = getAllUrlParams(getAllUrlParams_url).kaan;
        if (kaan_url === kaan || kaan_url === undefined) {
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
                    $("#card_text_" + id_card).html(content);
                    //popup_poem("#card_text_" + id_card)
                    $("#card_footer_" + id_card).html("");
                    if (searchUrl.id == "ResultWNDict") {

                        csvJSON_data = JSON.parse(csvJSON(data));
                        $("#card_text_" + id_card).html("");

                        $.each(csvJSON_data, function (url_index, url_value) {                            
                            synset_id = url_value.synset_id;
							ss_type = url_value.ss_type;
							word = url_value.word;
							urlgloss = ("https://thanithamizhakarathikalanjiyam.github.io/iwn/wn_gloss/" + synset_id)
                            if (synset_id !== "") {
                                $.get(urlgloss, function (data) {
                                    JSON_parsed_data = JSON.parse(csvJSON(data));
                                    $ul = $("<ul>");
                                    $.each(JSON_parsed_data, function (JSON_parsed_data_index, JSON_parsed_data_value) {
                                        synset_id = url_value.synset_id;
                                        if (synset_id !== "" && JSON_parsed_data_value.gloss !== undefined) {
                                            $li = $("<li>").html(JSON_parsed_data_value.gloss);
                                            $ul.append($li);
                                        }
                                    });
									$bold_heading  = $("<b>")
									$bold_heading.append(word + " " + ss_type + ".")
									$("#card_text_" + id_card).append($bold_heading);
                                    $("#card_text_" + id_card).append($ul);
                                });
                            }
                        });

                    }
                }
            });
        }
    };

    getAllUrlParams = function (url) {
        // get query string from url (optional) or window
        var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
        // we'll store the parameters here
        var obj = {};
        // if query string exists
        if (queryString) {
            // stuff after # is not part of query string, so get rid of it
            queryString = queryString.split('#')[0];
            // split our query string into its component parts
            var arr = queryString.split('&');
            for (var i = 0; i < arr.length; i++) {
                // separate the keys and the values
                var a = arr[i].split('=');
                // set parameter name and value (use 'true' if empty)
                var paramName = a[0];
                var paramValue = typeof(a[1]) === 'undefined' ? true : a[1];
                // (optional) keep case consistent
                paramName = paramName.toLowerCase();
                if (typeof paramValue === 'string')
                    paramValue = paramValue.toLowerCase();
                // if the paramName ends with square brackets, e.g. colors[] or colors[2]
                if (paramName.match(/\[(\d+)?\]$/)) {
                    // create key if it doesn't exist
                    var key = paramName.replace(/\[(\d+)?\]/, '');
                    if (!obj[key])
                        obj[key] = [];
                    // if it's an indexed array e.g. colors[2]
                    if (paramName.match(/\[\d+\]$/)) {
                        // get the index value and add the entry at the appropriate position
                        var index = /\[(\d+)\]/.exec(paramName)[1];
                        obj[key][index] = paramValue;
                    } else {
                        // otherwise add the value to the end of the array
                        obj[key].push(paramValue);
                    }
                } else {
                    // we're dealing with a string
                    if (!obj[paramName]) {
                        // if it doesn't exist, create property
                        obj[paramName] = paramValue;
                    } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                        // if property does exist and it's a string, convert it to an array
                        obj[paramName] = [obj[paramName]];
                        obj[paramName].push(paramValue);
                    } else {
                        // otherwise add the property
                        obj[paramName].push(paramValue);
                    }
                }
            }
        }
        return obj;
    }

    //var csv is the CSV file with headers
    csvJSON = function (csv) {

        var lines = csv.split("\n");

        var result = [];

        // NOTE: If your columns contain commas in their values, you'll need
        // to deal with those before doing the next step
        // (you might convert them to &&& or something, then covert them back later)
        // jsfiddle showing the issue https://jsfiddle.net/
        var headers = lines[0].split(",");

        for (var i = 1; i < lines.length; i++) {

            var obj = {};
            var currentline = lines[i].split(",");

            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }

            result.push(obj);

        }

        //return result; //JavaScript object
        return JSON.stringify(result); //JSON
    }

    init_text_click_event = function () {
        var getAllUrlParams_url = window.location.href;
        var searchString = getAllUrlParams(getAllUrlParams_url).q
            if (searchString !== undefined) {
                console.log("init_text_click_event")

                $("#txtsearch").val(decodeURIComponent(searchString))
                $("#btnSearch").trigger("click")
            }
    }
    init_click_event = function () {
        for (i = 0; i < searchUrls.length; i++) {
            searchWord(searchUrls[i]);
        }
    };
    $("#btnSearch").click(function () {
        init_click_event()
    });
    var jqxhr = $.when(
            init_getJSON()).then(function () {})
        .done(function () {});
    // Set another completion function for the request above
    jqxhr.always(function () {});
});
