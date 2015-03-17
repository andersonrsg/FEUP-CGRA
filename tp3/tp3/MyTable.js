/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);

    this.cube = new MyUnitCubeQuad(this.scene);
    this.cube.initBuffers();

    this.materialWood = new CGFappearance(this.scene);
	this.materialWood.setAmbient(0.4,0.2,0,1);
	this.materialWood.setDiffuse(0.4,0.2,0,1);
	this.materialWood.setSpecular(0.01,0.01,0.01,0.01);	
	this.materialWood.setShininess(120);

	this.materialMetal = new CGFappearance(this.scene);
	this.materialMetal.setAmbient(0.24,0.24,0.24,1);
	this.materialMetal.setDiffuse(0.24,0.24,0.24,1);
	this.materialMetal.setSpecular(0.5,0.5,0.5,1);	
	this.materialMetal.setShininess(120);
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function() {
    this.scene.pushMatrix();

	//Tampo da mesa
	this.materialWood.apply();
	this.scene.translate(0.0,3.5,0.0);
    this.scene.scale(5,0.3,3);
	this.cube.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();

	//--------Pernas da mesa--------------
	this.materialMetal.apply();
	//Perna 1
	this.scene.translate(-2.3,1.75,-1.3);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();

	//Perna 2
	this.scene.translate(2.3,1.75,-1.3);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();

	//Perna 3
	this.scene.translate(-2.3,1.75,1.3);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();

	//Perna 4
	this.scene.translate(2.3,1.75,1.3);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();

    this.scene.popMatrix();
}