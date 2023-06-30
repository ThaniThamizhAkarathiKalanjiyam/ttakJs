$(document).ready(function ()
{

    var searchBaseUrl = "https://thanithamizhakarathikalanjiyam.github.io/"

        $.ajaxSetup(
        {
            beforeSend: () =>
            {
                $("#loading").show();
            },
            complete: () =>
            {
                $("#loading").hide();
            }
        }
        );

    var searchUrls = [];

    var converter = new showdown.Converter();

    wordsearch = function (funcData)
    {

        var searctTextVal = $.trim($("#txtSearch").val().toLowerCase())

            $.get(funcData.dir + searctTextVal,
                function (ResponseJsonE)
            {

                var accordionDiv = $("<div>")
                {

                    //<h3>Section 1</h3>
                    var h3Div = $("<h3>")
                        $(h3Div).html(funcData.dict_full)
                        $(accordionDiv).append(h3Div)

                        let result = ResponseJsonE.startsWith("#");

                    if (result === true)
                    {
                        ResponseJsonE = ResponseJsonE.substring(ResponseJsonE.indexOf("\n") + 1)
                    }
                    var htmlVal = converter.makeHtml(ResponseJsonE);
                    var pDiv = $("<p>")
                        $(pDiv).addClass(funcData.class)

                        pDiv.html(htmlVal)
                        $(accordionDiv).append(pDiv)
                }

                $("#meanings").append(accordionDiv)
            }
            );

    }

    updateSearchWords = function (txtSearchLow)
    {

        if (txtSearchLow !== undefined)
        {

            var utf_txtSearchLow = decodeURIComponent(txtSearchLow);

            $.ajax(
            {
                url: 'https://docs.google.com/forms/d/e/1FAIpQLSfHQVgPZRpRq2Fegi9LFoibfNtCjLzufxCdqQYqlhL81VnkVA/formResponse',
                type: 'POST',
                dataType: 'jsonp',
                data:
                {
                    "entry.891892085": utf_txtSearchLow,
                    "entry.1113699608": utf_txtSearchLow,
                    "submit": "Submit",
                    "origin": "*"
                },
                success: function (ResponseJsonE)  {},
                error: function ()  {}
            }
            );

        }

    };

    init_getJSON = function ()
    {
        $.getJSON("https://thanithamizhakarathikalanjiyam.github.io/ttakJs/urls.json", function (url_data)
        {
            searchUrls = url_data

                //console.log(searchUrls)

                getMeaaningForUrlQuery()
        }
        );
    }

    // $("#btnSearch").click(function ()
    // {

    // $("#meanings").html("")

    // var searctTextVal = $.trim($("#txtSearch").val().toLowerCase())

    // drawWordLettersGraph(searctTextVal)
    // kilaichorkal(searctTextVal) //Nov21 2022

    // // $.each(searchUrls, function (index, value) {
    // // wordsearch(value)
    // // })

    // getTamilMeaningAndAddToElem()

    // updateSearchWords(searctTextVal)

    // }
    // )

    $("#btnSearch").click(function ()
    {

        $("#meanings").html("")

        var searctTextVal = $.trim($("#txtSearch").val().toLowerCase())

            //drawWordLettersGraph(searctTextVal)

            getTamilGroupWordsAndAddToElem(
            {
                "searctTextVal": searctTextVal,
                "dbname": "dictionary_termset_lt_853755.db",
                "sql": "select * from tamil_dict1 where dictionary_term='அண்';",
                "resultElement": "#meanings"
            }
            )

            getTamilMeaningAndAddToElem(
            {
                "searctTextVal": searctTextVal,
                "dbname": "dictionary_termset_lt_853755.db",
                "sql": "select * from tamil_dict1 where dictionary_term='" + searctTextVal + "';",
                "resultElement": "#meanings"
            }
            )
            getTamilMeaningAndAddToElem(
            {
                "searctTextVal": searctTextVal,
                "dbname": "dictionary_termset_gt_853755.db",
                "sql": "select * from tamil_dict1 where dictionary_term='" + searctTextVal + "';",
                "resultElement": "#meanings"
            }
            )

            updateSearchWords(searctTextVal)

    }
    )

    getTamilGroupWordsAndAddToElem = function (funcData)
    {
        var fd = new FormData();
        fd.append('dbowner', "pitchai_dbhub");
        fd.append('dbname', funcData.dbname);
        //fd.append('sql', "c2VsZWN0ICogZnJvbSBkaWN0aW9uYXJ5X3Rlcm1zZXQgd2hlcmUgZGljdGlvbmFyeV90ZXJtPSfgroXgrpXgrp7gr43grprgr4fgrrDgrqngr4En");
        //var sql = "select * from tamil_dict1 where dictionary_term='" + funcData.searctTextVal + "';";
        var sql_encoded = $.base64.btoa(funcData.sql, true);
        fd.append('sql', sql_encoded);

        var apiResultArray = "";

        $.ajax(
        {
            url: 'https://api.dbhub.io/v1/query?apikey=2RjMahZ2NN4JrC6kCzzI7HeOF9u',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (jsonObj)
            {
                var obj = $.parseJSON(jsonObj);
                //console.log(obj);
                $.each(obj, function (index, value)
                {

                    //console.log(value)


                    $.each(value, function (index1, value1)
                    {

                        if (value1.Name === "dictionary_term")
                        {
                            apiResult += "\r\n- " + value1.Value
                        }
                        // if (value1.Name === "dictionary_name")
                        // {
                        // if (funcData.dictionary_name == undefined)
                        // {
                        // apiResult.dictionary_name = value1.Value
                        // }
                        // else
                        // {
                        // apiResult.dictionary_name = funcData.dictionary_name
                        // }

                        // }

                    }
                    );
                }
                )
                //addMeaning(funcData, apiResult)
                var accordionDiv = $("<div>")
                    var h3Div = $("<h3>")
                    $(h3Div).html("கிளைச் சொற்கள்")//apiResult.dictionary_name)
                    $(accordionDiv).append(h3Div)
					
                var htmlVal = converter.makeHtml(apiResultArray);
                var pDiv = $("<p>")
                    //$(pDiv).addClass(apiResult.class)

                    pDiv.html(htmlVal)
                    $(accordionDiv).append(pDiv)

                    $(funcData.resultElement).append(accordionDiv)
            }
        }
        );
    }

    getTamilMeaningAndAddToElem = function (funcData)
    {
        var fd = new FormData();
        fd.append('dbowner', "pitchai_dbhub");
        fd.append('dbname', funcData.dbname);
        //fd.append('sql', "c2VsZWN0ICogZnJvbSBkaWN0aW9uYXJ5X3Rlcm1zZXQgd2hlcmUgZGljdGlvbmFyeV90ZXJtPSfgroXgrpXgrp7gr43grprgr4fgrrDgrqngr4En");
        //var sql = "select * from tamil_dict1 where dictionary_term='" + funcData.searctTextVal + "';";
        var sql_encoded = $.base64.btoa(funcData.sql, true);
        fd.append('sql', sql_encoded);

        $.ajax(
        {
            url: 'https://api.dbhub.io/v1/query?apikey=2RjMahZ2NN4JrC6kCzzI7HeOF9u',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (jsonObj)
            {
                var obj = $.parseJSON(jsonObj);
                //console.log(obj);
                $.each(obj, function (index, value)
                {

                    //console.log(value)
                    var apiResult = {};

                    $.each(value, function (index1, value1)
                    {

                        if (value1.Name === "dictionary_meaning")
                        {
                            apiResult.dictionary_meaning = value1.Value
                        }
                        if (value1.Name === "dictionary_name")
                        {
                            if (funcData.dictionary_name == undefined)
                            {
                                apiResult.dictionary_name = value1.Value
                            }
                            else
                            {
                                apiResult.dictionary_name = funcData.dictionary_name
                            }

                        }

                    }
                    );
                    addMeaning(funcData, apiResult)

                }
                )
            }
        }
        );
    }

    addMeaning = function (funcData, apiResult)
    {

        // apiResult.dictionary_termset_id
        // apiResult.dictionary_term
        // apiResult.dictionary_meaning
        // apiResult.dictionaryset_id
        // apiResult.dictionary_name

        var accordionDiv = $("<div>")
            var h3Div = $("<h3>")
            $(h3Div).html(apiResult.dictionary_name)
            $(accordionDiv).append(h3Div)
            var dictionary_meaning = ""
            let result = apiResult.dictionary_meaning.startsWith("#");

        if (result === true)
        {
            dictionary_meaning = $.trim(apiResult.dictionary_meaning.substring(apiResult.dictionary_meaning.indexOf("\n") + 1))
        }
        else
        {
            dictionary_meaning = $.trim(apiResult.dictionary_meaning)
        }

        var htmlVal = converter.makeHtml(dictionary_meaning);
        var pDiv = $("<p>")
            $(pDiv).addClass(apiResult.class)

            pDiv.html(htmlVal)
            $(accordionDiv).append(pDiv)

            $(funcData.resultElement).append(accordionDiv)

    }

    appendMermaidToMeanings = function ()
    {

        // var mermaidDiv = $("<div>")
        // $(mermaidDiv).addClass("mermaid")
        // $("#meanings").append(mermaidDiv)


    }

    $(".tam_consonant").click(function (event)
    {

        var tam_consonant_id = "#" + event.target.id
            var tam_consonant_val = $(tam_consonant_id).html()

            var tamvowels = $(".tam_vowel")
            $.each(tamvowels, function (index, element)
            {

                var tam_vowel_id = "#" + element.id
                    var accent_symbol_val = $(tam_vowel_id).attr("accent_symbol")

                    var changed_uyir_mey = tam_consonant_val + accent_symbol_val
                    $(tam_vowel_id).html(changed_uyir_mey)

            }
            )

    }
    )

    $(".tam_vowel,.tam_consonant").click(function (event)
    {

        var target_id = "#" + event.target.id

            var tam_letter_html = $(target_id).html()

            appendLet2txtSearch(tam_letter_html)

    }
    )

    appendLet2txtSearch = function (letter, is_vowel)
    {

        var txtSearchVal = $("#txtSearch").val()

            var lastLetOfText = txtSearchVal[txtSearchVal.length - 1]
            var firstLetOfText = letter[0]

            if (lastLetOfText == firstLetOfText)
            {
                txtSearchVal = txtSearchVal.slice(0, -1);
            }

            txtSearchVal = txtSearchVal + letter

            $("#txtSearch").val(txtSearchVal)

    }

    getAllUrlParams = function (url)
    {
        // get query string from url (optional) or window
        var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
        // we'll store the parameters here
        var obj = {};
        // if query string exists
        if (queryString)
        {
            // stuff after # is not part of query string, so get rid of it
            queryString = queryString.split('#')[0];
            // split our query string into its component parts
            var arr = queryString.split('&');
            for (var i = 0; i < arr.length; i++)
            {
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
                if (paramName.match(/\[(\d+)?\]$/))
                {
                    // create key if it doesn't exist
                    var key = paramName.replace(/\[(\d+)?\]/, '');
                    if (!obj[key])
                        obj[key] = [];
                    // if it's an indexed array e.g. colors[2]
                    if (paramName.match(/\[\d+\]$/))
                    {
                        // get the index value and add the entry at the appropriate position
                        var index = /\[(\d+)\]/.exec(paramName)[1];
                        obj[key][index] = paramValue;
                    }
                    else
                    {
                        // otherwise add the value to the end of the array
                        obj[key].push(paramValue);
                    }
                }
                else
                {
                    // we're dealing with a string
                    if (!obj[paramName])
                    {
                        // if it doesn't exist, create property
                        obj[paramName] = paramValue;
                    }
                    else if (obj[paramName] && typeof obj[paramName] === 'string')
                    {
                        // if property does exist and it's a string, convert it to an array
                        obj[paramName] = [obj[paramName]];
                        obj[paramName].push(paramValue);
                    }
                    else
                    {
                        // otherwise add the property
                        obj[paramName].push(paramValue);
                    }
                }
            }
        }
        return obj;
    }

    getMeaaningForUrlQuery = function ()
    {

        var searchString = getAllUrlParams(window.location.href).q

            if (searchString !== undefined)
            {
                decode_searchString = decodeURIComponent(searchString)

                    $("#txtSearch").val(decode_searchString)
                    $("#btnSearch").trigger("click")
            }
    }

    drawWordLettersGraph = function (word_for_graph)
    {

        if (word_for_graph === undefined || word_for_graph === "")
        {
            word_for_graph = "தமிழ்";
        }
        var mat_graph = word_for_graph.match(/[ஃ-ஹ]([ா-்]|)/gi);

        if (mat_graph === null)
        {
            graphTD = 'graph TD;\nA["' + word_for_graph + '"]-->B["இது தமிழ் மொழிச் சொல் இல்லை"];'
        }
        else
        {
            var mat_graph_len = (mat_graph.length - 1)

            var graphTD = "graph TD"
                var underscore = "_"

                $.each(mat_graph, function (index, value)
                {
                    //A["ஆ"]-->B["தி"];
                    var index_p1 = index + 1
                        var value_p1 = mat_graph[index_p1]

                        if (index < mat_graph_len)
                        {
                            graphTD += '\n' + underscore + index + '["' + value + '"]-->' + underscore + index_p1 + '["' + value_p1 + '"]'
                        }
                }
                )

                underscore += "_"

                $.each(mat_graph, function (index, value)
                {
                    //A["ஆ"]-->B["தி"];
                    var index_p1 = index + 1
                        var value_p1 = mat_graph[index_p1]

                        if (index === 0)
                        {
                            graphTD += '\n_' + index + '-->' + underscore + index_p1 + '["' + checkIsFirstLetterValid(value) + '"]'
                        }
                        else if (index === mat_graph_len)
                        {
                            graphTD += '\n_' + index + '-->' + underscore + index_p1 + '["' + checkIsLastLetterValid(value) + '"]'
                        }
                        else
                        {
                            graphTD += '\n_' + index + '-->' + underscore + index_p1 + '["' + value + '"]'
                        }
                }
                )

                graphTD = $.trim(graphTD)
        }

        const output = document.querySelector(".mermaid");
        if (output.firstChild !== null)
        {
            output.innerHTML = "";
        }
        const code = graphTD //document.querySelector(" textarea").value.trim();
            let insert = function (code)
        {
            output.innerHTML = code;
        };
        mermaid.render("preparedScheme", code, insert);

    }

    $("#btnEthukai").click(function ()
    {

        //$( "#dialog" ).dialog("open")

    }
    )

    var jqxhr = $.when(init_getJSON())
        .then(function ()  {}
        )
        .done(function ()
        {
            //versol_div("வேர்", ["இடது கிளை", "வலது கிளை"]);
            //$('#jstree_demo_div').jstree();
            // side_extra_info();

            // $( "#dialog" ).dialog( {
            // "autoOpen": false
            // });
        }
        );
    // Set another completion function for the request above
    jqxhr.always(function ()
    {

        //drawWordLettersGraph("தமிழ்")

    }
    );

    checkIsFirstLetterValid = function (value)
    {
        var rule_string = "நன்.102 - 106 \n| முதல் எழுத்து \nஇலக்கணப்படி \n"
            if (frst_letters.indexOf(value) > -1)
            {
                //In the array!
                rule_string += "சரியானது"
            }
            else
            {
                //Not in the array
                rule_string += "சரியானது-இல்லை"
            }

            return rule_string
    }

    checkIsLastLetterValid = function (value)
    {
        var rule_string = "நன்னூல்.107 - 109 | இறுதி எழுத்து இலக்கணப்படி "
            if (lst_letters.indexOf(value) > -1)
            {
                //In the array!
                rule_string += "சரியானது"
            }
            else
            {
                //Not in the array
                rule_string += "சரியானது-இல்லை"
            }

            return rule_string
    }

    var frst_letters = ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ', 'க', 'கா', 'கி', 'கீ', 'கு', 'கூ', 'கெ', 'கே', 'கை', 'கொ', 'கோ', 'கௌ', 'ங', 'ச', 'சா', 'சி', 'சீ', 'சு', 'சூ', 'செ', 'சே', 'சை', 'சொ', 'சோ', 'சௌ', 'ஞ', 'ஞா', 'ஞெ', 'ஞொ', 'த', 'தா', 'தி', 'தீ', 'து', 'தூ', 'தெ', 'தே', 'தை', 'தொ', 'தோ', 'தௌ', 'ந', 'நா', 'நி', 'நீ', 'நு', 'நூ', 'நெ', 'நே', 'நை', 'நொ', 'நோ', 'நௌ', 'ப', 'பா', 'பி', 'பீ', 'பு', 'பூ', 'பெ', 'பே', 'பை', 'பொ', 'போ', 'பௌ', 'ம', 'மா', 'மி', 'மீ', 'மு', 'மூ', 'மெ', 'மே', 'மை', 'மொ', 'மோ', 'மௌ', 'ய', 'யா', 'யு', 'யூ', 'யோ', 'யௌ', 'வ', 'வா', 'வி', 'வீ', 'வெ', 'வே', 'வை', 'வௌ']
    var lst_letters = ['க', 'கா', 'கி', 'கீ', 'கு', 'கூ', 'கே', 'கை', 'கோ', 'கௌ', 'ங', 'ஙா', 'ஙி', 'ஙீ', 'ஙு', 'ஙூ', 'ஙே', 'ஙை', 'ஙோ', 'ச', 'சா', 'சி', 'சீ', 'சு', 'சூ', 'சே', 'சை', 'சோ', 'ஞ்', 'ஞ', 'ஞா', 'ஞி', 'ஞீ', 'ஞு', 'ஞூ', 'ஞே', 'ஞை', 'ஞோ', 'ட', 'டா', 'டி', 'டீ', 'டு', 'டூ', 'டே', 'டை', 'டோ', 'ண்', 'ண', 'ணா', 'ணி', 'ணீ', 'ணு', 'ணூ', 'ணே', 'ணை', 'ணோ', 'த', 'தா', 'தி', 'தீ', 'து', 'தூ', 'தே', 'தை', 'தோ', 'ந்', 'ந', 'நா', 'நி', 'நீ', 'நு', 'நூ', 'நே', 'நை', 'நொ', 'நோ', 'ப', 'பா', 'பி', 'பீ', 'பு', 'பூ', 'பே', 'பை', 'போ', 'ம்', 'ம', 'மா', 'மி', 'மீ', 'மு', 'மூ', 'மே', 'மை', 'மோ', 'ய்', 'ய', 'யா', 'யி', 'யீ', 'யு', 'யூ', 'யே', 'யை', 'யோ', 'ர்', 'ர', 'ரா', 'ரி', 'ரீ', 'ரு', 'ரூ', 'ரே', 'ரை', 'ரோ', 'ல்', 'ல', 'லா', 'லி', 'லீ', 'லு', 'லூ', 'லே', 'லை', 'லோ', 'வ்', 'வ', 'வா', 'வி', 'வீ', 'வு', 'வூ', 'வே', 'வை', 'வோ', 'வௌ', 'ழ்', 'ழ', 'ழா', 'ழி', 'ழீ', 'ழு', 'ழூ', 'ழே', 'ழை', 'ழோ', 'ள்', 'ள', 'ளா', 'ளி', 'ளீ', 'ளு', 'ளூ', 'ளே', 'ளை', 'ளோ', 'ற', 'றா', 'றி', 'றீ', 'று', 'றூ', 'றே', 'றை', 'றோ', 'ன்', 'ன', 'னா', 'னி', 'னீ', 'னு', 'னூ', 'னே', 'னை', 'னோ'];

}
)
