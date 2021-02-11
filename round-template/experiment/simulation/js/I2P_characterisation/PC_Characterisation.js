//var SINGLEACTINGCYLINDER = SINGLEACTINGCYLINDER || {};

$(function () {

//SINGLEACTINGCYLINDER.PC_Characterisation = function(appId, i2pType) {
	
 PC_Characterisation = function(appId, i2pType){
	 
	 var outputValue = 0;
	 var inputValue = 0;
	$("#submit_PC_WaterLevel").prop("hidden", false);
	 $("#PC_graph").prop("hidden", false);

	/* var lowerSpLevel = 4;
	 var higherSpLevel = 20;
	
	 if(i2pType == "direct"){
		 
		 var lowerOutputLevel = 0.2;
		 var higherOutputLevel = 1;
	 }else{
		 
		 var lowerOutputLevel = 1;
		 var higherOutputLevel = 0.2;
	 }*/

	 var lowerSpLevel = ExpTrackData.pcAppData.pcConfigData.lowerSpanLevel;
	 var higherSpLevel = ExpTrackData.pcAppData.pcConfigData.higherSpanLevel;
	 
	 var lowerOutputLevel  = ExpTrackData.pcAppData.pcConfigData.lowerOutputLevel;
	 var higherOutputLevel = ExpTrackData.pcAppData.pcConfigData.higherOutputLevel;
	 
	 
	var PC_CharacterisationData = {};
	 
	
	var waterlevel = lowerSpLevel;

	var numofReading = 5;
	var PColdreadingArr = [];
	var PCarr_formulaValue = [];
	var PColdreading = [];
	var PCarr_trueread = [];
	var PCarr_actualVal = [];
	var PCarr_stdVal = [];
	var PColdreadingForGraph = [];
	var readingcnt = 0;
	var a = 0;
	var b = 0;
	// oldreading.push(parseFloat(lowerSpLevel));
	// oldreading.push(parseFloat(higherSpLevel));
	
	PC_DefaultErr = randomErr_PC(PC_RandomErrArr);
//	PC_DefaultErr = 40;
//	console.log("PC ERROR "+PC_DefaultErr);

	$("#mainDiv").html('');

	var PC_characterisation = '';
	PC_characterisation += '<div class="col-md-6 col-sm-12" id="canvasMainDiv"><div id="canvas" class="col-md-12 col-sm-12"></div></div>'

			+ '<div class="col-md-6 col-sm-12" id="PC_characterisationDIv">'
			+ '<div id = "TestDiv" >'
			
			+'<h1>PY Characterisation</h1>'
			+'<h6>In this level characterize the PY 100</h6>'
			+ '<div class="slidecontainer" id="PC_Slider">'
			+ '<div class="header">PIC 100 Output (Input  '
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
			+ ' id="PC_tankLvl">'
			+ '<p>Value: <span id="demo"></span></p>'
			+ '</div>'
			+ '<div class="buttonDiv">'
			+ '<button id="submit_PC_WaterLevel">Submit</button>'
			+ '<button id="PC_graph" >Check Graph</button>'
			+ '<button id="PC_calibration" hidden >Next Level</button><br/>'
			+'<div class="canvasAnimation col-md-12 col-sm-12" id="anim_canvas_direct" style="display:none; width:100%;"></div>'
			+'<div class="canvasAnimation col-md-12 col-sm-12" id="anim_canvas_reverse" style="display:none; width:100%;"></div>'
//			+'<span id="addNozzel" style="curser:pointer;">add</div>'
//			+'<span id="minusNozzel" style="curser:pointer;">minus</div>'
			+ '</div>' + '</div>' + '</div>'
			+'<div class="col-md-6 col-sm-12" id = "TestNextDiv" style="display:none">'
			+'<div >'

	$(mainDiv).html(PC_characterisation);

	var slider = document.getElementById("PC_tankLvl");
	var output = document.getElementById("demo");
	output.innerHTML = slider.value;

	slider.oninput = function() {
		output.innerHTML = this.value;
	}
   
	$('#submit_PC_WaterLevel')
			.on(
					'click',
					function() {
						
						waterlevel = slider.value;
						
						
						if ($.inArray(parseFloat(waterlevel), PColdreading) >= 0) {
							alertify.alert('This value reading is already present.  Please select another value for reading');
						} else {
							$("#PC_graph").prop("hidden", false);
							
							var stdtrueReading = ((waterlevel - lowerSpLevel) * 0.05);
								
						
							if(i2pType == "direct")
							{
									var standardVal = PC_calStdValforDirect(stdtrueReading,
											higherSpLevel, lowerSpLevel);
//									console.log(standardVal);
									
							}
							
							if(i2pType == "reverse"){
								
								var standardVal = PC_calStdValforReverse(stdtrueReading,
										higherSpLevel, lowerSpLevel);
//								console.log(standardVal);
								
							}
						
							var trueReading = ((waterlevel - lowerSpLevel) * 100)
							/ (higherSpLevel - lowerSpLevel);	
							
							var closestValue = PC_findColsetValue(trueReading, PC_trueReading_arr);
							var idx = PC_trueReading_arr.indexOf(closestValue);

							var formulaVal = PC_applyFormula(closestValue, idx,
									trueReading).toFixed(3);

							
							if(i2pType == "direct")
							{
								var actualVal = PC_calActualValforDirect(formulaVal,
										higherSpLevel, lowerSpLevel);
									
							}
							
							if(i2pType == "reverse"){
								
								var actualVal = PC_calActualValforReverse(formulaVal,
										higherSpLevel, lowerSpLevel);
								
							}
							
							
//					        console.log("selected value"+trueReading.toFixed(3) +"  std ans"+standardVal+"  closet val " +closestValue+"    formula applied var"+formulaVal+"   actual val with error "+actualVal);

							PColdreadingArr.push(parseFloat(waterlevel));

							PColdreading.push(parseFloat(waterlevel));
							PColdreadingForGraph.push(parseFloat(waterlevel));
//							PColdreading.sort(function(a, b) {
//								return a - b
//							});

							PCarr_formulaValue.push(parseFloat(formulaVal));
							PCarr_formulaValue.sort(function(a, b) {
								return a - b
							});
							
//							PCarr_trueread.push(parseFloat(trueread));

							PCarr_actualVal.push(parseFloat(actualVal));
//							 console.log("arr true reading sorted "+PColdreading);
//							 console.log("arr Actual values  not  sorted"+PCarr_actualVal);
//							PCarr_actualVal.sort(function(a, b) {
//								return a - b
//							});

							PCarr_stdVal.push(parseFloat(standardVal));							
//							PCarr_stdVal.sort(function(a, b) {
//								return a - b
//							});
//							 console.log("arr true reading unsorted "+PColdreadingArr);	
//							console.log("arr formula values sorted "+PCarr_formulaValue);
							
//							 console.log("arr true reading sorted "+PColdreading);
//							 console.log(PCarr_actualVal);
//							 console.log("arr Standard values sorted"+PCarr_stdVal);
							
							 
							var PC_IOtable = '';
							if (readingcnt == 0) {

								PC_IOtable += '<div class="row"><div id = "IOtable" class="col-md-12">'
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
										+ '<div id="PC_chartContainer" class="col-md-12"style="height: 400px; width: 90%; padding:0 5%" hidden></div></div>'

								readingcnt++;

								$(TestDiv).append(PC_IOtable);


								
							} else {
								var table = $('#table_IO').DataTable({
									 "pageLength" : 5,
								        dom: 'Bfrtip',
								        "bDestroy": true,
									title : 'Data export',
									buttons : [ {
										extend : 'excelHtml5',
										title : 'PY 100 Characterisation value'

									}, {
										extend : 'pdfHtml5',
										title : 'PY 100 Characterisation value'
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

	$('#PC_graph')
			.on(
					'click',
					function() {

						if (readingcnt < numofReading) {

							alertify.alert("Please take at least " + numofReading
									+ " readings");
						}

						
						
						if (readingcnt >= numofReading) {
							$("#PC_chartContainer").prop("hidden", false);	
							window.scrollTo(0,$('#PC_characterisationDIv').height());
					//		PColdreadingForGraph.push(parseFloat(waterlevel));
							PColdreadingForGraph.sort(function(a, b) {
								return a - b
							});


							var OldValue = [];
							var StdValue = [];
							for (var j = 0; j < PColdreadingForGraph.length; j++) {
								var olValueJson = {
									x : PColdreadingForGraph[j],
									y : PCarr_actualVal[PColdreading.indexOf(PColdreadingForGraph[j])],
									markerType : "circle",
									markerSize : 10

								};
								OldValue.push(olValueJson);
							}
							
							for (var j = 0; j < PColdreadingForGraph.length; j++) {
								var olValueJson1 = {
									x : PColdreadingForGraph[j],
									y : PCarr_stdVal[PColdreading.indexOf(PColdreadingForGraph[j])],
									markerType : "circle",
									markerSize : 10

								};
								StdValue.push(olValueJson1);
							}
							// console.log(OldValue);
							var chart = new CanvasJS.Chart("PC_chartContainer",
									{
										animationEnabled : true,
										theme : "light2",
										title : {
											text : "Pressure Control System (PY 100)",
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
							 $("#PC_calibration").prop("hidden", false);
							 						}
	     

					});

	$('#PC_calibration').on('click', function() {

		if(PColdreadingForGraph.indexOf(lowerSpLevel) == -1){
			
			alertify.alert("Please select lower span value and plot the graph again");
			$("#PC_calibration").prop("hidden", true);
			$("#PC_graph").prop("hidden", true);			
			$("#PC_chartContainer").html('');
			
		}else if(PColdreadingForGraph.indexOf(higherSpLevel) == -1){
			
			alertify.alert("Please select higher span value and plot the graph again");
			$("#PC_calibration").prop("hidden", true);
			$("#PC_graph").prop("hidden", true);	
			$("#PC_chartContainer").html('');
		
			
		}else{
			
			PC_CharacterisationData.PCreading = PColdreading;
			PC_CharacterisationData.PCactualVal = PCarr_actualVal;
			PC_CharacterisationData.PCstdVal = PCarr_stdVal;
			
//			console.log(PC_CharacterisationData);
			
		//	PC_appData.pcCharactData = PC_CharacterisationData;
			
			ExpTrackData.pcCharactData = PC_CharacterisationData;
			
//			console.log(ExpTrackData);
			if(i2pType == "direct"){
			PC_calibrationFun_Direct(i2pType, lowerSpLevel, higherSpLevel, PColdreading, PCarr_actualVal, PCarr_stdVal, lowerOutputLevel, higherOutputLevel);
			}
			
			if(i2pType == "reverse"){
				
			PC_calibrationFun_Reverse(i2pType ,lowerSpLevel, higherSpLevel, PColdreading, PCarr_actualVal, PCarr_stdVal, lowerOutputLevel, higherOutputLevel);	
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
















