/**
 * MyClockSurface
 * @constructor
 */
 
 function MyClockSurface(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyClockSurface.prototype = Object.create(CGFobject.prototype);
 MyClockSurface.prototype.constructor = MyClockSurface;

 MyClockSurface.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **Math.single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
	
 	this.vertices = [];
 	this.indices = [];
	this.normals = [];
	this.texCoords = [];

	//Desenho da base do cilindro

	this.vertices.push(0,0,this.stacks);
	this.normals.push(0,0,this.stacks);
	this.texCoords.push(0.5,0.5);

	for (var i = 0; i < this.slices; i++) {
		this.vertices.push(Math.cos(i*(2*Math.PI)/this.slices));
		this.vertices.push(Math.sin(i*(2*Math.PI)/this.slices));
		this.vertices.push(this.stacks);

		this.normals.push(0);
		this.normals.push(0);
		this.normals.push(this.stacks);

		this.texCoords.push(0.5+Math.cos(i*(2*Math.PI)/this.slices)/2);
		this.texCoords.push(0.5-Math.sin(i*(2*Math.PI)/this.slices)/2);
	}
	//----------------------------
		//---------------slices------------------
	for (var i = 0; i < this.slices; i++) {

		if (i == this.slices - 1) {
			this.indices.push(0);
			this.indices.push(i + 1);
			this.indices.push(1);
		}
		else {
			this.indices.push(0);
			this.indices.push(i + 1);
			this.indices.push(i + 2);
		}
	}



 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
