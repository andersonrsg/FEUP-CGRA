/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
	
 	this.vertices = [];
 	this.indices = [];
	this.normals = [];
	this.texCoords = [];

	//---------------stacks------------------
	for (var q = 0; q <= this.stacks;q++) {
		//---------------slices------------------
		for (var i = 0; i < this.slices; i++) {
			this.vertices.push(Math.cos(i*(2*Math.PI)/this.slices));
			this.vertices.push(Math.sin(i*(2*Math.PI)/this.slices));
			this.vertices.push(q);

			this.normals.push(Math.cos(i*(2*Math.PI)/this.slices));
			this.normals.push(Math.sin(i*(2*Math.PI)/this.slices));
			this.normals.push(0);
		}
	}

	for (var q = 0; q < this.stacks; q++) {
		//---------------slices------------------
		for (var i = 0; i < this.slices; i++) {

			this.indices.push(this.slices*q+i);
			this.indices.push(this.slices*q+i+1);
			this.indices.push(this.slices*(q+1)+i);
			if (i != (this.slices - 1)) {
				this.indices.push(this.slices*(q+1)+i+1);
				this.indices.push(this.slices*(q+1)+i);
				this.indices.push(this.slices*q+i+1);
				}
			else {
				this.indices.push(this.slices*q);
				this.indices.push(this.slices*q+i+1)
				this.indices.push(this.slices*q+i);
				}
		}
	}

	var s = 0;
	var t = 0;
	var sinc = 1/this.slices;
	var tinc = 1/this.stacks;
	for (var a = 0; a <= this.stacks; a++) {
		for (var b = 0; b < this.slices; b++) {
			this.texCoords.push(s, t);
			s += sinc;
		}
		s = 0;
		t += tinc;
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };