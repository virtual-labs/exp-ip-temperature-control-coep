//var a = 5;
function anim_ItoPconveter_reverse(inputValue,OutputValue){	
	//paper = new Raphael(document.getElementById('anim_canvas_reverse'), '100%', 500);
		var w = 900;
    var h = 500;

var width = $(window).width();

  if ($(window).width() < 500) {
	    width = $(this).width();
	    paper = new Raphael(document.getElementById('anim_canvas_reverse'), '100%', 500);
	paper.setViewBox(0,0,w,h,true);
	paper.setSize('100%', 500);
  }else
  {
      paper = new Raphael(document.getElementById('anim_canvas_reverse'), '100%', 600);
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
	
	var IPNozzel = Nozzelanim (x, y,a,OutputValue);
	var IPFlapper = FlapperAnim (x, y ,a);
	var IPspringscrew = springscrew (x,y,a);
	var IPplusNozzel = plusNozzel(x,y,a);
	var IPminusNozzel = minusNozzel(x,y,a);
	var IPOtherParts = OtherParts(x,y,inputValue);
	var nozzelScrew;
	var flapperscrew;
};


function Nozzelanim (x ,y , a, OutputValue)
{
	x = x + a;
	y = y + a;
//	var path1 = paper.path('M'+(x-a)+' '+(y+205)+' l '+(300+a)+' 0 l 0 -250 l 7 -15 ').attr({'stroke':'black', 'stroke-width':'2'});
//	var path2 =  paper.path('M'+(x-a)+' '+(y+228)+' l '+(300+a)+' 0 l 0 76').attr({'stroke':'black', 'stroke-width':'2'});
//	var path3 = paper.path('M'+(x+315)+' '+(y-60)+' l 0 0 l 7 15 l 0 350 l -23 0').attr({'stroke':'black', 'stroke-width':'2'});
//	paper.path('M'+(x+70-a)+' '+(y+205)+' l 0 7 l 30 0 0 -7 z' ).attr({'fill': '#666','stroke':'black', 'stroke-width':'2'});
//	paper.path('M'+(x+70-a)+' '+(y+220)+' l 0 7 l 30 0 0 -7 z' ).attr({'fill': '#666','stroke':'black', 'stroke-width':'2'});
	var path1 = paper.path('M'+(x-20-a)+' '+(y+155-a)+' l '+(200)+' 0 l 0 -121 ').attr({'stroke':'black', 'stroke-width':'2'});
	var path2 =  paper.path('M'+(x-20-a)+' '+(y+180-a)+' l '+(200)+' 0 l 0 56').attr({'stroke':'black', 'stroke-width':'2'});
	var path3 = paper.path('M'+(x+202-a)+' '+(y+34-a)+'  l 0 203 ').attr({'stroke':'black', 'stroke-width':'2'});
	paper.path('M'+(x+50-a)+' '+(y+155-a)+' l 0 7 l 30 0 0 -7 z' ).attr({'fill': '#666','stroke':'black', 'stroke-width':'2'});
	paper.path('M'+(x+50-a)+' '+(y+172-a)+' l 0 7 l 30 0 0 -7 z' ).attr({'fill': '#666','stroke':'black', 'stroke-width':'2'});
   
	paper.path('M'+(x+200-a)+' '+(y+213-a)+' l 48 0 0 -53 7 0 0 60 -55 0 ' ).attr({'fill': '#fff','stroke':'black', 'stroke-width':'2'});
	paper.path('M'+(x+220-a)+' '+(y+120-a)+' l 60 0 0 40 -60 0 0 -40    ' ).attr({'fill': '#fff','stroke':'black', 'stroke-width':'2'});

	paper.text((x+250-a), y+140-a, OutputValue).attr({
		stroke : "green",
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	paper.text((x+320-a), y+140-a,"(kg/cm²)").attr({
		stroke : "green",
		'font-size' : 15,
		"font-family": "sans-serif" 
	});

	 nozzelScrew = paper.path('M'+(x+160)+' '+(y-10-a)+' l -7 0 0 37 7 0 0 -15 50 0 0 -7 -50 0 0 -15' ).attr({'fill': '#666','stroke':'black', 'stroke-width':'2'}).toFront();
//	leftnozzel.rotate(a);
//	rightnozzel.rotate(a);
};

function plusNozzel(x,y,a)
{
	x = x + a;
	y = y + a;
	
	var rightnozzel = paper.path('M'+(x+202-a)+' '+(y+34-a)+'  l '+(0+a)+' '+(-95)+' '+(-7)+' '+(-10)+'').attr({'stroke':'black', 'stroke-width':'2'}).toBack();
	var leftnozzel = paper.path('M'+(x+180-a)+' '+(y+34-a)+'  l '+(0+a)+' '+(-95)+' '+(7)+' '+(-10)+'').attr({'stroke':'black', 'stroke-width':'2'}).toBack();
	
//	var rightnozzel = paper.path('M'+(x+202-a)+' '+(y-26-a)+'  l '+(0+a)+' '+(-20+(+a))+' '+(-7+a)+' '+(-10+a)+'').attr({'stroke':'black', 'stroke-width':'2'});
//	var leftnozzel = paper.path('M'+(x+180-a)+' '+(y-26-a)+'  l '+(0+a)+' '+(-20+(+a))+' '+(7)+' '+(-10+(+a))+'').attr({'stroke':'black', 'stroke-width':'2'});
		
}
function minusNozzel(x,y,a)
{
	console.log("a="+a);
	x = x + a;
	y = y + a;
	
	var rightnozzel = paper.path('M'+(x+202-a)+' '+(y+34-a)+'  l '+(0+a)+' '+(-95)+' '+(-7)+' '+(-10)+'').attr({'stroke':'black', 'stroke-width':'2'}).toBack();
	var leftnozzel = paper.path('M'+(x+180-a)+' '+(y+34-a)+'  l '+(0+a)+' '+(-95)+' '+(7)+' '+(-10)+'').attr({'stroke':'black', 'stroke-width':'2'}).toBack();
}
function FlapperAnim (x ,y, a)
{
	x = x + a;
	y = y + a;
	
	var flap = paper.path('M'+(x+20-a)+' '+(y-90-a)+' l 0 10 415 '+(0+a)+' l 0 -10  ').attr({'fill':'#FFF','stroke':'black', 'stroke-width':'2'});
	var flap = paper.path('M'+(x+20-a)+' '+(y-90-a)+' l  415 '+(0+a)+'  ').attr({'fill':'#FFF','stroke':'black', 'stroke-width':'2'});
	paper.circle( x+12-a, y-85-a, 10 ).attr({ 'fill': '#fff','stroke':'black', 'stroke-width':'2' }).toFront();
//	flap.rotate(a);
	paper.path('M'+(x+335-a)+' '+(y-100)+' l 0 10 l 70 0 0 -10 z' ).attr({'fill': '#666','stroke':'black', 'stroke-width':'2'}).toBack();
};

function springscrew (x,y,a)
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
	flapperscrew = paper.path('M'+(x+280)+' '+(y-170+a)+' l  0 -35 15 0 0 -7 -37 0 0 7 15 0 0 35 z' ).attr({'fill': '#666','stroke':'black', 'stroke-width':'3'}).toBack();
	
   
    //spring screw end	
	
	//dumper start
	paper.path('M'+(x+235)+' '+(y-50-a)+' l  0 47 50 0 0 -45 -7 0 0 '+(35)+' -36 0 0 '+(-35)+' -7 0' ).attr({'fill': '#666','stroke':'black', 'stroke-width':'3'}).toBack();
	paper.path('M'+(x+250)+' '+(y-48-a)+' l  20 0 0 '+(25)+' -21 0 0 '+(-26)+'' ).attr({'fill': '#666','stroke':'black', 'stroke-width':'3'});
	paper.path('M'+(x+235)+' '+(y-48-a)+' l  0 '+(45)+' 50 0 0 '+(-45)+' ' ).attr({'fill': '#9a4526','stroke':'#9a4526', 'stroke-width':'3'}).toBack();
	//dumper end
};

function OtherParts (x,y,inputValue)
{
	
	// side magnet start
	
	paper.path('M'+(x+390)+' '+(y-165)+' l 0 55 15 0 0 -55 z' ).attr({'fill':'#fff','stroke':'black', 'stroke-width':'2'});
	paper.path('M'+(x+335)+' '+(y-165)+' l 0 55 15 0 0 -55 z' ).attr({'fill':'#fff','stroke':'black', 'stroke-width':'2'});
	
	paper.path('M'+(x+390)+' '+(y-150)+' l 15 -6 70 0' ).attr({'stroke':'black', 'stroke-width':'2'});
	paper.path('M'+(x+390)+' '+(y-140)+' l 15 -6 z' ).attr({'stroke':'black', 'stroke-width':'2'});
	paper.path('M'+(x+390)+' '+(y-130)+' l 15 -6 z' ).attr({'stroke':'black', 'stroke-width':'2'});
	paper.path('M'+(x+390)+' '+(y-120)+' l  15 -6 ' ).attr({'stroke':'black', 'stroke-width':'2'});
	
	paper.path('M'+(x+335)+' '+(y-150)+' l 15 -6 ' ).attr({'stroke':'black', 'stroke-width':'2'});
	paper.path('M'+(x+335)+' '+(y-140)+' l 15 -6 z' ).attr({'stroke':'black', 'stroke-width':'2'});
	paper.path('M'+(x+335)+' '+(y-130)+' l 15 -6 z' ).attr({'stroke':'black', 'stroke-width':'2'});
	paper.path('M'+(x+335)+' '+(y-120)+' l  15 -6 ' ).attr({'stroke':'black', 'stroke-width':'2'});
	paper.path('M'+(x+475)+' '+(y-120)+' l -140 0' ).attr({'stroke':'black', 'stroke-width':'2'}).toBack();
	
	paper.path('M'+(x+305)+' '+(y-190)+' l 0 80 20 0 0 -60 35 0 0 60 20 0 0 -60 35 0 0 60 20 0 0 -80 -130 0' ).attr({'fill':'#fff','stroke':'black', 'stroke-width':'2'});
	// side magnet end
	paper.circle(x+478,y-155, 3 ).attr({ 'fill': '#000','stroke':'black', 'stroke-width':'2' }).toFront();
	paper.circle(x+478,y-120, 3 ).attr({ 'fill': '#000','stroke':'black', 'stroke-width':'2' }).toFront();
	//spring start
	
	//paper.ellipse(x+390, y, 30, 15).attr({ 'fill': '#fff','stroke':'black', 'stroke-width':'3' });
	
	
	

	paper.text((x+50), (y+140), "Supply pressure (1.4 kg/cm²)").attr({
		stroke : 'black',
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	
	paper.text((x+80), (y+190), "Restriction Reverse").attr({
		stroke : 'black',
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	
	paper.text((x+200), (y+280), "Signal pressure (0.2-1 kg/cm²)").attr({
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
	paper.text((x+490), (y-87), "Soft iron plate").attr({
		stroke : 'black',
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	paper.text((x-20), (y-70), "Pivot").attr({
		stroke : 'black',
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	paper.text((x+475), (y-140), inputValue+" (mA)").attr({
		stroke : 'green',
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	paper.text((x+200), (y-150), "Spring").attr({
		stroke : 'black',
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	
	paper.text((x+370), (y-205), "E shape Magnet").attr({
		stroke : 'black',
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	paper.text((x+260), (y+8), "Damper").attr({
		stroke : 'black',
		'font-size' : 15,
		"font-family": "sans-serif" 
	});
	paper.text((x+250), (y+350), "I/P converter").attr({
		stroke : 'black',
		'font-size' : 25,
		"font-family": "sans-serif" 
	});	
};