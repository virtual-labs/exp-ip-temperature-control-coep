//var PC_CALIBRATION = PC_CALIBRATION || {};

//PC_CALIBRATION.PC_calibrationFun = function(lowerSpLevel, higherSpLevel, PColdreading, PCarr_actualVal, PCarr_stdVal) {
	
	 PC_calibrationFun_Direct = function(i2pType, lowerSpLevel, higherSpLevel, PColdreading, PCarr_actualVal, PCarr_stdVal, lowerOutputLevel, higherOutputLevel) {
	
//	console.log("PC_CALIBRATION");

	
	 //console.log("arr true reading not sorted "+PColdreading);
	 //console.log("arr Actual values not sorted"+PCarr_actualVal);
	 //console.log("arr Standard values not sorted"+PCarr_stdVal);
		 var zeroErrCnt = 0, spanErrCnt = 0, linearityAlgo1Cnt = 0, linearityAlgo2Cnt = 0,linearityAlgo3Cnt  = 0;
	 var PColdreadingSorted = [];
	 var PCarr_actualValSorted = [];
	 var PCarr_stdValSorted = [];
	 var zeroAniVal = 0;
	 var spanAniVal = 0;
	 var spanRange ;
	 var zeroAmiValFlag = 0;
	 var OutputValue = 0;
	 var inputValue = 4;
	 
	 
	 var pcflagSpan_direct = false;
	 
	 PColdreadingSorted = PColdreading.slice();
	 PColdreadingSorted.sort(function(a, b) {
			return a - b
		});
	 //console.log("arr true reading sorted "+PColdreadingSorted);
	 
	 for(var i = 0; i<PColdreadingSorted.length; i++){
		 
		 var index = PColdreading.indexOf(PColdreadingSorted[i]);
		 var value = PCarr_actualVal[index];
		 PCarr_actualValSorted.push(value);
		 var value2 = PCarr_stdVal[index];
		 PCarr_stdValSorted.push(value2);
	 }
	 //console.log("arr Actual values sorted"+PCarr_actualValSorted);
	 //console.log("arr Standard values sorted"+PCarr_stdValSorted);
	
	var PCCalibrationData = {};
	 var positiveVal = [];
	 var negativeVal = [];
	 var negativeValueIndex =  [];
	 var positiveValueIndex = [];
	 var checkVals = [];
	 var checkDiffVals = [];
	
	$("#PC_calibration").prop("hidden", true);
	$("#PC_graph").prop("hidden", true);
	$("#submit_PC_WaterLevel").prop("hidden", true);
	$("#PC_Slider").prop("hidden", true);
	
	var PC0Err_cnt = 0 , PCSpanErr_cnt = 0, PC_LinearityErr_cnt = 0, PC_AccuracyErr_cnt = 0;
	
	var PC_calibrationData = '';
	PC_calibrationData += '<div class="col-md-12" >'
			+ '<div id="PC_calibrationDiv" >'
			+ '<h1>PY Calibration</h1>'
			+'<h6>In this level calibrate the PY 100</h6>'
			+ '<div class="col-md-12" id="PC_Calibration_Input">'

			+ '<div class="col-md-12 marg" id="PCzeroerror_Calibration">'
			+ '<label for="zeroerror" class="col-md-4" style="margin-top:5px">Zero Error:</label>'
			+ '<input type="text" class=" col-md-4" id="zeroerror" placeholder="Enter Zero Error " name="zeroerror" style="padding:5px">'
			+ '<button type="submit" id="submit_PCzeroerror_Calibration" data-toggle="modal" data-target="#calibrationmyModal" class="submit_PC_Calibration btn btn-default col-md-3 col-md-offset-1">Submit</button>'
			+'<span id="zeroerrorOK" class="fa fa-check-circle col-md-3 col-md-offset-1" style="display:none; color:#059805"></span>'
			+ '</div>'
			+ '<div class="col-md-12 marg" id="PCspanerror_Calibration" hidden>'
			+ '<label for="spanerror" class="col-md-4" style="margin-top:5px">Span Error:</label>'
			+ '<input type="text" class="col-md-4" id="spanerror" placeholder="Enter Span Error " name="spanerror" style="padding:5px">'
			+ '<button type="submit" id="submit_PCspanerror_Calibration" data-toggle="modal" data-target="#calibrationmyModal" class="submit_PC_Calibration btn btn-default col-md-3 col-md-offset-1">Submit</button>'
			+'<span id="spanerrorOK" class="fa fa-check-circle col-md-3 col-md-offset-1" style="display:none; color:#059805"></span>'
			+ '</div>'
			+ '<div class="col-md-12 marg" id="PCLinearity_Calibration" hidden>'
			+ '<label for="linearity" class="col-md-4" style="margin-top:5px">Linearity:</label>'
			+ '<input type="text" class="col-md-4" id="linearity" placeholder="Enter Linearity " name="Linearity" style="padding:5px">'
			+ '<button type="submit" id="submit_PCLinearity_Calibration" data-toggle="modal" data-target="#calibrationmyModal" class="submit_PC_Calibration btn btn-default col-md-3 col-md-offset-1">Submit</button>'
			+'<span id="PCLinearityOK" class="fa fa-check-circle col-md-3 col-md-offset-1" style="display:none; color:#059805"></span>'
			+ '</div>'
			+ '<div class="col-md-12 marg" id="PCAccuracy_Calibration" hidden>'
			+ '<label for="Accuracy" class="col-md-4" style="margin-top:5px">Average Accuracy (%):</label>'
			+ '<input type="text" class="col-md-4" id="Accuracy" placeholder="Enter Accuracy(%) " name="Accuracy" style="padding:5px">'
			+ '<button type="submit" id="submit_PCAccuracy_Calibration" data-toggle="modal" data-target="#calibrationmyModal" class="submit_PC_Calibration btn btn-default col-md-3 col-md-offset-1">Submit</button>'
			+'<span id="LPCAccuracyOK" class="fa fa-check-circle col-md-3 col-md-offset-1" style="display:none; color:#059805"></span>'
			+ '</div>'
			+ '<div class="col-md-12 marg" id="PC_CalibrationError" hidden>'
			
			+ '</div>'
			// + '<button id="submit_PC_Calibration">Submit</button><br/>'
			+ '<div  id  = "PCCalibQuesDiv"class="col-md-12 " style="margin: 17px 0;" hidden>'
			+ '<i class="plsCalibrate">Please calibrate the PY 100 </i>'
			+ '<label class="radio-inline"><input type="radio" name="PC_calibrateNeed" id="PC_calibrateNeeded">Yes</label>'
			
			+ '</div>' 
			+ '</div>' 
			+ '</div>'
			+'<div id="ZeroErrorKnotch" class="col-md-6"></div>'
			+'<div id="SpanErrorKnotch" class="col-md-6"></div>'
			+'<div id="LinearityKnotch" class="col-md-12" disabled>'
			+'<div id="LinearityTopKnotch" class="col-md-6" hidden></div>'
			+'<div id="LinearityBottomKnotch" class="col-md-6" hidden></div>'
			+'<div id="LinearityBothKnotch" class="col-md-offset-3 col-md-6" hidden></div>'
			+'</div>'
			+'</div>'

	$('#canvasMainDiv').css("display", "none");
	$('#TestNextDiv').css("display", "block");
	$("#TestNextDiv").html('');
	$("#TestNextDiv").html(PC_calibrationData);

	stop_timer();
	set_timer();
	
	
	
	$('#submit_PCzeroerror_Calibration').on('click', function() {
		$("#submit_PCzeroerror_Calibration").removeAttr("data-toggle");
		$("#submit_PCzeroerror_Calibration").removeAttr("data-target");
		$('#zero4direct').css("display","none");
				
		
		        var pc0Temp = PCarr_actualValSorted[PColdreadingSorted.indexOf(lowerSpLevel)];
		        var PC_ZeroError = pc0Temp - 0.2;
		        
		      
								//console.log("formula value with 0 error"
								//	+ pc0Temp +"ERROR" +PC_ZeroError.toFixed(2));
									        
					if(($("#zeroerror").val() == '') ||  isNaN($("#zeroerror").val())){
						
						alertify.alert("Alert","Please Enter The Answer In Numeric Only");
						$(".ajs-header").css("background-color","#ce6058");

						
					}else{
						

						
						if (PC_ZeroError.toFixed(3) == $("#zeroerror").val()){
							
							
							PCCalibrationData.pcZeroErr = $("#zeroerror").val();
							PCCalibrationData.pcZeroErrCnt = PC0Err_cnt;
							//console.log(PCCalibrationData);
							
							
							PC0Err_cnt = 0;
							
							$("#zeroerror").prop("disabled", true);
							$("#PCspanerror_Calibration").prop("hidden", false);
							$("#submit_PCzeroerror_Calibration").css("display","none");
							$("#zeroerrorOK").css("display","block");
							
						}else{
							
							if(PC0Err_cnt == 2){
								$("#submit_PCzeroerror_Calibration").attr({'data-toggle':'modal', 'data-target':'#calibrationmyModal'});
								$('#zero4direct').css("display","block");
								PC0Err_cnt++;
//								alertify.alert("Answer is incorrect");
//								alertify.alert("Correct Answer is: " + PC_ZeroError.toFixed(3));
							}else if(PC0Err_cnt == 4){
								
								alertify.alert("Alert","Answer is incorrect");
								alertify.alert("Alert","Correct Answer is: " + PC_ZeroError.toFixed(3));
								$(".ajs-header").css("background-color","#ce6058");

							}else{
								
								alertify.alert("Alert","Answer is incorrect");
								$(".ajs-header").css("background-color","#ce6058");

								PC0Err_cnt++;
							}
							
						}
						
					}	
									        
			     
		
	});

	$('#submit_PCspanerror_Calibration').on('click', function() {
		$("#submit_PCspanerror_Calibration").removeAttr("data-toggle");
		$("#submit_PCspanerror_Calibration").removeAttr("data-target");
		$('#span4direct').css("display","none");
        var pcSpanTemp = PCarr_actualValSorted[PColdreadingSorted.indexOf(higherSpLevel)];
        var PC_SpanError = pcSpanTemp - 1;
        
      
						//console.log("formula value with 0 error"
						//	+ pcSpanTemp +"ERROR" +PC_SpanError.toFixed(2));
							        
			if(($("#spanerror").val() == '') ||  isNaN($("#spanerror").val())){
				
				alertify.alert("Alert","Please Enter The Answer In Numeric Only");
				$(".ajs-header").css("background-color","#ce6058");

				
			}else{
				
				
				if (PC_SpanError.toFixed(3) == $("#spanerror").val()){
					
					PCCalibrationData.pcSpanErr = $("#spanerror").val();
					PCCalibrationData.pcSpanErrCnt = PCSpanErr_cnt;
					//console.log(PCCalibrationData);
					
					
					PCSpanErr_cnt = 0; 
					$("#spanerror").prop("disabled", true);
					$("#PCLinearity_Calibration").prop("hidden", false);
					$("#submit_PCspanerror_Calibration").css("display","none");
					$("#spanerrorOK").css("display","block");
					
				}else{
					if(PCSpanErr_cnt == 2){
						$("#submit_PCspanerror_Calibration").attr({'data-toggle':'modal', 'data-target':'#calibrationmyModal'});
						$('#span4direct').css("display","block");
						PCSpanErr_cnt++;
//						alertify.alert("Answer is incorrect");
//						alertify.alert("Correct Answer is: " + PC_ZeroError.toFixed(3));
					}else if(PCSpanErr_cnt == 4){
						
						alertify.alert("Alert","Answer is incorrect");
						alertify.alert("Alert","Correct Answer is: " + PC_SpanError.toFixed(3));
						$(".ajs-header").css("background-color","#ce6058");

					}else{
						
						alertify.alert("Alert","Answer is incorrect");
						$(".ajs-header").css("background-color","#ce6058");

						PCSpanErr_cnt++;
					}
					
				}
				
			}	
				
	        
	 
	});

	$('#submit_PCLinearity_Calibration').on('click', function() {
		$("#submit_PCLinearity_Calibration").removeAttr("data-toggle");
		$("#submit_PCLinearity_Calibration").removeAttr("data-target");
		$('#Linearity4direct').css("display","none");
		// Calulate SX
		  var sumofX = PCarr_stdValSorted.reduce(function(a, b){
		        return a + b;
		    }, 0).toFixed(3);
		    
		  
		    //console.log("Calulate SX");
		  
		    //console.log("Sum of Input " +sumofX);
		    
		    var Sqr_sumofX = Math.pow(sumofX, 2);
		    
		    //console.log("Square of Sum of Input " +Sqr_sumofX);
		    
		    var sum_sq_X =  sum_sq(PCarr_stdValSorted).toFixed(3);
		    
		    //console.log("sum of Square of input " +sum_sq_X);
		    
		    var PC_Sx = Math.sqrt(sum_sq_X - (Sqr_sumofX/PCarr_stdValSorted.length));
		    
		    //console.log("SX " +PC_Sx.toFixed(2));
		    
		
		    
		 // Calulate SY
			  var sumofY = PCarr_actualValSorted.reduce(function(a, b){
			        return a + b;
			    }, 0).toFixed(3);
			    
			    //console.log("Calulate SY");
			    //console.log("Sum of Input " +sumofY);
			    
			    var Sqr_sumofY = Math.pow(sumofY, 2);
			    
			    //console.log("Square of Sum of Input " +Sqr_sumofY);
			    
			    var sum_sq_Y =  sum_sq(PCarr_actualValSorted).toFixed(3);
			    
			    //console.log("sum of Square of input " +sum_sq_Y);
			    
			    var PC_Sy =  Math.sqrt( sum_sq_Y -  (Sqr_sumofY/PCarr_actualValSorted.length));
			    
			    //console.log("SY " +PC_Sy.toFixed(2));
		    
		    
		// Capculate Sxy
			    
			    var sum_xy = 0;
			    for (var i=0; i < PCarr_stdValSorted.length; i++) {
			    	sum_xy += (PCarr_stdValSorted[i] * PCarr_actualValSorted[i]);
			    }
			    //console.log("Calulate SXY"); 
			    //console.log("Sum of MultiPlication of X and Y  " +sum_xy.toFixed(2));
			    
	            var multi_x_y = sumofX * sumofY;
			    
	            //console.log("MultiPlication of sum of X and Y  " +multi_x_y.toFixed(2));
	         
	            var Sxy =  sum_xy - (multi_x_y/PCarr_stdValSorted.length) ;
	         
	            //console.log("SXY  " +Sxy.toFixed(2));
	         
	         
	    // Capculate Linearity     
	         
	         
	         //console.log("Capculate Linearity"); 
	         
	         //console.log("Sqrt Multiplication " + ( PC_Sx.toFixed(2) * PC_Sy.toFixed(2)).toFixed(2)); 
	         
	         var PC_linearity =  Sxy.toFixed(3)/( PC_Sx.toFixed(3) * PC_Sy.toFixed(3));
	        
	         //console.log(" PC_linearity " +PC_linearity.toFixed(3));
	        
	         
		if(($("#linearity").val() == '') ||  isNaN($("#linearity").val())){
				
				alertify.alert("Alert","Please Enter The Answer In Numeric Only");
				$(".ajs-header").css("background-color","#ce6058");

				
			}else{
				
				
				if (PC_linearity.toFixed(3) == $("#linearity").val()){
					
					PCCalibrationData.pcLinearityErr = $("#linearity").val();
					PCCalibrationData.pcLinearityErrCnt = PC_LinearityErr_cnt;
					//console.log(PCCalibrationData);
					
					PC_LinearityErr_cnt = 0; 
					$("#linearity").prop("disabled", true);
					$("#PCAccuracy_Calibration").prop("hidden", false);
					$("#submit_PCLinearity_Calibration").css("display","none");
					$("#PCLinearityOK").css("display","block");
					
					
				}else{
					if(PC_LinearityErr_cnt == 2){
					$("#submit_PCLinearity_Calibration").attr({'data-toggle':'modal', 'data-target':'#calibrationmyModal'});
					$('#Linearity4direct').css("display","block");
					PC_LinearityErr_cnt++;
//					alertify.alert("Answer is incorrect");
//					alertify.alert("Correct Answer is: " + PC_ZeroError.toFixed(3));
				}else if(PC_LinearityErr_cnt == 4){
						
						alertify.alert("Alert","Answer is incorrect");
						alertify.alert("Alert","Correct Answer is: " + PC_linearity.toFixed(3));
						$(".ajs-header").css("background-color","#ce6058");

					}else{
						
						alertify.alert("Alert","Answer is incorrect");
						$(".ajs-header").css("background-color","#ce6058");

						PC_LinearityErr_cnt++;
					}
					
				}
				
			}
	         
	         
	         
	         
		
		
	});

	$('#submit_PCAccuracy_Calibration').on('click', function() {
		$("#submit_PCAccuracy_Calibration").removeAttr("data-toggle");
		$("#submit_PCAccuracy_Calibration").removeAttr("data-target");
		$('#Accuracy4direct').css("display","none");
		    var sum_PerAccuracy = 0;
		    for (var i=0; i < PCarr_stdValSorted.length; i++) {
		    	sum_PerAccuracy += ((PCarr_stdValSorted[i] - PCarr_actualValSorted[i])/PCarr_stdValSorted.length)*100;
		    }
		
		   var Avg_Accuracy = Math.abs(sum_PerAccuracy)/PCarr_stdValSorted.length;
		   
		   //console.log("AVG % Accuracy  " +Avg_Accuracy.toFixed(2));
		   
		   if(($("#Accuracy").val() == '') ||  isNaN($("#Accuracy").val())){
				
				alertify.alert("Alert","Please Enter The Answer In Numeric Only");
				$(".ajs-header").css("background-color","#ce6058");

				
			}else{
				
				
				if (Avg_Accuracy.toFixed(3) == $("#Accuracy").val()){
					
					
					PCCalibrationData.pcAccuracyErr = $("#Accuracy").val();
					PCCalibrationData.pcAccuracyErrCnt = PC_AccuracyErr_cnt;
					
					//console.log(PCCalibrationData);
					
//					ExpTrackData.pcCalibrationData = PCCalibrationData;
					
//					//console.log(ExpTrackData);
					
					PC_AccuracyErr_cnt = 0; 
					$("#Accuracy").prop("disabled", true);
					$("#PCCalibQuesDiv").prop("hidden", false);
					$("#submit_PCAccuracy_Calibration").css("display","none");
					$("#LPCAccuracyOK").css("display","block");
					
					
				}else{
					if(PC_AccuracyErr_cnt == 2){
						$("#submit_PCAccuracy_Calibration").attr({'data-toggle':'modal', 'data-target':'#calibrationmyModal'});
						$('#Accuracy4direct').css("display","block");
						PC_AccuracyErr_cnt++;
//						alertify.alert("Answer is incorrect");
//						alertify.alert("Correct Answer is: " + PC_ZeroError.toFixed(3));
					}else if(PC_AccuracyErr_cnt == 4){
						
						alertify.alert("Alert","Answer is incorrect");
						alertify.alert("Alert","Correct Answer is: " + Avg_Accuracy.toFixed(3));
						$(".ajs-header").css("background-color","#ce6058");

					}else{
						
						alertify.alert("Alert","Answer is incorrect");
						$(".ajs-header").css("background-color","#ce6058");

						PC_AccuracyErr_cnt++;
					}
					
				}
				
			}

	});
	
	$('#PC_calibrateNeeded').on('click', function() {
	$('#PC_chartContainer').hide();	
	$("#anim_canvas_direct").css("display","inline-block");
	anim_ItoPconveter_direct(inputValue,OutputValue);
	
	var range = $("#zeroerror").val();
	 spanRange = $("#spanerror").val();
      var PC_Error_graph_data = '';
      PC_Error_graph_data += '<div class="row"><div class="col-md-12">'
    	  +'<div id="PC_Error_graph_data">'
//    	  PC_Error_graph_data +='Zero Error:&nbsp;'+range+'&nbsp;,&nbsp;&nbsp;'
//    	  PC_Error_graph_data +='Span Error:&nbsp;'+spanRange+'&nbsp;,&nbsp;&nbsp;'
//    	  PC_Error_graph_data +='Linearity:&nbsp;'+$("#linearity").val()+'&nbsp;,&nbsp;&nbsp;'
//    	  PC_Error_graph_data +='Accuracy AVG(%) :&nbsp;'+$("#Accuracy").val()+'&nbsp;,&nbsp;&nbsp;'
    	  PC_Error_graph_data +='<table class="table table-bordered">'
    		  PC_Error_graph_data +='<thead style="background:#666; color:#fff">'
    			  PC_Error_graph_data +=' <tr>'
    			PC_Error_graph_data +='<th>Zero Error</th>'
    			PC_Error_graph_data +='<th>Span Error</th>'
    			PC_Error_graph_data +='<th>Linearity</th>'
    			 PC_Error_graph_data +='<th>Accuracy AVG(%)</th>'
    			PC_Error_graph_data +='</tr>'
    			PC_Error_graph_data +='</thead>'
    			PC_Error_graph_data +='<tbody>'
    			PC_Error_graph_data +='<tr>'
    			PC_Error_graph_data +='<td>'+range+'</td>'
    			PC_Error_graph_data +='<td>'+spanRange+'</td>'
    			PC_Error_graph_data +='<td>'+$("#linearity").val()+'</td>'
    			PC_Error_graph_data +=' <td>'+$("#Accuracy").val()+'</td>'
    			PC_Error_graph_data +=' </tr>'
    	        PC_Error_graph_data +='</tbody>'
    			PC_Error_graph_data +='</table>'
    	  +'</div>'
    	  PC_Error_graph_data += '<div id="PC_chartContainer_calibration" class="col-md-12" style="height: 300px; width: 90%; padding:0 5%"></div></div>'
    		  PC_Error_graph_data +='</div</div>'
		//zeroerror,spanerror,linearity,Accuracy
    			  $("#PC_Calibration_Input").html('');
		$("#PC_Calibration_Input").html(PC_Error_graph_data);
		drawGraph(PColdreadingSorted, PCarr_actualValSorted);
//		$("#PC_calibrateNeeded").prop("disabled", true);
		
		 
		 var flag = 0;
		PCZero_Calibartion(range, flag);
	
	//	 PC_CheckLinearitySection();
		

	});
	
	
	var PCZero_Calibartion = function(range, flag){
		

		

		var PC_calibrateNeeded = '';
		PC_calibrateNeeded += '<div class="col-md-12" >'
			+'<div id="ZeroErrorKnockData">'
			+'<h1>Adjust Zero</h1>'
			+'<div id="plus" class="fa fa-plus-square col-md-2" style="cursor: pointer;"></div><div class="col-md-8" style="margin-left: 10px;"><input type="Text" id="ZeroangleVal" ></div><div id="minus" style="cursor: pointer;" class="fa fa-minus-square col-md-2"></div>'
			//+'<div class="range">'
			+'<div class="icon-repeat1" id="menu-1"></div>'
			//+'</div>'
			+'</div>'
			+'<div id="ZeroErrorKnockSuccess"></div>'
			$('#ZeroErrorKnotch').html('');
			$('#ZeroErrorKnotch').html(PC_calibrateNeeded);
			
			
			range = Math.abs(range);
			
			var a = 0;
			var angle = 0;
			var temp  = 0;
//			 var range = $("#zeroerror").val();
			 var ZeroValue_old = PCarr_actualValSorted[0] ;
			 var ZeroValue = PCarr_actualValSorted[0] ;
			 //console.log(ZeroValue);
			 var steps = range/10;
			 var stepFix = steps.toFixed(3);
//			 console.log(steps);
//			 console.log(stepFix);
/// Zero MINUS CLICK  
			 
			 $("#ZeroangleVal").val(PCarr_actualValSorted[0]);
			 $('#minus').bind("click",function (event) {
				 zeroErrCnt++;
//				 console.log(zeroAniVal);
				 $('#ZeroErrorKnockSuccess').html('');
				 $('#plus').show();
				
				 
					
				 if(angle >= -(range)){
					 angle -=stepFix;
					 var n = angle.toFixed(2);
//					 console.log(n);
				      
					 
					ZeroValue = parseFloat((ZeroValue - stepFix).toFixed(3));
					//console.log(ZeroValue);
					if((-range).toFixed(2) == n)
						{
						
						PCarr_actualValSorted.splice(0, 1, parseFloat(0.2));
						///$('#minus').hide();
						//$('#plus').hide();
						ZeroAnimMinus(PCarr_actualValSorted[0]);
						  $("#ZeroangleVal").val(PCarr_actualValSorted[0]);
						  
						  
						  
						  if(pcflagSpan_direct == false){
								 
								 for( var i= 1; i<=(PCarr_actualValSorted.length-1); i++ )
									{
									
									var oldval =  PCarr_actualValSorted[i];
									var LinearityNewVal = (oldval - stepFix).toFixed(3);	
									//console.log("oldvalue "+oldval+"new Value "+LinearityNewVal);
									
									PCarr_actualValSorted.splice(i, 1, parseFloat(LinearityNewVal));
									
									 
									} 
							 } else{
								 
								 for( var i= 1; i<=(PCarr_actualValSorted.length-2); i++ )
									{
									
									var oldval =  PCarr_actualValSorted[i];
									var LinearityNewVal = (oldval - stepFix).toFixed(3);	
									//console.log("oldvalue "+oldval+"new Value "+LinearityNewVal);
									
									PCarr_actualValSorted.splice(i, 1, parseFloat(LinearityNewVal));
									
									 
									} 
							 }
						  
						  
						  
						  
						PC_Updategraph(PColdreadingSorted, PCarr_actualValSorted);	
						
						//console.log(PCarr_actualValSorted);
						if(flag == 0){
							
//							alertify.alert("Zero Adjusted Successfully!!!");
							//$('#ZeroErrorKnockData').hide();
							$("#ZeroErrorKnockData").addClass("disabledDiv");
							$('#ZeroErrorKnockSuccess').html('');
							$('#ZeroErrorKnockSuccess').html('<div class="alert alert-success">Zero Adjusted Successfully!!!</div>');
							
							PCSpan_ClaibrationNeeded();
						}else{
							
							$('#ZeroErrorKnotch').html('');
							$('#ZeroErrorKnotch').html('<div class="alert alert-success">Zero Adjusted Successfully!!!</div>');
							
							$('#SpanErrorKnotch').show('');
							$('#SpanErrorKnotch').html('');							
							$('#SpanErrorKnotch').html('<div class="alert alert-success">Span Adjusted Successfully!!!</div>');
							
							//	CHECK LINEARITY from here
							 PC_CheckLinearitySection();
						}
						
						
						}else
					        {	
					
								 PCarr_actualValSorted.splice(0, 1, parseFloat(ZeroValue));
								 //console.log(PCarr_actualValSorted);
								 ZeroAnimMinus(PCarr_actualValSorted[0]);
								  $("#ZeroangleVal").val(PCarr_actualValSorted[0]);
								  
								  
								  if(pcflagSpan_direct == false){
										 
										 for( var i= 1; i<=(PCarr_actualValSorted.length-1); i++ )
											{
											
											var oldval =  PCarr_actualValSorted[i];
											var LinearityNewVal = (oldval - stepFix).toFixed(3);	
											//console.log("oldvalue "+oldval+"new Value "+LinearityNewVal);
											
											PCarr_actualValSorted.splice(i, 1, parseFloat(LinearityNewVal));
											
											 
											} 
									 } else{
										 
										 for( var i= 1; i<=(PCarr_actualValSorted.length-2); i++ )
											{
											
											var oldval =  PCarr_actualValSorted[i];
											var LinearityNewVal = (oldval - stepFix).toFixed(3);	
											//console.log("oldvalue "+oldval+"new Value "+LinearityNewVal);
											
											PCarr_actualValSorted.splice(i, 1, parseFloat(LinearityNewVal));
											
											 
											} 
									 }
								  
								  
								 PC_Updategraph(PColdreadingSorted, PCarr_actualValSorted);	
				           }
				   

					 
					 
				    // //console.log(angle);
				    
				     var $elem = $('.icon-repeat1');

				     
				     $({deg: n}).animate({deg: n}, {
				      
				      
				         step: function(now) {
				         
				             $elem.css({
				                 'transform': 'rotate('+ (now * 180)  +'deg)'
				             });
				         }
				     });
				    
				
				 }

				 function ZeroAnimMinus(ZeroAnimMinusValue){
					 
//						paper.clear();				
//					zeroAniVal = zeroAniVal + 1;
//
//					    Nozzelanim (x, y,spanAniVal,ZeroAnimMinusValue);
//						FlapperAnim (x, y ,zeroAniVal);
//						if(spanAniVal == 0)
//							{
//						plusNozzel(x,y,0);
//						minusNozzel(x,y,0);
//							}else
//								{
//								plusNozzel(x,y,spanAniVal);
//								//minusNozzel(x,y,spanAniVal);
//								}
//						springscrew (x,y,zeroAniVal);
//						OtherParts(x,y);
//						console.log(a);
					 
					 paper.clear();
					 if(zeroAniVal == 0)
					 {
						zeroAniVal = zeroAniVal - 1;
							
					     Nozzelanim_d (x, y,spanAniVal,ZeroAnimMinusValue);
						FlapperAnim_d (x, y ,zeroAniVal);
						if(spanAniVal == 0)
						{
							plusNozzel_d(x,y,0);
							minusNozzel_d(x,y,0);
						}else
							{
							plusNozzel_d(x,y,spanAniVal);
							//minusNozzel(x,y,spanAniVal);
							}
						springscrew_d (x,y,zeroAniVal);
						OtherParts_d(x,y,4);
//						console.log(a);
						var n1 = flapperscrew.glow({
							width : 8,
							//'fill' : 'green',
							'stroke' : 'green'
						});
						animPC = Raphael.animation({
							"stroke-width" : 1,
							opacity : 1
						}, 800, function() {
							flapperscrew.attr({
								'fill' : '#666',
								'stroke-width' : '1'
							});
						});

						n1.animate(animPC);
					 }else{
						 
						 zeroAniVal = zeroAniVal - 0.8;
							
					     Nozzelanim_d (x, y,spanAniVal,ZeroAnimMinusValue);
						FlapperAnim_d (x, y ,zeroAniVal);
						if(spanAniVal == 0)
						{
							plusNozzel_d(x,y,0);
							minusNozzel_d(x,y,0);
						}else
							{
							plusNozzel_d(x,y,spanAniVal);
							//minusNozzel(x,y,spanAniVal);
							}
						springscrew_d (x,y,zeroAniVal);
						OtherParts_d(x,y,4);
//						console.log(a);
						var n1 = flapperscrew.glow({
							width : 8,
							//'fill' : 'green',
							'stroke' : 'green'
						});
						animPC = Raphael.animation({
							"stroke-width" : 1,
							opacity : 1
						}, 800, function() {
							flapperscrew.attr({
								'fill' : '#666',
								'stroke-width' : '1'
							});
						});

						n1.animate(animPC);
					 }
				 }
				
				 });
			 
			 
				
		//zero  PLuS CLICK	 

				 $('#plus').bind("click",function (event) {
					
					 zeroErrCnt++;
				 if(angle <= range){
					 angle +=parseFloat(stepFix);
					 var n = angle.toFixed(2);
//					 console.log(n);
					 $('#minus').show();
			
					 
						ZeroValue = parseFloat((ZeroValue + parseFloat(stepFix)).toFixed(3));
						//console.log(ZeroValue);
						var ZeroValueFix = ZeroValue.toFixed(0);
						
					    PCarr_actualValSorted.splice(0, 1, parseFloat(ZeroValue));
					    //console.log(PCarr_actualValSorted);
					 
					
					    if(pcflagSpan_direct == false){
							 
							 for( var i= 1; i<=(PCarr_actualValSorted.length-1); i++ )
								{
								
								var oldval =  PCarr_actualValSorted[i];
								var LinearityNewVal = (oldval + parseFloat(stepFix)).toFixed(3);	
								//console.log("oldvalue "+oldval+"new Value "+LinearityNewVal);
								
								PCarr_actualValSorted.splice(i, 1, parseFloat(LinearityNewVal));
								
								 
								} 
						 } else{
							 
							 for( var i= 1; i<=(PCarr_actualValSorted.length-2); i++ )
								{
								
								var oldval =  PCarr_actualValSorted[i];
								var LinearityNewVal = (oldval + parseFloat(stepFix)).toFixed(3);	
								//console.log("oldvalue "+oldval+"new Value "+LinearityNewVal);
								
								PCarr_actualValSorted.splice(i, 1, parseFloat(LinearityNewVal));
								
								 
								} 
						 }
					    
					    
					    
					    
					    
					    
					    
					    
					    
					    
					    
				    
				     var $elem = $('.icon-repeat1');

				     $({deg: n}).animate({deg: n}, {
				      
				      
				         step: function(now) {
				         
				             $elem.css({
				                 'transform': 'rotate('+ (now * 180) +'deg)'
				             });
				         }
				     });
				     
				     $("#ZeroangleVal").val(PCarr_actualValSorted[0]);
				     ZeroAnimplus(PCarr_actualValSorted[0]);
				     if(range.toFixed(2) == n)
						{
				    	
							$('#plus').hide();
				    	 $('#ZeroErrorKnockSuccess').html('');
						$('#ZeroErrorKnockSuccess').html('<div class="alert alert-danger">Zero not Adjusted!!!</div>');
						}
				     
				     PC_Updategraph(PColdreadingSorted, PCarr_actualValSorted);	
				     
				 }
				 
				 function ZeroAnimplus(ZeroAnimMinusValue){
					// ZeroAnimMinusValue =  $("#ZeroangleVal").val();
					 
					 paper.clear();		
					 if(zeroAniVal == 0)
						 {
						zeroAniVal = zeroAniVal + 1;

						    Nozzelanim_d (x, y,spanAniVal,ZeroAnimMinusValue);
							FlapperAnim_d (x, y ,zeroAniVal);
							if(spanAniVal == 0)
								{
							plusNozzel_d(x,y,0);
							minusNozzel_d(x,y,0);
								}else
									{
									plusNozzel_d(x,y,spanAniVal);
									//minusNozzel(x,y,spanAniVal);
									}
							springscrew_d (x,y,zeroAniVal);
							OtherParts_d(x,y,4);
//							console.log(a);
							var n2 = flapperscrew.glow({
								width : 8,
								//'fill' : 'green',
								'stroke' : 'green'
							});
							animPC = Raphael.animation({
								"stroke-width" : 1,
								opacity : 1
							}, 800, function() {
								flapperscrew.attr({
									'fill' : '#666',
									'stroke-width' : '1'
								});
							});

							n2.animate(animPC);
						 }else
							 {
							 

								zeroAniVal = zeroAniVal + 0.6;

								    Nozzelanim_d (x, y,spanAniVal,ZeroAnimMinusValue);
									FlapperAnim_d (x, y ,zeroAniVal);
									if(spanAniVal == 0)
										{
									plusNozzel_d(x,y,0);
									minusNozzel_d(x,y,0);
										}else
											{
											plusNozzel_d(x,y,spanAniVal);
											//minusNozzel(x,y,spanAniVal);
											}
									springscrew_d (x,y,zeroAniVal);
									OtherParts_d(x,y,4);
//									console.log(a);
									var n2 = flapperscrew.glow({
										width : 8,
										//'fill' : 'green',
										'stroke' : 'green'
									});
									animPC = Raphael.animation({
										"stroke-width" : 1,
										opacity : 1
									}, 800, function() {
										flapperscrew.attr({
											'fill' : '#666',
											'stroke-width' : '1'
										});
									});

									n2.animate(animPC);
								 
							 }
//					 paper.clear();
//						
//						zeroAniVal = zeroAniVal - 1;
//							
//					     Nozzelanim (x, y,spanAniVal,ZeroAnimMinusValue);
//						FlapperAnim (x, y ,zeroAniVal);
//						if(spanAniVal == 0)
//						{
//							plusNozzel(x,y,0);
//							minusNozzel(x,y,0);
//						}else
//							{
//							plusNozzel(x,y,spanAniVal);
//							//minusNozzel(x,y,spanAniVal);
//							}
//						springscrew (x,y,zeroAniVal);
//						OtherParts(x,y);
//						console.log(a);
				 }

				 });
	
	}
	
	
	
	var PCSpan_ClaibrationNeeded = function() {
		var PC_calibrateNeeded = '';
		PC_calibrateNeeded += '<div class="col-md-12" >'
			+'<div id="SpanErrorKnockData">'
			+'<h1>Adjust Span </h1>'
			+'<div id="Spanplus" class="fa fa-plus-square col-md-2" style="cursor: pointer;"></div><div class="col-md-8" style="margin-left: 10px;"><input type="Text" id="SpanangleVal"></div><div id="Spanminus" style="cursor: pointer;" class="fa fa-minus-square col-md-2"></div>'
			//+'<div class="range">'
			+'<div class="icon-repeat" id="menu-1"></div>'
			+'</div>'
			//+'</div>'
			+'<div id="SpanErrorKnockSuccess"></div>'
			$('#SpanErrorKnotch').html('');
			$('#SpanErrorKnotch').html(PC_calibrateNeeded);
			
			 range = Math.abs(range);
			var angle = 0;
			var temp  = 0;
			 var range =parseFloat(spanRange);
			var ArrayLeng = PCarr_actualValSorted.length ;
			 var SpanValue = PCarr_actualValSorted[ArrayLeng - 1 ] ;
			 var ZeroValue = PCarr_actualValSorted[0] ;
			 //console.log(SpanValue);
			 var steps = range/10;
			 var stepFix = steps.toFixed(3);
			 //console.log(steps);
/// Span MINUS CLICK  
			 $("#SpanangleVal").val(PCarr_actualValSorted[ArrayLeng - 1 ]);
			 
			 $('#Spanminus').click(function (event) {
				 spanErrCnt++;
				 //console.log("Minus span");
				 if(angle <= -(range)){
				 angle -=parseFloat(stepFix);
				 var n = angle.toFixed(2);
				 
//				 console.log(n);
				 
				// $('#minus').show();
			     
				 $('#Spanplus').show();
				 
				 SpanValue = parseFloat((SpanValue + parseFloat(stepFix)).toFixed(3));
				 
				 ZeroValue = parseFloat((ZeroValue + parseFloat(stepFix)).toFixed(3));
				 
				 
				 
				 for( var i= 1; i<=(PCarr_actualValSorted.length-2); i++ )
					{
					
					var oldval =  PCarr_actualValSorted[i];
					var LinearityNewVal = (oldval + parseFloat(stepFix)).toFixed(3);	
					//console.log("oldvalue "+oldval+"new Value "+LinearityNewVal);
					
					PCarr_actualValSorted.splice(i, 1, parseFloat(LinearityNewVal));
					
					 
					}
				 
				 
				//	//console.log(SpanValue);
					var SpanValueFix = SpanValue.toFixed(0);
					
					if((-range).toFixed(2) == n)
					{
						PCarr_actualValSorted.splice((ArrayLeng - 1), 1, parseFloat(SpanValue));
						PCarr_actualValSorted.splice(0, 1, parseFloat(ZeroValue));
						 $('#Spanminus').hide();
						 $('#SpanErrorKnockSuccess').html('');
							$('#SpanErrorKnockSuccess').html('<div class="alert alert-danger">Span not Adjusted!!!</div>');
							
						
					}else{
						
						PCarr_actualValSorted.splice((ArrayLeng - 1), 1, parseFloat(SpanValue));
						PCarr_actualValSorted.splice(0, 1, parseFloat(ZeroValue));
					}
					
				    
				    
				    
				    
				  //  //console.log(PCarr_actualValSorted);
				 
				
			    
			     var $elem = $('.icon-repeat');
			     //console.log(n * 20);
			     $({deg: n}).animate({deg: n}, {
			      
			      
			         step: function(now) {
			         
			             $elem.css({
			                 'transform': 'rotate('+ ((-now) * 180) +'deg)'
			             });
			         }
			     });
			     $("#SpanangleVal").val(PCarr_actualValSorted[ArrayLeng - 1 ]);
			     spanAnimMinus(PCarr_actualValSorted[ArrayLeng - 1 ]);
			     
			     PC_Updategraph(PColdreadingSorted, PCarr_actualValSorted);	
			 }
				 function spanAnimMinus(SpanAnimMinusValue)
				 {
				 paper.clear();
				// zeroAniVal = zeroAniVal + 1;
				  //  zeroAniVal = 10;
				 zeroAniVal= 4;
				 inputValue = 20;
				    zeroAmiValFlag = 1;
				    spanAniVal = spanAniVal - 0.5;
				     Nozzelanim_d (x, y,spanAniVal,SpanAnimMinusValue);
					FlapperAnim_d (x, y ,zeroAniVal);
					if(spanAniVal <= 0)
					{
//						console.log("spanAniVal="+spanAniVal); 
						minusNozzel_d(x,y,spanAniVal);}
					else
					{
//						console.log("spanAniVal="+spanAniVal);
					plusNozzel_d(x,y,spanAniVal);}
					springscrew_d (x,y,zeroAniVal);
					OtherParts_d(x,y,20);
					var n1 = nozzelScrew.glow({
						width : 8,
						//'fill' : 'green',
						'stroke' : 'green'
					});
					animPC = Raphael.animation({
						"stroke-width" : 1,
						opacity : 1
					}, 800, function() {
						nozzelScrew.attr({
							'fill' : '#666',
							'stroke-width' : '1'
						});
					});

					n1.animate(animPC);
				 }
			 });
			 
		// Sapn PLUS CLICK	 

				 $('#Spanplus').click(function (event) {
					 spanErrCnt++;
					 $('#SpanErrorKnockSuccess').html('');	 
					 //console.log("plus span");
					 if(angle >= range){
					 angle +=parseFloat(stepFix);
					 var n = angle.toFixed(2);
//					console.log(n);
					 
					// $('#minus').show();
					 $('#Spanminus').show();
					 
					 
					 SpanValue = parseFloat((SpanValue - parseFloat(stepFix)).toFixed(3));	
					 
					 ZeroValue = parseFloat((ZeroValue - parseFloat(stepFix)).toFixed(3));
					 
					 
					 
					 for( var i= 1; i<=(PCarr_actualValSorted.length-2); i++ )
						{
						
						var oldval =  PCarr_actualValSorted[i];
						var LinearityNewVal = (oldval - parseFloat(stepFix)).toFixed(3);	
						//console.log("oldvalue "+oldval+"new Value "+LinearityNewVal);
						
						PCarr_actualValSorted.splice(i, 1, parseFloat(LinearityNewVal));
						
						 
						}
					 
						//console.log(SpanValue);
						var SpanValueFix = SpanValue.toFixed(0);
						if(range.toFixed(2) == n)
						{ 
							PCarr_actualValSorted.splice((ArrayLeng - 1), 1, parseFloat(1));
							PCarr_actualValSorted.splice(0, 1, parseFloat(ZeroValue));
							$('#Spanplus').hide();
							 $("#SpanangleVal").val(PCarr_actualValSorted[ArrayLeng - 1 ]);
							 zeroAniVal = 0;
							 inputValue = 4;
							 spanAnimPlus(PCarr_actualValSorted[ArrayLeng - 1 ]);
							PC_Updategraph(PColdreadingSorted, PCarr_actualValSorted);	
							//alertify.alert("Span Error Adjusted Successfully!!!");
							//$('#SpanErrorKnockData').hide();
							//$('#ZeroErrorKnockData').show();
							$('#SpanErrorKnockData').addClass("disabledDiv");
							$('#ZeroErrorKnockData').removeClass("disabledDiv");
							$('#ZeroErrorKnockSuccess').html('');
							//$('#ZeroErrorKnockData').hide();
							$('#SpanErrorKnockSuccess').html('');
							$('#SpanErrorKnockSuccess').html('<div class="alert alert-success">Span Adjusted Successfully!!!</div><div class="alert alert-danger">But Zero affected. <br/>Adjust Zero Again</div>');
							pcflagSpan_direct = true;
							PCZero_Calibartion(range, 1);
							
							
							
						
							
							}
						else
							{
					    PCarr_actualValSorted.splice((ArrayLeng - 1), 1, parseFloat(SpanValue));
					    PCarr_actualValSorted.splice(0, 1, parseFloat(ZeroValue));
					    $("#SpanangleVal").val(PCarr_actualValSorted[ArrayLeng - 1 ]);
					    inputValue = 4;
					    spanAnimPlus(PCarr_actualValSorted[ArrayLeng - 1 ]);
					    PC_Updategraph(PColdreadingSorted, PCarr_actualValSorted);	
							}
						
						
						
					  //  //console.log(PCarr_actualValSorted);
					 
					
				    
				     var $elem = $('.icon-repeat');
				     //console.log(n * 20);
				     $({deg: n}).animate({deg: n}, {
				      
				      
				         step: function(now) {
				         
				             $elem.css({
				                 'transform': 'rotate('+ ((-now) * 180) +'deg)'
				             });
				         }
				     });
				    
				     
				     
				     
				 }
					 function spanAnimPlus(SpanAnimMinusValue)
					 {
					 paper.clear();
					 inputValue = 20;
					 zeroAniVal= 4;
					// zeroAniVal = zeroAniVal - 0.5;
					 spanAniVal = spanAniVal + 0.5;
					     Nozzelanim_d (x, y,spanAniVal,SpanAnimMinusValue);
						FlapperAnim_d (x, y ,zeroAniVal);
						if(spanAniVal >= 0)
						{plusNozzel_d(x,y,spanAniVal);}
						else
						{minusNozzel_d(x,y,spanAniVal);}
						springscrew_d (x,y,zeroAniVal);
						OtherParts_d(x,y,20);
						var n2 = nozzelScrew.glow({
							width : 8,
							//'fill' : 'green',
							'stroke' : 'green'
						});
						animPC = Raphael.animation({
							"stroke-width" : 1,
							opacity : 1
						}, 800, function() {
							nozzelScrew.attr({
								'fill' : '#666',
								'stroke-width' : '1'
							});
						});

						n2.animate(animPC);
					 }
				 });
					 
	


		
	}
			
	
	var PC_calibrate_Top_Linearity_Needed = function ()
	{
		
		var PC_calibrate_Top_Linearity_Needed = '';
		PC_calibrate_Top_Linearity_Needed += '<div class="col-md-12" >'
			+'<div id="LinearitySectionOneKnockData">'
			+'<h1>Linearity Algorithm 1</h1>'
			+'<div id="LinearityTopplus" class="fa fa-plus-square col-md-2" style="cursor: pointer;"></div><div class="col-md-8" style="margin-left: 10px;"></div><div id="LinearityTopminus" style="cursor: pointer;" class="fa fa-minus-square col-md-2"></div>'
			//+'<div class="range">'
			+'<div class="icon-repeat" id="menu-1"></div>'
			//+'</div>'
			+'</div>'
			+'<div id="LinearityTopKnockSuccess"></div>'
			//$('#LinearityKnotch').html('');
			$('#LinearityTopKnotch').html(PC_calibrate_Top_Linearity_Needed);
			
			
			var angle = 0;
			var temp  = 0;
			
			 var LinearityValue = 0 ;
			 var defError = (PC_DefaultErr/100).toFixed(2);
			 var steps = defError/10;
			 var stepFix = parseFloat(steps.toFixed(3));
			 //console.log("steps "+stepFix);
			 
/// LINEARITY TOP MINUS CLICK  
			 
//			 LinearityTopplus  LinearityTopminus
			 
			 
			 $('#LinearityTopplus').bind("click",function (event) {
					linearityAlgo1Cnt++;
				 $('#LinearityTopKnockSuccess').html('');
				
                 //console.log(defError);
				 if(angle <= defError){
					 angle +=parseFloat(stepFix);
					 var n = angle.toFixed(2);
					 //console.log("angle "+n);
				      
					 $('#LinearityTopminus').show();

					
					
					for( var i= 1; i<=(PCarr_actualValSorted.length-2); i++ )
						{
						
						var oldval =  PCarr_actualValSorted[i];
						var LinearityNewVal = (oldval + stepFix).toFixed(3);	
						//console.log("oldvalue "+oldval+"new Value "+LinearityNewVal);
						
						 PCarr_actualValSorted.splice(i, 1, parseFloat(LinearityNewVal));
						
						 
						}
								
					 if(defError == n)
						{
						 $('#LinearityTopplus').hide();
						 $('#LinearitySectionOneKnockData').hide();
							// $('#LinearityKnockSuccess').html('');
						$('#LinearityTopKnockSuccess').html('<div class="alert alert-success">Linearity Algorithm 1 Adjusted Successfully!!!</div>');
							
					
						if(negativeVal.length != 0){
							
							$("#ZeroErrorKnotch").hide();
							$("#SpanErrorKnotch").hide();
							
							
							PC_calibrate_Bottom_Linearity_Needed();
							$("#LinearityBottomKnotch").prop("hidden", false);
						}else{
							
							PC_calibrate_Both_Linearity_Needed();
							$("#LinearityBothKnotch").prop("hidden", false);
						}
						
						 }
					
					
					
					 //console.log(PCarr_actualValSorted);
						 PC_Updategraph(PColdreadingSorted, PCarr_actualValSorted);	
				
				    
				     var $elem = $('.icon-repeat');

				     
				     $({deg: n}).animate({deg: n}, {
				      
				      
				         step: function(now) {
				         
				             $elem.css({
				                 'transform': 'rotate('+ ((-now) * 190)  +'deg)'
				             });
				         }
				     });
				    
				      
				     
				      

							
						
					
				 }
				 });
			 
		// LINEARITY TOP PLUS CLICK	 
			 
//			 LinearityTopplus  LinearityTopminus

				 $('#LinearityTopminus').bind("click",function (event) {
						linearityAlgo1Cnt++;

	                 //console.log(defError);
					 if(angle >= -(defError)){
						 angle -=parseFloat(stepFix);
						 var n = angle.toFixed(2);
						 //console.log("angle "+n);
					      
						 $('#LinearityTopplus').show();

						
						
						for( var i= 1; i<=(PCarr_actualValSorted.length-2); i++ )
							{
							
							var oldval =  PCarr_actualValSorted[i];
							var LinearityNewVal = (oldval - stepFix).toFixed(3);	
							//console.log("oldvalue "+oldval+"  new Value "+LinearityNewVal);
							
							 PCarr_actualValSorted.splice(i, 1, parseFloat(LinearityNewVal));
							 
							 
							}
									
						 if((-defError) == n)
							{
							 $('#LinearityTopminus').hide();
							// $('#LinearityKnockSuccess').html('');
							 $('#LinearityTopKnockSuccess').html('<div class="alert alert-danger">Linearity Algorithm 1 not Adjusted </div>');
							 }
						
						
						
						 //console.log(PCarr_actualValSorted);
						 PC_Updategraph(PColdreadingSorted, PCarr_actualValSorted);	
				
					    
					     var $elem = $('.icon-repeat');

					     
					     $({deg: n}).animate({deg: n}, {
					      
					      
					         step: function(now) {
					         
					             $elem.css({
					                 'transform': 'rotate('+ ((-now) * 190)  +'deg)'
					             });
					         }
					     });
					    
					      
					     
					      

								
							
						
					 }
					 
			 });
	
	}
	
	var PC_calibrate_Bottom_Linearity_Needed = function ()
	{
//		$("#ZeroErrorKnotch").hide();
//		$("#SpanErrorKnotch").hide();
		
		var PC_calibrate_Bottom_Linearity_Needed = '';
		PC_calibrate_Bottom_Linearity_Needed += '<div class="col-md-12" >'
			+'<div id="LinearitySectionTwoKnockData">'
			+'<h1>Linearity Algorithm 2</h1>'
			+'<div id="LinearityBottomplus" class="fa fa-plus-square col-md-2" style="cursor: pointer;"></div><div class="col-md-8" style="margin-left: 10px;"></div><div id="LinearityBottomminus" style="cursor: pointer;" class="fa fa-minus-square col-md-2"></div>'
			//+'<div class="range">'
			+'<div class="icon-repeat" id="menu-1"></div>'
			//+'</div>'
			+'</div>'
			+'<div id="LinearityBottomKnockSuccess"></div>'
			//$('#LinearityKnotch').html('');
			$('#LinearityBottomKnotch').html(PC_calibrate_Bottom_Linearity_Needed);
			
			//console.log("Section 2");
			var angle = 0;
			var temp  = 0;
			// var range = $("#linearity").val();
			 var LinearityValue = 0 ;
			 var defError = (PC_DefaultErr/100).toFixed(2);
			 var steps = defError/10;
			 var stepFix = parseFloat(steps.toFixed(3));
			 //console.log("steps "+stepFix);
			
			
			 // check Diffrence and indx of positive and negative difference
			 // clear all array and make updated with new values according to updated actual values
			 
		//	 checkVals.splice(0, checkVals.length);
			 negativeValueIndex.splice(0, negativeValueIndex.length);
			 positiveValueIndex.splice(0, positiveValueIndex.length);
			 
			 
				for( var i= 1; i<=(PCarr_actualValSorted.length-2); i++ )
				{
					
					var diff = (PCarr_actualValSorted[i] - PCarr_stdValSorted[i]).toFixed(3);
					
		//			checkVals.push(diff);
					
					if(diff < 0){
						
						negativeValueIndex.push(i);
						
					}else{
						
						positiveValueIndex.push(i);
						
					}
					
		//			checkDiffVals.push(Math.abs(diff));
				}
				
			//	 //console.log("diffrence array "+ checkDiffVals);
				 positiveVal = checkVals.filter((elem) => elem > 0);
			     negativeVal = checkVals.filter((elem) => elem < 0);
			 
				//console.log("in section 2 POSITIVE "+positiveVal.length+" negative val"+negativeVal.length);
			 
//				console.log("Positive value Index "+positiveValueIndex);
//				 console.log("negative value Index "+negativeValueIndex);
			 
			 
			 
			
			/// LINEARITY BOTTOM MINUS CLICK  
			 
//			     LinearityBottomminus  LinearityBottomplus			
					 
					 $('#LinearityBottomplus').bind("click",function (event) {

						 linearityAlgo2Cnt++;
						
		                 //console.log(defError);
						 if(angle >= -(defError)){
							 angle -=parseFloat(stepFix);
							 var n = angle.toFixed(2);
							 //console.log("angle "+n);
						      
							 $('#LinearityBottomminus').show();

							
							 //console.log("negative value Index "+negativeValueIndex);
								
							 for( var i= 0; i<=(negativeValueIndex.length-1); i++ )
								{
								 
								var oldval =  PCarr_actualValSorted[negativeValueIndex[i]];
								
								var LinearityNewVal = (oldval + stepFix).toFixed(3);	
								//console.log("IN Minus old negative value "+oldval+"  new Value "+LinearityNewVal);
								
								 PCarr_actualValSorted.splice(negativeValueIndex[i], 1, parseFloat(LinearityNewVal));
								 
								 
								}
									
							 
							 
							 for( var i= 0; i<=(positiveValueIndex.length-1); i++ )
								{
								 
								var oldval =  PCarr_actualValSorted[positiveValueIndex[i]];
							    //var idx = positiveValueIndex[i] - 1;
								var LinearityNewVal = (oldval + stepFix).toFixed(3);	
								//console.log("IN Plus old positive value "+oldval+"  VALUE TOBE MINUS "+stepedby10arr[idx]+
								//		"   new Value "+LinearityNewVal);
								
								 PCarr_actualValSorted.splice(positiveValueIndex[i], 1, parseFloat(LinearityNewVal));
								
								 
								}
							 
										
							 if(-(defError) == n)
								{
								 $('#LinearityBottomplus').hide();
								$('#LinearitySectionOneKnockData').hide();
								// $('#LinearityKnockSuccess').html('');
								$('#LinearityBottomKnockSuccess').html('<div class="alert alert-danger">Linearity Algorithm 2 not Adjusted!!!</div>');
								
							
								
								 }
							
							
							
							 //console.log(PCarr_actualValSorted);
								 PC_Updategraph(PColdreadingSorted, PCarr_actualValSorted);	
						           
						   

							 
							 
						 
						    
						     var $elem = $('.icon-repeat');

						     
						     $({deg: n}).animate({deg: n}, {
						      
						      
						         step: function(now) {
						         
						             $elem.css({
						                 'transform': 'rotate('+ ((now) * 190)  +'deg)'
						             });
						         }
						     });
						    
						      
						     
						      

									
								
							
						 }
						 });
			 
			 
			 
			 
			 
				// LINEARITY BOTTOM PLUS CLICK	 
					 
//				     LinearityBottomminus  LinearityBottomplus				 

						 $('#LinearityBottomminus').bind("click",function (event) {
							 linearityAlgo2Cnt++;
							 $('#LinearityBottomKnockSuccess').html('');

			                 //console.log(defError);
							 if(angle <= defError){
								 angle +=parseFloat(stepFix);
								 var n = angle.toFixed(2);
								 //console.log("angle "+n);
							      
								 $('#LinearityBottomplus').show();
								 
								
								 
								 
								
								 //console.log("negative value Index "+negativeValueIndex);
								
								 for( var i= 0; i<=(negativeValueIndex.length-1); i++ )
									{
									 
									var oldval =  PCarr_actualValSorted[negativeValueIndex[i]];
									
									var LinearityNewVal = (oldval - stepFix).toFixed(3);	
									//console.log("Plus old negative value "+oldval +"  new Value "+LinearityNewVal);
									
									 PCarr_actualValSorted.splice(negativeValueIndex[i], 1, parseFloat(LinearityNewVal));
									 
									 
									}
								 
								 for( var i= 0; i<=(positiveValueIndex.length-1); i++ )
									{
									 
									var oldval =  PCarr_actualValSorted[positiveValueIndex[i]];
								    //var idx = positiveValueIndex[i] - 1;
									var LinearityNewVal = (oldval - stepFix).toFixed(3);	
									//console.log("IN Plus old positive value "+oldval+"  VALUE TOBE MINUS "+stepedby10arr[idx]+
									//		"   new Value "+LinearityNewVal);
									
									 PCarr_actualValSorted.splice(positiveValueIndex[i], 1, parseFloat(LinearityNewVal));
									
									 
									}
											
								 if(defError == n)
									{
									 $('#LinearityBottomminus').hide();
									 $('#LinearitySectionTwoKnockData').hide();
									// $("#LinearityTopKnotch").prop("hidden", false);
									// $("#LinearityBottomKnotch").prop("hidden", false);
										$('#LinearityBottomKnockSuccess').html('<div class="alert alert-success">Linearity Algorithm 2  Adjusted successfully!!! </div>');

										$("#LinearityBothKnotch").prop("hidden", false);
										PC_calibrate_Both_Linearity_Needed();
									 }
								
								
								
								 //console.log(PCarr_actualValSorted);
									 PC_Updategraph(PColdreadingSorted, PCarr_actualValSorted);	
							
							    
							     var $elem = $('.icon-repeat');

							     
							     $({deg: n}).animate({deg: n}, {
							      
							      
							         step: function(now) {
							         
							             $elem.css({
							                 'transform': 'rotate('+ ((now) * 180)  +'deg)'
							             });
							         }
							     });
							    
							      
							     
							      

										
									
								
							 }
							 
					 });
			
			
			
			
	}
	
	
	var PC_calibrate_Both_Linearity_Needed = function(){
		$("#ZeroErrorKnotch").hide();
		$("#SpanErrorKnotch").hide();
		//console.log("IN SECTION 3");
		var PC_calibrate_Both_Linearity_Needed = '';
		PC_calibrate_Both_Linearity_Needed += '<div class="col-md-12" >'
			+'<div id="LinearitySectionBothKnockData">'
			+'<h1>Linearity Algorithm 3</h1>'
			+'<div id="LinearityBothplus" class="fa fa-plus-square col-md-2" style="cursor: pointer;"></div><div class="col-md-8" style="margin-left: 10px;"></div><div id="LinearityBothminus" style="cursor: pointer;" class="fa fa-minus-square col-md-2"></div>'
			//+'<div class="range">'
			+'<div class="icon-repeat" id="menu-1"></div>'
			//+'</div>'
			+'</div>'
			+'<div id="LinearityhBothKnockSuccess"></div>'
			//$('#LinearityKnotch').html('');
			$('#LinearityBothKnotch').html(PC_calibrate_Both_Linearity_Needed);
			
			//console.log("Section 3");
			var angle = 0;
			var temp  = 0;
//			var minDiff = Math.max.apply(null, checkDiffVals);
//			//console.log("Min Diffrence "+ minDiff);
			
			var defError = (PC_DefaultErr/12).toFixed(2);
			var defError1 = (PC_DefaultErr/10).toFixed(2);
			// var defError = (minDiff/12).toFixed(2);
			var steps = defError/10;
			var stepFix = parseFloat(steps.toFixed(3));
			//console.log("steps "+stepFix);
			
			var steps1 = defError1/10;
			var stepFix1 = parseFloat(steps1.toFixed(3));
			
			//console.log("Old diffrence array with negative sign "+ checkVals);
			 //console.log("Old diffrence array "+ checkDiffVals);
			 
			
			 // check Diffrence and indx of positive and negative difference
			 // clear all array and make updated with new values according to updated actual values
			 
			 checkVals.splice(0, checkVals.length);
			 checkDiffVals.splice(0, checkDiffVals.length);
			 negativeValueIndex.splice(0, negativeValueIndex.length);
			 positiveValueIndex.splice(0, positiveValueIndex.length);
			 
			 
				for( var i= 1; i<=(PCarr_actualValSorted.length-2); i++ )
				{
					
					var diff = (PCarr_actualValSorted[i] - PCarr_stdValSorted[i]).toFixed(3);
					
					checkVals.push(diff);
					
					if(diff < 0){
						
						negativeValueIndex.push(i);
						
					}else{
						
						positiveValueIndex.push(i);
						
					}
					
					checkDiffVals.push(Math.abs(diff));
				}
				
		
				 positiveVal = checkVals.filter((elem) => elem > 0);
			     negativeVal = checkVals.filter((elem) => elem < 0);
			 
				//console.log("in section 3 POSITIVE "+positiveVal.length+" negative val"+negativeVal.length);
			
			
			
			
			 //console.log("New diffrence array with negative sign "+ checkVals);
			 //console.log("New diffrence array "+ checkDiffVals);
			 //console.log("Positive value Index "+positiveValueIndex);
			 //console.log("negative value Index "+negativeValueIndex);
			 
			 var stepedby10arr = [];
			 
			 for( var i= 0; i<=(checkDiffVals.length-1); i++ )
				{
				 		var temp = (checkDiffVals[i]/10).toFixed(3);
				 		stepedby10arr.push(temp);
				 		
				}
			 //console.log("Steped by 10 array "+stepedby10arr);
			 
			// LINEARITY BOTH PLUS CLICK	 

					 $('#LinearityBothplus').bind("click",function (event) {
						 linearityAlgo3Cnt++;
						 $('#LinearityhBothKnockSuccess').html('');
						 $('#LinearityBothminus').show();

		                 //console.log(defError);
						 if(angle <= defError){
							 angle +=parseFloat(stepFix);
							 var n = angle.toFixed(2);
							 //console.log("angle "+n);
						      
							 
							 
							 
							
							 
							 if(positiveValueIndex.length != 0){
								 
								 for( var i= 0; i<=(positiveValueIndex.length-1); i++ )
									{
									 
									var oldval =  PCarr_actualValSorted[positiveValueIndex[i]];
								    var idx = positiveValueIndex[i] - 1;
									var LinearityNewVal = (oldval - stepedby10arr[idx]).toFixed(3);	
									//console.log("IN Plus old positive value "+oldval+"  VALUE TOBE MINUS "+stepedby10arr[idx]+
									//		"   new Value "+LinearityNewVal);
									
									 PCarr_actualValSorted.splice(positiveValueIndex[i], 1, parseFloat(LinearityNewVal));
									
									 
									}
								 
							 }
							 
							
							 
							 
							if(negativeValueIndex.length != 0){
								
								 for( var i= 0; i<=(negativeValueIndex.length-1); i++ )
									{
									 
									var oldval =  PCarr_actualValSorted[negativeValueIndex[i]];
									var idx = negativeValueIndex[i] - 1;
									var LinearityNewVal = (oldval + parseFloat(stepedby10arr[idx])).toFixed(3);
									//console.log("In Plus old negative value "+oldval+"  VALUE TOBE Plus "+stepedby10arr[idx]+
									//		"  new Value "+LinearityNewVal);
									
									 PCarr_actualValSorted.splice(negativeValueIndex[i], 1, parseFloat(LinearityNewVal));
									 //console.log(PCarr_actualValSorted);
									 
									}
										
							}
								
							 if((defError) == n)
								{
								 $('#LinearityBothplus').hide();
								 $('#LinearitySectionBothKnockData').hide();
							
									$('#LinearityhBothKnockSuccess').html('<div class="alert alert-success">Linearity Algorithm 3  Adjusted successfully!!! </div>');
									
									$('#PC_Error_graph_data').hide();
									$('#LinearityKnotch').html('');
									$('#LinearityKnotch').html('<div class="alert alert-success blink" style="font-size:16px; font-weight:bold;">Zero , Span & Linearity Adjusted successfully!!! </div>');
										
									PC_updatedDataTable(PColdreadingSorted,PCarr_actualValSorted);
									 function blink(selector){
										$(selector).fadeOut('slow', function(){
										    $(this).fadeIn('slow', function(){
										        blink(this);
										    });
										});
										}
										    
										blink('.blink');
								 }
							
							
							
							 //console.log(PCarr_actualValSorted);
								 PC_Updategraph(PColdreadingSorted, PCarr_actualValSorted);	
						
						    
						     var $elem = $('.icon-repeat');

						     
						     $({deg: n}).animate({deg: n}, {
						      
						      
						         step: function(now) {
						         
						             $elem.css({
						                 'transform': 'rotate('+ ((now) * 30)  +'deg)'
						             });
						         }
						     });
						    
						      
						     
						      

									
								
							
						 }
						 
				 });
		
		
					 
					 
					 
					// LINEARITY BOTH Minus CLICK	 

					 $('#LinearityBothminus').bind("click",function (event) {
						 linearityAlgo3Cnt++;
						 $('#LinearityBothplus').show();
		                 //console.log(defError);
						 if(angle >= -(defError)){
							 angle -=parseFloat(stepFix);
							 var n = angle.toFixed(2);
							 //console.log("angle "+n);
						  
							 
							 
							
							 
							 if(positiveValueIndex.length != 0){
								 
								 for( var i= 0; i<=(positiveValueIndex.length-1); i++ )
									{
									 
									var oldval =  PCarr_actualValSorted[positiveValueIndex[i]];
								    var idx = positiveValueIndex[i] - 1;
									var LinearityNewVal = (oldval + parseFloat(stepedby10arr[idx])).toFixed(3);	
									//console.log("IN Plus old positive value "+oldval+"  VALUE TOBE MINUS "+stepedby10arr[idx]+
									//		"   new Value "+LinearityNewVal);
									
									 PCarr_actualValSorted.splice(positiveValueIndex[i], 1, parseFloat(LinearityNewVal));
									
									 
									}
								 
							 }
							 
							
							 
							 
							if(negativeValueIndex.length != 0){
								
								 for( var i= 0; i<=(negativeValueIndex.length-1); i++ )
									{
									 
									var oldval =  PCarr_actualValSorted[negativeValueIndex[i]];
									var idx = negativeValueIndex[i] - 1;
									var LinearityNewVal = (oldval - parseFloat(stepedby10arr[idx])).toFixed(3);
									//console.log("In Plus old negative value "+oldval+"  VALUE TOBE Plus "+stepedby10arr[idx]+
									//		"  new Value "+LinearityNewVal);
									
									 PCarr_actualValSorted.splice(negativeValueIndex[i], 1, parseFloat(LinearityNewVal));
									 //console.log(PCarr_actualValSorted);
									 
									}
										
							}
								
							 if((-defError) == n)
								{
								 $('#LinearityBothminus').hide();
								 $('#LinearityhBothKnockSuccess').html('');
									$('#LinearityhBothKnockSuccess').html('<div class="alert alert-danger">Linearity Algorithm 3  not Adjusted!!! </div>');
									
									
									
								 }
							
							
							
							 //console.log(PCarr_actualValSorted);
								 PC_Updategraph(PColdreadingSorted, PCarr_actualValSorted);	
						
						    
						     var $elem = $('.icon-repeat');

						     
						     $({deg: n}).animate({deg: n}, {
						      
						      
						         step: function(now) {
						         
						             $elem.css({
						                 'transform': 'rotate('+ ((-now) * 30)  +'deg)'
						             });
						         }
						     });
						    
						      
						     
						      

									
								
							
						 }
						 
				 });
			
			
	}
	
	
	
	var PC_CheckLinearitySection = function()
	{
    
		
		
		$("#LinearityKnotch").prop("disabled", false);
		 
			for( var i= 1; i<=(PCarr_actualValSorted.length-2); i++ )
			{
				
				var diff = (PCarr_actualValSorted[i] - PCarr_stdValSorted[i]).toFixed(3);
				
				checkVals.push(diff);
				
				if(diff < 0){
					
					negativeValueIndex.push(i);
					
				}else{
					
					positiveValueIndex.push(i);
					
				}
				
				checkDiffVals.push(Math.abs(diff));
			}
			
			 //console.log("diffrence array "+ checkDiffVals);
			 positiveVal = checkVals.filter((elem) => elem > 0);
		     negativeVal = checkVals.filter((elem) => elem < 0);
		 
			//console.log("POSITIVE "+positiveVal.length+" negative val"+negativeVal.length);
		 
			if(positiveVal.length != 0 || (positiveVal.length != 0 && negativeVal.length != 0)){
				$("#LinearityTopKnotch").prop("hidden", false);
				PC_calibrate_Top_Linearity_Needed();
				
			}else{
				$("#LinearityBottomKnotch").prop("hidden", false);

					$("#ZeroErrorKnotch").show();
					$("#SpanErrorKnotch").show();

				PC_calibrate_Bottom_Linearity_Needed();
			}
			
		
	}
	
	
	var PC_updatedDataTable = function(PColdreadingSorted,PCarr_actualValSorted)
	{
		
		
		var PC_IOtable = '';
		
		PC_IOtable += '<div class="row"><div id = "IOtable" class="col-md-12">'
				+ '<table id="PC_DataTable_IO" class="table table-striped table-bordered" style="width:100%">'
				+ '<thead>'
				+ '<tr>'
				+ '<th>Reading No.</th>'
				+ '<th>	Input (in kg/cm²)</th>'
				+ '<th>Output (in mA)</th>'
				+ '</tr>'
				+ '</thead>'

				+ '<tbody >'
				for (var i = 0; i < PCarr_actualValSorted.length ; i++ ) {
					PC_IOtable += '<tr><td>'
				+ (i+1)
				+ '</td><td>'
				+ PColdreadingSorted[i]
				+ '</td><td>'
				+ PCarr_actualValSorted[i]
				+ '</td></tr>'
		}
		PC_IOtable += '</tbody>'

				+ '</table>'
             //  + '<div class="col-md-12" ><p>After few months I/P converter is not working properly.  As a maintenance engineer, Please attend the fault &nbsp;&nbsp; </p>'
				 + '<div class="col-md-12" ><p>After few months it is observed that I/P converter is not working properly. As a maintenance engineer, please identify and rectify the fault &nbsp;&nbsp; </p>'
               + '<button id="PC_FaultChecking">Next level</button>'
				+'</div>'
				PC_IOtable += '</div>'
				
		//readingcnt++;
//				$('#table_IO').DataTable({
//					 "pageLength" : 5,
//				        dom: 'Bfrtip',
//				       // "bDestroy": true,
//					title : 'Data export',
//					buttons : [ {
//						extend : 'excelHtml5',
//						title : 'PC Characterisation value'
//
//					}, {
//						extend : 'pdfHtml5',
//						title : 'PC Characterisation value'
//					} ]
//				});	

		$('#LinearityKnotch').append(PC_IOtable);
		$('#LinearityKnotch').ready(function() {
			$('#PC_DataTable_IO').DataTable({
				"pageLength" : 5,
				dom: 'Bfrtip',
				//"order" : [ [ 10, "desc" ] ],
				title : 'PC_calibration',
				buttons : [ {
					extend : 'excelHtml5',
					title : 'PY 100 Characterisation value'

				}, {
					extend : 'pdfHtml5',
					title : 'PY 100 Characterisation value'
				} ]

			});
		});
		
//		drawGraph(PColdreading, PCarr_actualVal)
		PCCalibrationData.pcoldReadingSorted = PColdreadingSorted
		PCCalibrationData.pcactualValNew = PCarr_actualValSorted;
	
		
		PCCalibrationData.pcZeroAdjustCnt = zeroErrCnt;
		PCCalibrationData.pcSpanAdjustCnt = spanErrCnt;
		PCCalibrationData.pcLinearAlgo1AdjustCnt = linearityAlgo1Cnt;
		PCCalibrationData.pcLinearAlgo2AdjustCnt = linearityAlgo2Cnt;
		PCCalibrationData.pcLinearAlgo3AdjustCnt = linearityAlgo3Cnt;
		
		
		minutes = document.getElementById("minutes").textContent;
		seconds = document.getElementById("seconds").textContent;        		
//		console.log(minutes+":"+seconds);
		
		PCCalibrationData.pcCalibrationTimeInMin = minutes;		
		PCCalibrationData.pcCalibrationTimeInSec = seconds;
		
		ExpTrackData.pcCalibrationData = PCCalibrationData;
		
//		console.log(ExpTrackData);
		
		stop_timer();
		
		$('#PC_FaultChecking').on('click', function() {
			//console.log("entered in fault" +PCarr_actualValSorted);
			PC_FaultCheckFun(i2pType,lowerSpLevel, higherSpLevel, PColdreadingSorted, PCarr_actualValSorted, PCarr_stdValSorted);
		});
	}
	
	
	
	
		
	function sum_sq(array) {
		  var sum = 0, 
		      i = array.length;
		  while (i--) 
		   sum += Math.pow(array[i], 2);
		  return sum;
		}
	
	
	function drawGraph(PColdreadingSorted, PCarr_actualValSorted){
//		var OldValue = [];
//		var StdValue = [];
//		for (var j = 0; j < PColdreadingSorted.length; j++) {
//			var olValueJson = {
//				x : PColdreadingSorted[j],
//				y : PCarr_actualValSorted[j],
//				markerType : "circle",
//				markerSize : 10
//
//			};
//			OldValue.push(olValueJson);
//			var stdValueJson = {
//					x : PColdreadingSorted[j],
//					y : PCarr_stdValSorted[j],
//					markerType : "circle",
//					markerSize : 10
//
//				};
//			StdValue.push(stdValueJson);
//			
//		}
//		// console.log(OldValue);
//		var chart = new CanvasJS.Chart("PC_chartContainer_calibration",
//				{
//					animationEnabled : true,
//					theme : "light2",
//					title : {
//						text : "Pressure Control System (PY 100)",
//						fontSize : 20,
//					},
//
//					axisX : {
//						title : "Input(mA)",
//						crosshair : {
//							enabled : true,
//							snapToDataPoint : true
//						},
//					// ticks: {suggestedMin: 2, max:6}
//					},
//					axisY : {
//						title : "Output(kg/cm²)",
//						minimum : -0.5,
//						maximum : 1.5
//					},
//
//					toolTip : {
//						shared : true
//					},
//					legend : {
//						cursor : "pointer",
//						verticalAlign : "bottom",
//						horizontalAlign : "right",
//						dockInsidePlotArea : true,
//						itemclick : toogleDataSeries
//					},
//					data : [  {
//						type : "line",
//						showInLegend : true,
//						name : "Standard Output",
//						// lineDashType: "dash",
//						color : "#39FF14",
//						dataPoints : [ {
//							x : lowerSpLevel,
//							y : lowerOutputLevel 
//						}, {
//							x : higherSpLevel,
//							y : higherOutputLevel
//						} ]
//					}, {
//						type : "scatter",
//						showInLegend : true,
//						name : "Observed Output",
//						markerType : "circle",
//						// xValueFormatString: "DD MMM,
//						// YYYY",
//						color : "#F08080",
//
//						dataPoints : OldValue
//					}
//					/*, {
//						type : "scatter",
//						showInLegend : true,
//						name : "Observed Output",
//						markerType : "triangle",
//						// xValueFormatString: "DD MMM,
//						// YYYY",
//						color : "#000",
//
//						dataPoints : StdValue
//					}*/
//					
//					]
//				});
//		chart.render();
//
//		function toogleDataSeries(e) {
//			if (typeof (e.dataSeries.visible) === "undefined"
//					|| e.dataSeries.visible) {
//				e.dataSeries.visible = false;
//			} else {
//				e.dataSeries.visible = true;
//			}
//			chart.render();
//		}
//		
		PCDrowGraph()
		PC_Updategraph(PColdreadingSorted, PCarr_actualValSorted);
		
	}
	
	
	function PCDrowGraph(){
		  datapoint1Arr = [];
			 datapoint2Arr = [];
		 chart = new CanvasJS.Chart("PC_chartContainer_calibration",
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
					data : [ 
						{
						type : "scatter",
						showInLegend : true,
						name : "Standard Output",
						// lineDashType: "dash",
						
						color : "#F08080",
						dataPoints :  datapoint1Arr
					}, 
					{
						type : "line",
						showInLegend : true,
						name : "Observed Output",
						markerType : "circle",
						// xValueFormatString: "DD MMM,
						// YYYY",
						color : "#39FF14",

						dataPoints : datapoint2Arr
					}
					/*, {
						type : "scatter",
						showInLegend : true,
						name : "Observed Output",
						markerType : "triangle",
						// xValueFormatString: "DD MMM,
						// YYYY",
						color : "#000",

						dataPoints : StdValue
					}*/
					
					]
				});
//		chart.render();

		function toogleDataSeries(e) {
			if (typeof (e.dataSeries.visible) === "undefined"
					|| e.dataSeries.visible) {
				e.dataSeries.visible = false;
			} else {
				e.dataSeries.visible = true;
			}
			//chart.render();
		}
		
	}
	
	function PC_Updategraph(PColdreadingSorted, PCarr_actualValSorted){
		var OldValue = [];
		var StdValue = [];
		for (var j = 0; j < PColdreadingSorted.length; j++) {
			var olValueJson = {
				x : PColdreadingSorted[j],
				y : PCarr_actualValSorted[j],
				markerType : "circle",
				markerSize : 10

			};
			OldValue.push(olValueJson);
			var stdValueJson = {
					x : PColdreadingSorted[j],
					y : PCarr_stdValSorted[j],
					markerType : "circle",
					markerSize : 10

				};
			StdValue.push(stdValueJson);
			
		}
		
		datapoint2Arr = OldValue;
		chart.options.data[0].dataPoints = datapoint2Arr; 
		
		
		datapoint1Arr.push({
			x : lowerSpLevel,
			y : lowerOutputLevel 
		}, {
			x : higherSpLevel,
			y : higherOutputLevel
		} );
		
		chart.options.data[1].dataPoints = datapoint1Arr; 
		chart.options.data[1].markerType = "circle";
		chart.render();
	}
	
	
}