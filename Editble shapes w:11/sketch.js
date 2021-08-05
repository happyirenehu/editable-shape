/*
	1. plot out a shape as a series of vertices
	   * add a button swtichint between creating 
	   vertices and editing
	   * click the convas to add a vertex
	   * don't draw right away add vertex 
	   to an array the dra but don't save to canvas
	2. edit the vertices using a mouse drag
		* if editing is on
		* highlight the location of the vertices
		* when mouse pressed is near vertex
		(using the dies) update the vertex x 
		and y with the mouseX and mouseY

	3. confirm the final shape
*/

var editButton;
var finishButton;

var editMode = false;
var currentShape = [];

var c;

function setup()
{
	c = createCanvas(800, 800);
	background(200);
	noFill();
	loadPixels();
	editButton = createButton('Edit Shape');
	editButton.mousePressed(function(){
		if(editMode){
			editMode = false;
			editButton.html("Edit Shape")
		}
		else{
			editMode = true;
			editButton.html("Add Vertices")
		}
	})

	finishButton = createButton('Finish Shape');

	finishButton.mousePressed(function(){
		editMode = false;
		draw();
		loadPixels();
		currentShape = [];
	})
}



function draw(){
	updatePixels();
	if(mousePressOnCanvas(c) && mouseIsPressed){
			
			if(!editMode){
				currentShape.push({
					x: mouseX,
					y: mouseY
			});
		}
		else{
			for(var i = 0; i < 
				currentShape.length; i++){
				if(dist(currentShape[i].x,
					currentShape[i].y,
					mouseX,
					mouseY) < 15){
						currentShape[i].x = mouseX;
						currentShape[i].y = mouseY;
				}
			}
		}
	}	

	 beginShape();	
		for(var i = 0; i < currentShape.length; i++){
			vertex(currentShape[i].x,
			currentShape[i].y);	
			if(editMode){
				fill('red');
				ellipse(currentShape[i].x, 
						currentShape[i].y, 10);
				noFill();
			}
		}
		endShape();
	}
  function mousePressOnCanvas(canvas){
			if( mouseX > canvas.elt.clientLeft &&
				mouseX < (canvas.elt.clientLeft+
					canvas.width) &&
				mouseY > canvas.elt.clientTop &&
				mouseY < (canvas.elt.clientTop +
					canvas.height)
				){
				return true;
		}
				return false;

	}



