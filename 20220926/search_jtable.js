
    $(document).ready(function () {
		
		
		
		
		
        $('#DictListContainer').jtable({
            title: 'சொற் பக்கங்கள்',
			paging: true,
            pageSize: 10,
            sorting: true,
            defaultSorting: 'dictionary_term ASC',
            openChildAsAccordion: true,
            actions: {
                listAction: function (postData, jtParams) {
                    
                    return $.Deferred(function ($dfd) {
                      
						api_dbhub_io(
							{
								"dbname":"dictionary_termset_lt_853755.db",//pitchai_dbhub / dictionary_termset_lt_853755.db
								"sql":"select * from dictionary_termset LIMIT "+jtParams.jtPageSize+" OFFSET "+jtParams.jtStartIndex+";",
								"sql_api_cmd":"query",
								"sql_api_call_back":function(jsonObj){
									console.log("test",jsonObj)
									
									var records = {
                                        "Result": "OK",
                                        "Records": [],
										"TotalRecordCount":853755
                                    }
									
									$.each(jsonObj, function (index, value)
									{
										var singleRecord = {}
										$.each(value, function (index1, value1)
										{
											
											// if (value1.Name === "dictionary_term")
											// {
												// var apiResultArrayLoc = $.trim(value1.Value)
													// if (apiResultArray.includes(apiResultArrayLoc) === false)
													// {
														// apiResultArray.push(apiResultArrayLoc)
													// }
											// }
											
											singleRecord[value1.Name]=value1.Value
											// ({
												// value1.Name,
												// value1.Value
											// })
										})
										records.Records.push(singleRecord)
									})
									$dfd.resolve(records);
									
								}
							}
						)
					  
					  });
                },
            },
            fields: {
                dictionary_termset_id: {
                    key: true,
                    list: false
                },
                edhukai: {
                    title: 'எதுகை',
                    width: '30%',        
					list:false
                },
				monai: {
					title: 'மோனை',
					width: '1%',
					list:false,
					display: function (data) {
						var $img = $("<span>")
						$img.addClass("child-opener-image material-icons")
						$img.attr("src", "/Content/img/list_metro.png")
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
					list:false
                },
                dictionary_term: {
                    title: 'சொல்',
                    width: '20%',
					display:function(data){
						
						var aObj = $("<a>")
						aObj.attr("href","https://thanithamizhakarathikalanjiyam.github.io/searche?q="+data.record.dictionary_term)
						aObj.html(data.record.dictionary_term)
						
						return aObj
						
					}
                },
                dictionary_meaning: {
                    title: 'பொருள்',
                    width: '80%'
                }
            }
        });
		$('#DictListContainer').jtable("load");
    });