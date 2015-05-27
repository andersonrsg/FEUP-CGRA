/**
 * MyWheel
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

 var degToRad = Math.PI / 180.0;

function MyWheel(scene) {
	CGFobject.call(this,scene);
	
	this.cylinder = new MyCylinder(this.scene, 20, 4);
	this.top = new MyClockSurface(this.scene, 20, 1);

	this.top.initBuffers();
	this.cylinder.initBuffers();

	this.ApIndex = 0;

	this.wheelApearance1 = new CGFappearance(this.scene);
	this.wheelApearance1.setAmbient(0.25,0.25,0.25,1);
	this.wheelApearance1.setDiffuse(0.75,0.75,0.75,1);
	this.wheelApearance1.setSpecular(0.75,0.75,0.75,1);	
	this.wheelApearance1.setShininess(5);
	this.wheelApearance1.loadTexture("/CGRA-code/tp6/resources/images/gear.png");

	this.wheelApearance2 = new CGFappearance(this.scene);
	this.wheelApearance2.setAmbient(0.25,0.25,0.25,1);
	this.wheelApearance2.setDiffuse(0.75,0.75,0.75,1);
	this.wheelApearance2.setSpecular(0.75,0.75,0.75,1);	
	this.wheelApearance2.setShininess(5);
	this.wheelApearance2.loadTexture("/CGRA-code/tp6/resources/images/wheel2.jpg");

	this.wheelApearance3 = new CGFappearance(this.scene);
	this.wheelApearance3.setAmbient(0.25,0.25,0.25,1);
	this.wheelApearance3.setDiffuse(0.75,0.75,0.75,1);
	this.wheelApearance3.setSpecular(0.75,0.75,0.75,1);	
	this.wheelApearance3.setShininess(5);
	this.wheelApearance3.loadTexture("/CGRA-code/tp6/resources/images/wheel3.gif");

	this.wheelApearance4 = new CGFappearance(this.scene);
	this.wheelApearance4.setAmbient(0.25,0.25,0.25,1);
	this.wheelApearance4.setDiffuse(0.75,0.75,0.75,1);
	this.wheelApearance4.setSpecular(0.75,0.75,0.75,1);	
	this.wheelApearance4.setShininess(5);
	this.wheelApearance4.loadTexture("/CGRA-code/tp6/resources/images/tex3.jpg");
	
	this.materialMetal = new CGFappearance(this.scene);
	this.materialMetal.setAmbient(0.24,0.24,0.24,1);
	this.materialMetal.setDiffuse(0.24,0.24,0.24,1);
	this.materialMetal.setSpecular(0.5,0.5,0.5,1);	
	this.materialMetal.setShininess(120);

	this.wheelApearanceArray = [];
	this.wheelApearanceArray.push(this.wheelApearance1, this.wheelApearance2, this.wheelApearance3);

	this.nonWheelArray = [];
	this.nonWheelArray.push(this.materialMetal, this.materialMetal, this.wheelApearance4);
};

MyWheel.prototype = Object.create(CGFobject.prototype);
MyWheel.prototype.constructor=MyWheel;

MyWheel.prototype.display = function()
{
	this.nonWheelArray[this.ApIndex].apply();	

	this.scene.pushMatrix();
	this.cylinder.display();
	this.scene.popMatrix();

	this.wheelApearanceArray[this.ApIndex].apply();

	this.scene.pushMatrix();
	this.scene.translate(0, 0, 3);
	this.top.display();
	this.scene.popMatrix();

	this.nonWheelArray[this.ApIndex].apply();

	this.scene.pushMatrix();
	this.scene.translate(0, 0, 1);
	this.scene.rotate(180*degToRad, 0, 1, 0);
	this.top.display();
	this.scene.popMatrix();
}
