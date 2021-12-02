
function ItoPconveter(inputValue , outputValue){	
		var w = 900;
    var h = 500;

var width = $(window).width();

  if ($(window).width() < 500) {
	    width = $(this).width();
	    paper = new Raphael(document.getElementById('canvas'), '100%', 500);
	paper.setViewBox(0,0,w,h,true);
	paper.setSize('100%', 500);
  }else
  {
      paper = new Raphael(document.getElementById('canvas'), '100%', 700);
	paper.setViewBox(0,0,w,h,true);
	paper.setSize('100%', 700);
  }
	
    //x = 310;
	//y = 160;
	
	if ($(window).width() <= 1368) {
	x = 50;
	y = 40;
  }else
  {
 x = 50;
	y = 240;
  }
	a = 0;
	
	var IPNozzel = Nozzel(x, y,a,outputValue);
	var IPFlapper = Flapper (x, y ,a);
	var IPspringscrew = springscrewDig (x,y,a);
	var IPplusNozzel = plusNozzelDig(x,y,a);
	var IPminusNozzel = minusNozzelDig(x,y,a);
	var IPOtherParts = DigOtherParts(x,y,inputValue);
	var nozzelScrew;
};


function Nozzel (x ,y , a,outputValue)
{
	 
	x = x + a;
	y = y + a;
//	var path1 = paper.path('M'+(x-a)+' '+(y+205)+' l '+(300+a)+' 0 l 0 -250 l 7 -15 ').attr({'stroke':'black', 'stroke-width':'2'});
//	var path2 =  paper.path('M'+(x-a)+' '+(y+228)+' l '+(300+a)+' 0 l 0 76').attr({'stroke':'black', 'stroke-width':'2'});
//	var path3 = paper.path('M'+(x+315)+' '+(y-60)+' l 0 0 l 7 15 l 0 350 l -23 0').attr({'stroke':'black', 'stroke-width':'2'});
//	paper.path('M'+(x+70-a)+' '+(y+205)+' l 0 7 l 30 0 0 -7 z' ).attr({'fill': '#666','stroke':'black', 'stroke-width':'2'});
//	paper.path('M'+(x+70-a)+' '+(y+220)+' l 0 7 l 30 0 0 -7 z' ).attr({'fill': '#666','stroke':'black', 'stroke-width':'2'});
	var path1 = paper.path('M'+(x-20-a)+' '+(y+145-a)+' l '+(200)+' 0 l 0 -160 ').attr({'stroke':'black', 'stroke-width':'2'});
	var path2 =  paper.path('M'+(x-20-a)+' '+(y+170-a)+' l '+(200)+' 0 l 0 76').attr({'stroke':'black', 'stroke-width':'2'});
	var path3 = paper.path('M'+(x+202-a)+' '+(y-16-a)+'  l 0 262 ').attr({'stroke':'black', 'stroke-width':'2'});
	paper.path('M'+(x+50-a)+' '+(y+145-a)+' l 0 7 l 30 0 0 -7 z' ).attr({'fill': '#666','stroke':'black', 'stroke-width':'2'});
	paper.path('M'+(x+50-a)+' '+(y+162-a)+' l 0 7 l 30 0 0 -7 z' ).attr({'fill': '#666','stroke':'black', 'stroke-width':'2'});
   
	paper.path('M'+(x+200-a)+' '+(y+203-a)+' l 50 0 0 -53 7 0 0 60 -57 0 ' ).attr({'fill': '#fff','stroke':'black', 'stroke-width':'2'});
	paper.path('M'+(x+222-a)+' '+(y+110-a)+' l 60 0 0 40 -60 0 0 -40    ' ).attr({'fill': '#fff','stroke':'black', 'stroke-width':'2'});

	paper.text((x+250-a), y+130-a, outputValue).attr({
		stroke : "green",
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	paper.text((x+320-a), y+130-a,"(kg/cm²)").attr({
		stroke : "green",
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	

 nozzelScrew = paper.path('M'+(x+165)+' '+(y-30-a)+' l -7 0 0 37 7 0 0 -15 50 0 0 -7 -50 0 0 -15' ).attr({'fill': '#666','stroke':'black', 'stroke-width':'2'});

	//	leftnozzel.rotate(a);
//	rightnozzel.rotate(a);
};

function plusNozzelDig(x,y,a)
{
	x = x + a;
	y = y + a;
	
	var rightnozzel = paper.path('M'+(x+202-a)+' '+(y-16-a)+'  l '+(0+a)+' '+(-45+(-a))+' '+(-7)+' '+(-10-a)+'').attr({'stroke':'black', 'stroke-width':'2'});
	var leftnozzel = paper.path('M'+(x+180-a)+' '+(y-16-a)+'  l '+(0+a)+' '+(-45+(-a))+' '+(7+a)+' '+(-10+(-a))+'').attr({'stroke':'black', 'stroke-width':'2'});
	
//	var rightnozzel = paper.path('M'+(x+202-a)+' '+(y-26-a)+'  l '+(0+a)+' '+(-20+(+a))+' '+(-7+a)+' '+(-10+a)+'').attr({'stroke':'black', 'stroke-width':'2'});
//	var leftnozzel = paper.path('M'+(x+180-a)+' '+(y-26-a)+'  l '+(0+a)+' '+(-20+(+a))+' '+(7)+' '+(-10+(+a))+'').attr({'stroke':'black', 'stroke-width':'2'});
		
}
function minusNozzelDig(x,y,a)
{
	x = x + a;
	y = y + a;
//	var rightnozzel = paper.path('M'+(x+202-a)+' '+(y-26-a)+'  l '+(0+a)+' '+(-20+(-a))+' '+(-7)+' '+(-10-a)+'').attr({'stroke':'black', 'stroke-width':'2'});
//	var leftnozzel = paper.path('M'+(x+180-a)+' '+(y-26-a)+'  l '+(0+a)+' '+(-20+(-a))+' '+(7+a)+' '+(-10+(-a))+'').attr({'stroke':'black', 'stroke-width':'2'});
	
	var rightnozzel = paper.path('M'+(x+202-a)+' '+(y-16-a)+'  l '+(0+a)+' '+(-45)+' '+(-7+(a/2))+' '+(-10)+'').attr({'stroke':'black', 'stroke-width':'2'});
	var leftnozzel = paper.path('M'+(x+180-a)+' '+(y-16-a)+'  l '+(0+a)+' '+(-45)+' '+(7+(a/2))+' '+(-10)+'').attr({'stroke':'black', 'stroke-width':'2'});
		
}
function Flapper (x ,y, a)
{
	x = x + a;
	y = y + a;
	
	var flap = paper.path('M'+(x+20-a)+' '+(y-90-a)+' l 0 10 400 '+(0+a)+' l 0 -10  ').attr({'fill':'#FFF','stroke':'black', 'stroke-width':'2'});
	var flap = paper.path('M'+(x+20-a)+' '+(y-90-a)+' l  400 '+(0+a)+'  ').attr({'fill':'#FFF','stroke':'black', 'stroke-width':'2'});
	paper.circle( x+12-a, y-85-a, 10 ).attr({ 'fill': '#fff','stroke':'black', 'stroke-width':'2' }).toFront();
//	flap.rotate(a);
	paper.path('M'+(x+320-a)+' '+(y-80)+' l 0 10 l 70 0 0 -10 z' ).attr({'fill': '#666','stroke':'black', 'stroke-width':'2'}).toBack();
};

function springscrewDig (x,y,a)
{
	y = y + a;
	paper.ellipse(x+255, y-130+a, 25, 15).attr({ 'fill': '#fff','stroke':'black', 'stroke-width':'3' });
	paper.ellipse(x+255, y-135+a, 25, 15).attr({ 'fill': '#fff','stroke':'black', 'stroke-width':'3' });
	
	paper.ellipse(x+255, y-140+a, 25, 15).attr({ 'fill': '#fff','stroke':'black', 'stroke-width':'3' });
	paper.ellipse(x+255, y-145+a, 25, 15).attr({ 'fill': '#fff','stroke':'black', 'stroke-width':'3' });
	
	paper.ellipse(x+255, y-150+a, 25, 15).attr({ 'stroke':'black', 'stroke-width':'3' });
	paper.ellipse(x+255, y-155+a, 25, 15).attr({ 'stroke':'black', 'stroke-width':'3' });
	
	paper.ellipse(x+255, y-160+a, 25, 15).attr({ 'stroke':'black', 'stroke-width':'3' });
	paper.ellipse(x+255, y-165+a, 25, 15).attr({ 'stroke':'black', 'stroke-width':'3' });
	
//	paper.ellipse(x+390, y-130, 30, 15).attr({ 'fill': '#fff','stroke':'black', 'stroke-width':'3' });
//	paper.ellipse(x+390, y-140, 30, 15).attr({ 'fill': '#fff','stroke':'black', 'stroke-width':'3' });
//	paper.ellipse(x+390, y-150, 30, 15).attr({ 'fill': '#fff','stroke':'black', 'stroke-width':'3' });
	
	paper.path('M'+(x+258)+' '+(y-27-a)+' l 0 -75  l 15 -10 l 0 '+(-21+a)+' M'+(x+264)+' '+(y-27-a)+' l 0 -72  l 15 -10 l 0 '+(-25+a)+' ').attr({'stroke':'black', 'stroke-width':'3'}).toBack();
	//paper.path().attr({'stroke':'black', 'stroke-width':'3'}).toBack();
	
	//spring end
	
	
	//spring screw start
	paper.path('M'+(x+280)+' '+(y-170+a)+' l  0 -30 15 0 0 -7 -37 0 0 7 15 0 0 30 z' ).attr({'fill': '#666','stroke':'black', 'stroke-width':'3'}).toBack();
	
   
    //spring screw end	
	
	//dumper start
	paper.path('M'+(x+235)+' '+(y-50-a)+' l  0 47 50 0 0 -45 -7 0 0 '+(35)+' -36 0 0 '+(-35)+' -7 0' ).attr({'fill': '#666','stroke':'black', 'stroke-width':'3'}).toBack();
	paper.path('M'+(x+250)+' '+(y-48-a)+' l  20 0 0 '+(25)+' -21 0 0 '+(-26)+'' ).attr({'fill': '#666','stroke':'black', 'stroke-width':'3'});
	paper.path('M'+(x+235)+' '+(y-48-a)+' l  0 '+(45)+' 50 0 0 '+(-45)+' ' ).attr({'fill': '#9a4526','stroke':'#9a4526', 'stroke-width':'3'}).toBack();
	//dumper end
};

function DigOtherParts (x,y,inputValue)
{
	
	// side magnet start
//	paper.path('M'+(x+320)+' '+(y-80)+' l 0 10 l 70 0 0 -10 z' ).attr({'fill': '#666','stroke':'black', 'stroke-width':'2'});
	paper.path('M'+(x+375)+' '+(y-60)+' l 0 55 15 0 0 -55 z' ).attr({'fill':'#fff','stroke':'black', 'stroke-width':'2'}).toFront();
	paper.path('M'+(x+320)+' '+(y-60)+' l 0 55 15 0 0 -55 z' ).attr({'fill':'#fff','stroke':'black', 'stroke-width':'2'}).toFront();
	
	
	paper.path('M'+(x+375)+' '+(y-48)+' l 15 -6 70 0  ' ).attr({'stroke':'black', 'stroke-width':'2'}).toFront();
	paper.path('M'+(x+375)+' '+(y-38)+' l 15 -6 z' ).attr({'stroke':'black', 'stroke-width':'2'}).toFront();
	paper.path('M'+(x+375)+' '+(y-28)+' l 15 -6 z' ).attr({'stroke':'black', 'stroke-width':'2'}).toFront();
	paper.path('M'+(x+375)+' '+(y-18)+' l  15 -6' ).attr({'stroke':'black', 'stroke-width':'2'}).toFront();
	
	paper.path('M'+(x+320)+' '+(y-48)+' l 15 -6 ' ).attr({'stroke':'black', 'stroke-width':'2'}).toFront();
	paper.path('M'+(x+320)+' '+(y-38)+' l 15 -6 z' ).attr({'stroke':'black', 'stroke-width':'2'}).toFront();
	paper.path('M'+(x+320)+' '+(y-28)+' l 15 -6 z' ).attr({'stroke':'black', 'stroke-width':'2'}).toFront();
	paper.path('M'+(x+320)+' '+(y-18)+' l 15 -6 ' ).attr({'stroke':'black', 'stroke-width':'2'}).toFront();
	paper.path('M'+(x+460)+' '+(y-18)+' l -140 0' ).attr({'stroke':'black', 'stroke-width':'2'}).toBack();
	
	paper.path('M'+(x+290)+' '+(y+20)+' l 0 -80 20 0 0 60 35 0 0 -60 20 0 0 60 35 0 0 -60 20 0 0 80 -130 0' ).attr({'fill':'#fff','stroke':'black', 'stroke-width':'2'}).toFront();
	// side magnet end
	paper.circle(x+460,y-54, 3 ).attr({ 'fill': '#000','stroke':'black', 'stroke-width':'2' }).toFront();
	paper.circle(x+460,y-18, 3 ).attr({ 'fill': '#000','stroke':'black', 'stroke-width':'2' }).toFront();
	//spring start
	
	//paper.ellipse(x+390, y, 30, 15).attr({ 'fill': '#fff','stroke':'black', 'stroke-width':'3' });
	
	
	

	paper.text((x+50), (y+130), "Supply pressure (1.4 kg/cm²)").attr({
		stroke : 'black',
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	
	paper.text((x+80), (y+180), "Restriction").attr({
		stroke : 'black',
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	
	paper.text((x+200), (y+265), "Signal pressure (0.2-1 kg/cm²)").attr({
		stroke : 'black',
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	paper.text((x+140), (y-50), "Nozzle").attr({
		stroke : 'black',
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	
	paper.text((x+100), (y-110), "Flapper").attr({
		stroke : 'black',
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	paper.text((x+480), (y-80), "Soft iron plate").attr({
		stroke : 'black',
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	paper.text((x-20), (y-70), "Pivot").attr({
		stroke : 'black',
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	paper.text((x+460), (y-38), inputValue+" (mA)").attr({
		stroke : 'green',
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	paper.text((x+320), (y-150), "Spring").attr({
		stroke : 'black',
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	paper.text((x+360), (y+35), "E shape Magnet").attr({
		stroke : 'black',
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	paper.text((x+260), (y+8), "Damper").attr({
		stroke : 'black',
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	paper.text((x+200), (y+290), "I/P converter").attr({
		stroke : 'black',
		'font-size' : 25,
		"font-family": "sans-serif" 
	});	
};