

ConnFor_I2P_TY100 = function(appId, type,jsonarray){
/* var reader = new draw2d.io.json.Reader();
 reader.unmarshal(canvas1, json); */
 

 // app  = new example.Application(appId, type);
analogOutToI2pPlus_TY100 = 0;
analogOutToI2pMinus_TY100 = 0;

i2pWrongConnection_TY100 = 0;

 
 
 var temp = JSON.parse(jsonarray);
 
// console.log(temp);
 
 var temp1 = 0;
	 

	 
$.each(temp , function (key, value) {
  if(value.type == "draw2d.Connection"){
	  
	temp1 = 1; 
   
 }
 
});
	 
	 

	 if(temp1 != 0){
		 
		   for(i= 0; i < temp.length; i++){
		 
		if(temp[i].type == "draw2d.Connection"){
		 
		 
		 if((temp[i].source.port == "TY100_i2pPlus" &&  temp[i].target.port) == "analogOutplus" || ( temp[i].source.port == "analogOutplus"  &&  temp[i].target.port == "TY100_i2pPlus" )){
			
			 analogOutToI2pPlus_TY100 = 1;
			
	 
		} else if(( temp[i].source.port == "TY100_i2pMinus" &&  temp[i].target.port == "analogOutMinus" ) || ( temp[i].source.port == "analogOutMinus" && temp[i].target.port == "TY100_i2pMinus")){
			
			analogOutToI2pMinus_TY100 = 1;
			
		} else{
			
			i2pWrongConnection_TY100 = 1;
			CheckWrongConnectionI2p_TY100();
			break;
			
		}
		 
		 
	 }
		
 }

		CheckRightConnectionI2p_TY100();
		 
	 }else{
		 
		 alertify.alert("Alert","Do Some Connection");
		 $(".ajs-header").css("background-color","#ce6058");
		 
	 }
	
 

 
}

CheckRightConnectionI2p_TY100 = function(){
	
	if(analogOutToI2pPlus_TY100 == 1 && analogOutToI2pMinus_TY100 == 1 &&  i2pWrongConnection_TY100 == 0){
		
		alertify.alert("Success","Correct Connection. Please click next level");
		 $(".ajs-header").css("background-color","#4CAF50");
		app.toolbar.characterisation_Button.show();
//		app.toolbar.characterisation_Button.hide();
	    rightConn = 1;
		
	}else{
		
		if(i2pWrongConnection_TY100 == 0){

		
					if(ConnFlagCnt == 3){
							app.toolbar.hintButton.show();							
							alertify.alert("Alert","Wrong Connection");	
							 $(".ajs-header").css("background-color","#ce6058");
							rightConn = 0;		
						}else{
							
							alertify.alert("Alert","Wrong Connection");
							 $(".ajs-header").css("background-color","#ce6058");
							ConnFlagCnt++
							rightConn = 0;
						}
		
			
			
		}
		
		
	}
	
}

CheckWrongConnectionI2p_TY100 = function(){
	
	
	                    if(ConnFlagCnt == 3){
							 app.toolbar.hintButton.show();
							 
							 alertify.alert("Alert","Wrong Connection");
							 $(".ajs-header").css("background-color","#ce6058");
							 rightConn = 0;
							 
													
						}else{
			
							if(i2pWrongConnection_TY100 == 1){
		
							alertify.alert("Alert","Wrong Connection");
							 $(".ajs-header").css("background-color","#ce6058");
							ConnFlagCnt++;
							rightConn = 0;
		
							}
						}
	
	
	
	
	
	
	
}
	
	
	
	
