$(document).ready(function () {

    var searchBaseUrl = "https://thanithamizhakarathikalanjiyam.github.io/"

        $.ajaxSetup({
            beforeSend: () => {
                $("#loading").show();
            },
            complete: () => {
                $("#loading").hide();
            }
        });

    var searchUrls = [];

    var converter = new showdown.Converter();

    wordsearch = function (funcData) {

        var searctTextVal = $.trim($("#txtSearch").val().toLowerCase())

            $.get(funcData.dir + searctTextVal,
                function (ResponseJsonE) {

                //<div id="accordion">
                var accordionDiv = $("<div>")
                    accordionDiv.attr("id", "accordion")

                    //$.each(ResponseJsonE, function (index, value)
                {

                    //<h3>Section 1</h3>
                    var h3Div = $("<h3>")
                        $(h3Div).html(funcData.dict_full)
                        $(accordionDiv).append(h3Div)
                        //<div>
                        //<p>
                        //Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer
                        //ut neque. Vivamus nisi metus, molestie vel, gravida in, condimentum sit
                        //amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo ut
                        //odio. Curabitur malesuada. Vestibulum a velit eu ante scelerisque vulputate.
                        //</p>
						
						let result = ResponseJsonE.startsWith("#");
						
						if(result === true)
						{
							ResponseJsonE = ResponseJsonE.substring(ResponseJsonE.indexOf("\n") + 1) 
						}
                        var htmlVal = converter.makeHtml(ResponseJsonE);
                    var pDiv = $("<p>")
                        pDiv.html(htmlVal)
                        $(accordionDiv).append(pDiv)
                        //</div>
                        //</div>

                }
                //)
                $("#meanings").append(accordionDiv)
                //$( "#accordion" ).accordion();

            });

    }

    updateSearchWords = function (txtSearchLow) {

        if (txtSearchLow !== undefined) {

            var utf_txtSearchLow = decodeURIComponent(txtSearchLow);

            $.ajax({
                url: 'https://docs.google.com/forms/d/e/1FAIpQLSfHQVgPZRpRq2Fegi9LFoibfNtCjLzufxCdqQYqlhL81VnkVA/formResponse',
                type: 'POST',
                dataType: 'jsonp',
                data: {
                    "entry.891892085": utf_txtSearchLow,
                    "entry.1113699608": utf_txtSearchLow,
                    "submit": "Submit",
                    "origin": "*"
                },
                success: function (ResponseJsonE) {},
                error: function () {}
            });

        }

    };

    init_getJSON = function () {
        $.getJSON("https://thanithamizhakarathikalanjiyam.github.io/ttakJs/urls.json", function (url_data) {
            searchUrls = url_data

                console.log(searchUrls)
        });
    }

    $("#btnSearch").click(function () {
        $("#meanings").html("")

        $.each(searchUrls, function (index, value) {
            wordsearch(value)
        })

        var searctTextVal = $.trim($("#txtSearch").val().toLowerCase())
            updateSearchWords(searctTextVal)

    })

    $(".tam_consonant").click(function (event) {

        var tam_consonant_id = "#" + event.target.id
            var tam_consonant_val = $(tam_consonant_id).html()

            var tamvowels = $(".tam_vowel")
            $.each(tamvowels, function (index, element) {

                var tam_vowel_id = "#" + element.id
                    var accent_symbol_val = $(tam_vowel_id).attr("accent_symbol")

                    var changed_uyir_mey = tam_consonant_val + accent_symbol_val
                    $(tam_vowel_id).html(changed_uyir_mey)

            })

    })

    $(".tam_vowel,.tam_consonant").click(function (event) {

        var target_id = "#" + event.target.id

            var tam_letter_html = $(target_id).html()

            appendLet2txtSearch(tam_letter_html)

    })

    appendLet2txtSearch = function (letter, is_vowel) {

        var txtSearchVal = $("#txtSearch").val()

            var lastLetOfText = txtSearchVal[txtSearchVal.length - 1]
            var firstLetOfText = letter[0]

            if (lastLetOfText == firstLetOfText) {
                txtSearchVal = txtSearchVal.slice(0, -1);
            }

            txtSearchVal = txtSearchVal + letter

            $("#txtSearch").val(txtSearchVal)

    }

    var jqxhr = $.when(init_getJSON())
        .then(function () {})
        .done(function () {
            //versol_div("வேர்", ["இடது கிளை", "வலது கிளை"]);
            //$('#jstree_demo_div').jstree();
            // side_extra_info();
        });
    // Set another completion function for the request above
    jqxhr.always(function () {});

})
