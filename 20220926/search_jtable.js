
    $(document).ready(function () {
		
getAllDictionary = function(funcData){
	
	api_dbhub_io(
		{
			"dbname":"dictionary_termset_lt_853755.db",
			"sql":"select * from dictionaryset order by dictionary_name;",
			"sql_api_cmd":"query",
			"sql_api_call_back":function(jsonObj,resJsonObjJtable){
								
				$.each(resJsonObjJtable,function(index,value){
					
					var dictOption = $('<option>')
					dictOption.attr("value",value.dictionaryset_id)
					dictOption.html(value.dictionary_name)
					
					$("#selDictID").append(dictOption)
					
				})
				
			}
		}
	)
	
}		
		
initDictListContainer = function(){
		
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
                      
					  
					  var startIndex  = (jtParams.jtStartIndex+jtParams.jtPageSize)
					  if(startIndex >= 853755)
					  {
						  startIndex = startIndex - 853755
					  }
					  
						api_dbhub_io(
							{
								"dbname":startIndex<853755?"dictionary_termset_lt_853755.db":"dictionary_termset_gt_853755.db",//pitchai_dbhub / dictionary_termset_lt_853755.db
								"sql":"select * from dictionary_termset LIMIT "+jtParams.jtPageSize+" OFFSET "+startIndex+";",
								"sql_api_cmd":"query",
								"sql_api_call_back":function(jsonObj,resJsonObjJtable){
									
									resJsonObjJtable.TotalRecordCount = 1707511
									
                                    $dfd.resolve(resJsonObjJtable);
									
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
}
		
		//Initial method call
var jqxhr = $.when(
getAllDictionary ()
).then(function () {
initDictListContainer()	
});
// Set another completion function for the request above
jqxhr.always(function () {
	//Elements event Functionality Starts
	//Elements event Functionality Ends
	$("#diagFilterPackOrder").css("display","")
});
		
		
		
    });