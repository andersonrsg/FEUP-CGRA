/**
 * MyPaperPlane
 * @constructor
 */
 var degToRad = Math.PI / 180.0;


 function MyPaperPlane(scene) {
 	CGFobject.call(this,scene);

	this.xTranslation = 14;
	this.yTranslation = 5;
	this.rotX = 0;
	this.lastUpdate = -1;

 	this.initBuffers();
 };

 MyPaperPlane.prototype = Object.create(CGFobject.prototype);
 MyPaperPlane.prototype.constructor = MyPaperPlane;

 MyPaperPlane.prototype.initBuffers = function() {
    
	
 	this.vertices = [];
 	this.indices = [];
	this.normals = [];
    
	//Desenho da base do cilindro

	this.vertices.push(0, 0, 0.3);
	this.vertices.push(0, 0, -0.3);
	this.vertices.push(-1, 0, 0);
	this.vertices.push(-1, 0, 0);
	this.vertices.push(0, 0, 0);
	this.vertices.push(0, -0.2, 0);
	this.vertices.push(-1, 0, 0);
	this.vertices.push(0, 0, 0);
	this.vertices.push(0, -0.2, 0);
	this.vertices.push(0, 0, 0.3);
	this.vertices.push(0, 0, -0.3);
	this.vertices.push(-1, 0, 0);

	this.normals.push(0,1,0);
	this.normals.push(0,1,0);
	this.normals.push(0,1,0);
	this.normals.push(0,0,1);
	this.normals.push(0,0,1);
	this.normals.push(0,0,1);
	this.normals.push(0,0,-1);
	this.normals.push(0,0,-1);
	this.normals.push(0,0,-1);
	this.normals.push(0,-1,0);
	this.normals.push(0,-1,0);
	this.normals.push(0,-1,0);

	this.indices.push(0,1,2);
	this.indices.push(3,5,4);
	this.indices.push(6,7,8);
	this.indices.push(11,10,9);
	

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };



MyPaperPlane.prototype.update = function(currTime) {
	if (this.lastUpdate == -1)
		this.lastUpdate = currTime;
	else if (this.xTranslation > 0.9) {
		var diff = currTime - this.lastUpdate;
		this.lastUpdate = currTime;
		this.xTranslation -= (diff * (7/1000));
	}
	else if (this.yTranslation > 0.3) {
		var diff = currTime - this.lastUpdate;
		this.lastUpdate = currTime;
		this.yTranslation -= (diff *(7/1000));
		this.rotX -= (diff * 600/1000);
	}
}

