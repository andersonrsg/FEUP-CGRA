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

	//---------------stacks------------------
	for (var q = 0; q <= this.stacks; q++) {
		//---------------slices------------------
		for (var i = 0; i < this.slices; i++) {
		
		this.vertices.push(Math.cos(i*(2*Math.PI)/this.slices));
		this.vertices.push(Math.sin(i*(2*Math.PI)/this.slices));
		this.vertices.push(q);
		}
	}


	//---------------stacks------------------
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

	//---------------stacks------------------
	for (var q = 0; q <= this.stacks; q++) {
		//---------------slices------------------
		for (var i = 0; i < this.slices; i++) {
		
			this.normals.push(Math.cos(i*(2*Math.PI)/this.slices));
			this.normals.push(Math.sin(i*(2*Math.PI)/this.slices));
			this.normals.push(q);

		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
