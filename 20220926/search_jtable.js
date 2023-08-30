
    $(document).ready(function () {
		
getAllDictionary = function(funcData){
	
	api_dbhub_io(
		{
			"dbname":"dictionary_termset_lt_853755.db",
			"sql":"select * from dictionaryset order by dictionary_name;",
			"sql_api_cmd":"query",
			"sql_api_call_back":function(jsonObj,resJsonObjJtable){
								
				$.each(resJsonObjJtable.Records,function(index,value){
					
					var dictOption = $('<option>')
					dictOption.attr("value",value.dictionaryset_id)
					dictOption.html(value.dictionary_name)
					
					$("#selDictID").append(dictOption)
					
				})
				
			}
		}
	)
	
}		


$("#selDictID").on("change",function(event,eventData){
	
	$('#DictListContainer').jtable("load",{
		"dictionaryset_id":$("#selDictID").val(),		
		"selectClause":"search_term AS dictionary_term, search_termset_id AS dictionary_termset_id",
		"fromClause":"dictionary_termset",
		"whereClause":"1=1"
	});
	
})

queryBuilder = function(postData, jtParams){
	
					  var sqlLOC = ""
					  var sqlSelectClause = ""					  
					  var sqlWhereClause = ""
					  var sqlLimitClause = ""
					  
					  var startIndex  = (jtParams.jtStartIndex+jtParams.jtPageSize)
					  if(startIndex >= 853755)
					  {
						  startIndex = startIndex - 853755
					  }
					  
					  if(postData.sqlSelectClause !== undefined && postData.sqlSelectClause !== "")
					  {
						  sqlSelectClause = postData.sqlSelectClause
					  }
					  else{
						sqlSelectClause = "select * from dictionary_termset"
					  }
					  if(postData.sqlLimitClause !== undefined && postData.sqlLimitClause !== "")					  {
						  sqlLimitClause = postData.sqlLimitClause
					  }
					  else{
						sqlLimitClause = " LIMIT "+jtParams.jtPageSize+" OFFSET "+startIndex+";";					  
					  }
					  
					  if(postData.sqlWhereClause !== undefined && postData.sqlWhereClause !== "")					  {
						  sqlWhereClause= postData.sqlWhereClause
					  }
					  else{
						  if(postData != undefined && postData.dictionaryset_id != undefined){
							  sqlWhereClause = " where dictionaryset_id="+postData.dictionaryset_id;					  
						  }
					  }
					  
					  sqlLOC = sqlSelectClause + sqlWhereClause + sqlLimitClause
					  
					  return sqlLOC 
	
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
					  
						api_dbhub_ioV2(
							{
								//"dbname":startIndex<853755?"dictionary_termset_lt_853755.db":"dictionary_termset_gt_853755.db",//pitchai_dbhub / dictionary_termset_lt_853755.db	
								"dbname":postData.dictionaryset_id== -1 ? "twn_pitchaimuthu-2.db":postData.dictionaryset_id<=16?"dictionary_termset_lt_853755.db":"dictionary_termset_gt_853755.db",//pitchai_dbhub / dictionary_termset_lt_853755.db
								//"sql": queryBuilder(postData, jtParams),
								"selectClause":postData.selectClause,
								"fromClause":postData.fromClause,
								"whereClause":postData.whereClause,
								"orderByClause":jtParams.jtSorting,
								"limitClause":jtParams.jtPageSize+" OFFSET "+jtParams.jtStartIndex+";"					  
								,"sql_api_cmd":"query",
								"sql_api_call_back":function(jsonObj,resJsonObjJtable){
									
									//resJsonObjJtable.TotalRecordCount = 1707511
									console.log(resJsonObjJtable)
                                    $dfd.resolve(resJsonObjJtable);
									
								}
							}
						)
					  
					  });
                },
            },
            toolbar: {
			items: [
			
				//{
				//	icon: '/images/excel.png',
				//	text: 'தேடலி',
				//	click: function () {
				//		//perform your custom job...
				//	}
				//},{
				//	icon: '/images/pdf.png',
				//	text: 'அகரமுதலி',
				//	click: function () {
				//		//perform your custom job...
				//	}
				//}
				
				]
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
						$img.attr("target", "_blank")

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
		
}
		
		//Initial method call
var jqxhr = $.when(
getAllDictionary ()
).then(function () {
initDictListContainer()	
$( "#accordSearch" ).accordion();
});
// Set another completion function for the request above
jqxhr.always(function () {
	//Elements event Functionality Starts
	//Elements event Functionality Ends
	$('#DictListContainer').jtable("load",{
		dictionaryset_id : "-1"		,		
		"selectClause":"search_term AS dictionary_term, search_termset_id AS dictionary_termset_id",
		"fromClause":"search_term_popular",
		"whereClause":"1=1"
	});
});
		
		
		
    });