$(document).ready(function () {

    GetAgarathiV2 = function (funcData) {
        $.ajax({
            url: 'Process',
            type: 'POST',
            dataType: 'json',
            data: {},
            success: function (ResponseJsonE) {},
            error: function () {}
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
