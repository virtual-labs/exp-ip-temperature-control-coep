//var SINGLEACTINGCYLINDER = SINGLEACTINGCYLINDER || {};

$(function () {

//SINGLEACTINGCYLINDER.TC_Characterisation = function(appId, i2pType) {
	
 TC_Characterisation = function(appId, i2pType){
	 
	 var outputValue = 0;
	 var inputValue = 0;
	$("#submit_TC_WaterLevel").prop("hidden", false);
	 $("#TC_graph").prop("hidden", false);

/*	 var lowerSpLevel = 4;
	 var higherSpLevel = 20;
	
	 if(i2pType == "direct"){
		 
		 var lowerOutputLevel = 0.2;
		 var higherOutputLevel = 1;
	 }else{
		 
		 var lowerOutputLevel = 1;
		 var higherOutputLevel = 0.2;
	 }*/

	 var lowerSpLevel = ExpTrackData.tcAppData.tcConfigData.lowerSpanLevel;
	 var higherSpLevel = ExpTrackData.tcAppData.tcConfigData.higherSpanLevel;
	 
	 var lowerOutputLevel  = ExpTrackData.tcAppData.tcConfigData.lowerOutputLevel;
	 var higherOutputLevel = ExpTrackData.tcAppData.tcConfigData.higherOutputLevel;
	 
	 
	var TC_CharacterisationData = {};
	 
	
	var waterlevel = lowerSpLevel;

	var numofReading = 5;
	var TColdreadingArr = [];
	var TCarr_formulaValue = [];
	var TColdreading = [];
	var TCarr_trueread = [];
	var TCarr_actualVal = [];
	var TCarr_stdVal = [];
	var TColdreadingForGraph = [];
	var readingcnt = 0;
	var a = 0;
	var b = 0;
	// oldreading.push(parseFloat(lowerSpLevel));
	// oldreading.push(parseFloat(higherSpLevel));
	
	TC_DefaultErr = randomErr_TC(TC_RandomErrArr);
//	TC_DefaultErr = 40;
//	console.log("TC ERROR "+TC_DefaultErr);

	$("#mainDiv").html('');

	var TC_characterisation = '';
	TC_characterisation += '<div class="col-md-6 col-sm-12" id="canvasMainDiv"><div id="canvas" class="col-md-12 col-sm-12"></div></div>'

			+ '<div class="col-md-6 col-sm-12" id="TC_characterisationDIv">'
			+ '<div id = "TestDiv" >'
			
			+'<h1>TY Characterisation</h1>'
			+'<h6>In this level characterize the TY 100</h6>'
			+ '<div class="slidecontainer" id="TC_Slider">'
			+ '<div class="header">TIC 100 Output (Input  '
			+ lowerSpLevel
			+ '-'
			+ higherSpLevel
			+ '  mA)</div>'
			+ '<input step="1" type="range" min='
			+ lowerSpLevel
			+ ' max='
			+ higherSpLevel
			+ ' value='
			+ lowerSpLevel
			+ ' id="TC_tankLvl">'
			+ '<p>Value: <span id="demo"></span></p>'
			+ '</div>'
			+ '<div class="buttonDiv">'
			+ '<button id="submit_TC_WaterLevel">Submit</button>'
			+ '<button id="TC_graph" >Check Graph</button>'
			+ '<button id="TC_calibration" hidden >Next Level</button><br/>'
			+'<div class="canvasAnimation col-md-12 col-sm-12" id="anim_canvas_direct" style="display:none; width:100%;"></div>'
			+'<div class="canvasAnimation col-md-12 col-sm-12" id="anim_canvas_reverse" style="display:none; width:100%;"></div>'
//			+'<span id="addNozzel" style="curser:pointer;">add</div>'
//			+'<span id="minusNozzel" style="curser:pointer;">minus</div>'
			+ '</div>' + '</div>' + '</div>'
			+'<div class="col-md-6 col-sm-12" id = "TestNextDiv" style="display:none">'
			+'<div >'

	$(mainDiv).html(TC_characterisation);

	var slider = document.getElementById("TC_tankLvl");
	var output = document.getElementById("demo");
	output.innerHTML = slider.value;

	slider.oninput = function() {
		output.innerHTML = this.value;
	}
   
	$('#submit_TC_WaterLevel')
			.on(
					'click',
					function() {
						
						waterlevel = slider.value;
						
						
						if ($.inArray(parseFloat(waterlevel), TColdreading) >= 0) {
							alertify.alert('This value reading is already present.  Please select another value for reading');
						} else {
							$("#TC_graph").prop("hidden", false);
							
							var stdtrueReading = ((waterlevel - lowerSpLevel) * 0.05);
								
						
							if(i2pType == "direct")
							{
									var standardVal = TC_calStdValforDirect(stdtrueReading,
											higherSpLevel, lowerSpLevel);
//									console.log(standardVal);
									
							}
							
							if(i2pType == "reverse"){
								
								var standardVal = TC_calStdValforReverse(stdtrueReading,
										higherSpLevel, lowerSpLevel);
//								console.log(standardVal);
								
							}
						
							var trueReading = ((waterlevel - lowerSpLevel) * 100)
							/ (higherSpLevel - lowerSpLevel);	
							
							var closestValue = TC_findColsetValue(trueReading, TC_trueReading_arr);
							var idx = TC_trueReading_arr.indexOf(closestValue);

							var formulaVal = TC_applyFormula(closestValue, idx,
									trueReading).toFixed(3);

							
							if(i2pType == "direct")
							{
								var actualVal = TC_calActualValforDirect(formulaVal,
										higherSpLevel, lowerSpLevel);
									
							}
							
							if(i2pType == "reverse"){
								
								var actualVal = TC_calActualValforReverse(formulaVal,
										higherSpLevel, lowerSpLevel);
								
							}
							
							
//					        console.log("selected value"+trueReading.toFixed(3) +"  std ans"+standardVal+"  closet val " +closestValue+"    formula applied var"+formulaVal+"   actual val with error "+actualVal);

							TColdreadingArr.push(parseFloat(waterlevel));

							TColdreading.push(parseFloat(waterlevel));
							TColdreadingForGraph.push(parseFloat(waterlevel));
//							TColdreading.sort(function(a, b) {
//								return a - b
//							});

							TCarr_formulaValue.push(parseFloat(formulaVal));
							TCarr_formulaValue.sort(function(a, b) {
								return a - b
							});
							
//							TCarr_trueread.push(parseFloat(trueread));

							TCarr_actualVal.push(parseFloat(actualVal));
//							 console.log("arr true reading sorted "+TColdreading);
//							 console.log("arr Actual values  not  sorted"+TCarr_actualVal);
//							TCarr_actualVal.sort(function(a, b) {
//								return a - b
//							});

							TCarr_stdVal.push(parseFloat(standardVal));							
//							TCarr_stdVal.sort(function(a, b) {
//								return a - b
//							});
//							 console.log("arr true reading unsorted "+TColdreadingArr);	
//							console.log("arr formula values sorted "+TCarr_formulaValue);
							
//							 console.log("arr true reading sorted "+TColdreading);
//							 console.log(TCarr_actualVal);
//							 console.log("arr Standard values sorted"+TCarr_stdVal);
							
							 
							var TC_IOtable = '';
							if (readingcnt == 0) {

								TC_IOtable += '<div class="row"><div id = "IOtable" class="col-md-12">'
										+ '<table id="table_IO" class="table table-striped table-bordered" style="width:100%">'
										+ '<thead>'
										+ '<tr>'
										+ '<th>Reading No.</th>'
										+ '<th>	Input (in mA)</th>'
										+ '<th>Output (in kg/cm²)</th>'
										+ '</tr>'
										+ '</thead>'

										+ '<tbody id="tablebody_IO">'
										+ '<tr><td>'
										+ (readingcnt + 1)
										+ '</td><td>'
										+ waterlevel
										+ '</td><td>'
										+ actualVal
										+ '</td></tr>'

										+ '</tbody>'

										+ '</table>'
										+ '</div>'
										+ '<div id="TC_chartContainer" class="col-md-12"style="height: 400px; width: 90%; padding:0 5%" hidden></div></div>'

								readingcnt++;

								$(TestDiv).append(TC_IOtable);


								
							} else {
								var table = $('#table_IO').DataTable({
									 "pageLength" : 5,
								        dom: 'Bfrtip',
								        "bDestroy": true,
									title : 'Data export',
									buttons : [ {
										extend : 'excelHtml5',
										title : 'TY 100 Characterisation value'

									}, {
										extend : 'pdfHtml5',
										title : 'TY 100 Characterisation value'
									} ]
								});
								table.row
										.add(
												[ readingcnt + 1, waterlevel,
														actualVal ]).draw();
								table.page('last').draw('page');
								+'</div>';

								readingcnt++;


								

							}
						}
						inputValue = waterlevel;
						outputValue = actualVal;
						if(i2pType == "direct"){
							paper.clear();
							 ItoPconveter(inputValue, outputValue);
							 }else{
								 paper.clear();
								 ItoPconveter_reverse(inputValue,outputValue);
							 }
					});

	$('#TC_graph')
			.on(
					'click',
					function() {

						if (readingcnt < numofReading) {

							alertify.alert("Please take at least " + numofReading
									+ " readings");
						}

						
						
						if (readingcnt >= numofReading) {
							$("#TC_chartContainer").prop("hidden", false);	
							window.scrollTo(0,$('#TC_characterisationDIv').height());
					//		TColdreadingForGraph.push(parseFloat(waterlevel));
							TColdreadingForGraph.sort(function(a, b) {
								return a - b
							});


							var OldValue = [];
							var StdValue = [];
							for (var j = 0; j < TColdreadingForGraph.length; j++) {
								var olValueJson = {
									x : TColdreadingForGraph[j],
									y : TCarr_actualVal[TColdreading.indexOf(TColdreadingForGraph[j])],
									markerType : "circle",
									markerSize : 10

								};
								OldValue.push(olValueJson);
							}
							
							for (var j = 0; j < TColdreadingForGraph.length; j++) {
								var olValueJson1 = {
									x : TColdreadingForGraph[j],
									y : TCarr_stdVal[TColdreading.indexOf(TColdreadingForGraph[j])],
									markerType : "circle",
									markerSize : 10

								};
								StdValue.push(olValueJson1);
							}
							// console.log(OldValue);
							var chart = new CanvasJS.Chart("TC_chartContainer",
									{
										animationEnabled : true,
										theme : "light2",
										title : {
											text : "Temperature Control System (TY 100)",
											fontSize : 20,
										},

										axisX : {
											title : "Input(mA)",
											crosshair : {
												enabled : true,
												snapToDataPoint : true
											},
										// ticks: {suggestedMin: 2, max:6}
										},
										axisY : {
											title : "Output(kg/cm²)",
											minimum : -0.5,
											maximum : 1.5
										},

										toolTip : {
											shared : true
										},
										legend : {
											cursor : "pointer",
											verticalAlign : "bottom",
											horizontalAlign : "right",
											dockInsidePlotArea : true,
											itemclick : toogleDataSeries
										},
										data : [ {
											type : "scatter",
											showInLegend : true,
											name : "Observed Output",
											markerType : "circle",
											// xValueFormatString: "DD MMM,
											// YYYY",
											color : "#F08080",

											dataPoints : OldValue 
										}, {
											type : "line",
											showInLegend : true,
											name : "Standard Output",
											// lineDashType: "dash",
											dataPoints : [ {
												x : lowerSpLevel,
												y : lowerOutputLevel 
											}, {
												x : higherSpLevel,
												y : higherOutputLevel
											} ]
										}
										/*, {
											type : "scatter",
											showInLegend : true,
											name : "Standered Output",
											markerType : "circle",
											// xValueFormatString: "DD MMM,
											// YYYY",
											color : "#000000",

											dataPoints : StdValue
										},*/ 
										
										]
									});
							chart.render();

							function toogleDataSeries(e) {
								if (typeof (e.dataSeries.visible) === "undefined"
										|| e.dataSeries.visible) {
									e.dataSeries.visible = false;
								} else {
									e.dataSeries.visible = true;
								}
								chart.render();
							}
							 $("#TC_calibration").prop("hidden", false);
							 						}
	     

					});

	$('#TC_calibration').on('click', function() {

		if(TColdreadingForGraph.indexOf(lowerSpLevel) == -1){
			
			alertify.alert("Please select lower span value and plot the graph again");
			$("#TC_calibration").prop("hidden", true);
			$("#TC_graph").prop("hidden", true);			
			$("#TC_chartContainer").html('');
			
		}else if(TColdreadingForGraph.indexOf(higherSpLevel) == -1){
			
			alertify.alert("Please select higher span value and plot the graph again");
			$("#TC_calibration").prop("hidden", true);
			$("#TC_graph").prop("hidden", true);	
			$("#TC_chartContainer").html('');
		
			
		}else{
			
			TC_CharacterisationData.TCreading = TColdreading;
			TC_CharacterisationData.TCactualVal = TCarr_actualVal;
			TC_CharacterisationData.TCstdVal = TCarr_stdVal;
			
//			console.log(TC_CharacterisationData);
			
		//	TC_appData.tcCharactData = TC_CharacterisationData;
			
			ExpTrackData.tcCharactData = TC_CharacterisationData;
			
//			console.log(ExpTrackData);
			if(i2pType == "direct"){
			TC_calibrationFun_Direct(i2pType, lowerSpLevel, higherSpLevel, TColdreading, TCarr_actualVal, TCarr_stdVal, lowerOutputLevel, higherOutputLevel);
			}
			
			if(i2pType == "reverse"){
				
			TC_calibrationFun_Reverse(i2pType ,lowerSpLevel, higherSpLevel, TColdreading, TCarr_actualVal, TCarr_stdVal, lowerOutputLevel, higherOutputLevel);	
			}

		}
		
		

	});

	
	
 if(i2pType == "direct"){
	 ItoPconveter(inputValue, outputValue);
	 }else{
		 ItoPconveter_reverse(inputValue, outputValue);
	 }


}

});
















