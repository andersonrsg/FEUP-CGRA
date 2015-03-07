/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

 function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

//duas linhas copiadas de MyObject
MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, -0.5,
            -0.5, -0.5, 0.5,
            -0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5,
            0.5, -0.5, -0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, -0.5,
            0.5, 0.5, 0.5,
			];

	this.indices = [
            0, 4, 1,
			4, 5, 1,

			1, 5, 7,
			1, 7, 3,

			7, 5, 4,
			7, 4, 6,

			2, 3, 7,
			2, 7, 6,

			4, 0, 2,
			2, 6, 4,

			2, 0, 1,
			1, 3, 2,
        ];
		
	//duas linhas copiadas de MyObject
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
