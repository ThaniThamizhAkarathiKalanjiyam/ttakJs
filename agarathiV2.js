$(document).ready(function () {

    GetAgarathiV2 = function (funcData) {

        $.getJSON("https://thanithamizhakarathikalanjiyam.github.io/ttakJs/tam_letters.json", function (ResponseJsonE) {

            $.each(ResponseJsonE.tam_first_letters, function (index, value) {

                $('#sel_first_letter').append($('<option>', {
                        value: value,
                        text: value
                    }));
            });

            $.each(ResponseJsonE.tam_last_letters, function (index, value) {

                $('#sel_last_letter').append($('<option>', {
                        value: value,
                        text: value
                    }));
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
