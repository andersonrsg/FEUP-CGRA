/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **Math.single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
	
 	this.vertices = [];
	for (var i = 0; i < this.slices; i++) {
	this.vertices.push(Math.sin(i*(2*Math.PI)/this.slices));
	this.vertices.push(Math.cos(i*(2*Math.PI)/this.slices));
	this.vertices.push(0);

	this.vertices.push(Math.sin((i+1)*(2*Math.PI)/this.slices));
	this.vertices.push(Math.cos((i+1)*(2*Math.PI)/this.slices));
	this.vertices.push(0);

	this.vertices.push(Math.sin(i*(2*Math.PI)/this.slices));
	this.vertices.push(Math.cos(i*(2*Math.PI)/this.slices));
	this.vertices.push(this.stacks);

	this.vertices.push(Math.sin((i+1)*(2*Math.PI)/this.slices));
	this.vertices.push(Math.cos((i+1)*(2*Math.PI)/this.slices));
	this.vertices.push(this.stacks);
	}

 	this.indices = [];
	for (var i = 0; i < this.slices; i++) {
		this.indices.push(2*i);
		this.indices.push(2*i+1);
		this.indices.push(2*i+2);
		
		this.indices.push(2*i+1);
		this.indices.push(2*i+3);
		this.indices.push(2*i+2);

	}

 	//this.normals = [];
	/*for (var i = 0; i < this.slices; i++) {
	this.vertices.push(Math.sin(i*(2*Math.PI)/this.slices));
	this.vertices.push(Math.cos(i*(2*Math.PI)/this.slices));
	this.vertices.push(0);

	this.vertices.push(Math.sin((i+1)*(2*Math.PI)/this.slices));
	this.vertices.push(Math.cos((i+1)*(2*Math.PI)/this.slices));
	this.vertices.push(0);

	this.vertices.push(Math.sin(i*(2*Math.PI)/this.slices));
	this.vertices.push(Math.cos(i*(2*Math.PI)/this.slices));
	this.vertices.push(this.stacks);

	this.vertices.push(Math.sin((i+1)*(2*Math.PI)/this.slices));
	this.vertices.push(Math.cos((i+1)*(2*Math.PI)/this.slices));
	this.vertices.push(this.stacks);
	}*/
	


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
