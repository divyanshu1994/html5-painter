var canvas;
var context;
var rubberCanvas=document.getElementById('rubberband');;
var rubberContext=  rubberContext=rubberCanvas.getContext('2d');
var height=rubberCanvas.height;
var width=rubberContext.width;
var strokeSelect=document.getElementById('stroke'),

SizeSelect=document.getElementById('size'),
mousedown={};
rubberbandRect={};
var loc;
var dragging=false;
var drawsurface;
var lineSelect;
var brushSelect;
var eraserSelect;
var brushButton=document.getElementById('brush_button');
var lineButton=document.getElementById('line_button');
var eraserButton=document.getElementById('eraser_button');
var size=4;
var paint=[];
var i=0;


function init2()
{

	rubberCanvas.width=window.innerWidth-20;
rubberCanvas.height=500;
rubberContext.strokeStyle="#ff0000";
rubberContext.fillStyle="#ff0000";

}
function save()
{
	//save current surface
drawsurface=rubberContext.getImageData(0,0,rubberCanvas.width,rubberCanvas.height);

}
function restore()
{
	//restore previous surface
	rubberContext.putImageData(drawsurface,0,0);
}
function saveForUndo()
{
	paint.push(rubberContext.getImageData(0,0,rubberCanvas.width,rubberCanvas.height));
i=i+1;
}
rubberCanvas.onmousedown=function(e)
{	
	saveForUndo();
	
	paintStart=true;
if(lineSelect)
{	
loc=windowToCanvas(e.clientX,e.clientY);
	
save();
e.preventDefault();
	mousedown.x=loc.x;
	mousedown.y=loc.y;
	dragging=true;
	 // on mouse down sva surface
}
if(brushSelect)
{
	loc=windowToCanvas(e.clientX,e.clientY);
	e.preventDefault();
	dragging=true;
	mousedown.x=loc.x;
	mousedown.y=loc.y;
}
if(eraserSelect)
{
    loc=windowToCanvas(e.clientX,e.clientY);
	e.preventDefault();
	dragging=true;
	mousedown.x=loc.x;
	mousedown.y=loc.y;
}

}
rubberCanvas.onmousemove=function(e)
{
	if(lineSelect)
	{
	e.preventDefault();
	if(dragging)
{
   loc=windowToCanvas(e.clientX,e.clientY);
   restore();      
   // on mouse move restore surface and prevent 
   //permant drawing on the surface
   drawRubberBand(loc);

   
}

}

if(brushSelect)
{
	if(dragging)
	{
		loc=windowToCanvas(e.clientX,e.clientY);
		drawRubberBand(loc);
	}
}
if(eraserSelect)
{
if(dragging)
	{
		loc=windowToCanvas(e.clientX,e.clientY);
		drawRubberBand(loc);
	}

}

}
rubberCanvas.onmouseup=function(e)
{
	

	if(lineSelect)
	{
	loc=windowToCanvas(e.clientX,e.clientY);
	drawRubberBand(loc);
	dragging=false;
}
if(brushSelect)
{
	loc=windowToCanvas(e.clientX,e.clientY);
	drawRubberBand(loc);
	dragging=false;
}
if(eraserSelect)
{
	loc=windowToCanvas(e.clientX,e.clientY);
	drawRubberBand(loc);
	dragging=false;
}

}
function drawRubberBand(loc)
{
	 if(lineSelect)
	 {
  rubberContext.beginPath();
  rubberContext.lineWidth=size;
  rubberContext.moveTo(mousedown.x,mousedown.y); 
  rubberContext.lineTo(loc.x,loc.y);
  rubberContext.stroke();

}
if(brushSelect)
{
	rubberContext.beginPath();
	rubberContext.arc(loc.x,loc.y,size,0,Math.PI*2,true);
	rubberContext.fill();
}
if(eraserSelect)
{
    rubberContext.beginPath();
    rubberContext.clearRect(loc.x,loc.y,size,size);
    rubberContext.fill();
}

}
function windowToCanvas(x,y)
{
	var bbox=rubberCanvas.getBoundingClientRect();  // get the canvas rectangle
    return {x: x-bbox.left,
    		y: y-bbox.top}	;
}
strokeSelect.onchange=function(e)
{
	rubberContext.strokeStyle=strokeSelect.value;
		rubberContext.fillStyle=strokeSelect.value;

}
function setLine()
{
	lineSelect=true;
	brushSelect=false;
	eraserSelect=false;
	lineButton.style.background="#00ffff";
	brushButton.style.background="#ffffff";
	eraserButton.style.background="#ffffff";

}
function setBrush()
{
	lineSelect=false;
	brushSelect=true;
	eraserSelect=false;
   brushButton.style.background="#00ffff";
   	lineButton.style.background="#ffffff";
   	eraserButton.style.background="#ffffff";
}
function setEraser()
{
	lineSelect=false;
	brushSelect=false;
	eraserSelect=true;
   brushButton.style.background="#ffffff";
   	lineButton.style.background="#ffffff";
   	eraserButton.style.background="#00ffff";
}

SizeSelect.onchange=function(e)
{
size=SizeSelect.value;
}
function undo()
{   
	if(i<=0)
	{
		
		i=0;
		paint=[];
	}

	else
	{
	rubberContext.putImageData(paint[i-1],0,0);
	i=i-1;
}

}
