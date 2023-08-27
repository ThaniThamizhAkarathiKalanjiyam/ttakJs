
    $(document).ready(function () {
        $('#DictListContainer').jtable({
            title: 'சொற் பக்கங்கள்',
            actions: {
                //listAction: '/GettingStarted/PersonList',
                //createAction: '/GettingStarted/CreatePerson',
                //updateAction: '/GettingStarted/UpdatePerson',
                //deleteAction: '/GettingStarted/DeletePerson'
            },
            fields: {
                dictionary_termset_id: {
                    key: true,
                    list: false
                },
                edhukai: {
                    title: 'எதுகை',
                    width: '30%',                   
                },
				monai: {
					title: 'மோனை',
					width: '1%',
					display: function (data) {
						var $img = $("<span>")
						$img.addClass("child-opener-image material-icons")
						$img.attr("src", baseUrl + "/Content/img/list_metro.png")
						$img.attr("title", "Details")

						if(data.record.picked === true){
							$img.html("check_box")
						}else{
							$img.html("crop_square")
						}

						$img.click(function () {

						});
						return $img;
					}
				},
                inai: {
                    title: 'இணை',
                    width: '30%',                   
                },
                dictionary_term: {
                    title: 'சொல்',
                    width: '40%'
                },
                dictionary_meaning: {
                    title: 'பொருள்',
                    width: '20%'
                }
            }
        });
    });