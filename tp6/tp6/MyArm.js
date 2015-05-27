/**
 * MyArm
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

 var degToRad = Math.PI / 180.0;

function MyArm(scene) {
	CGFobject.call(this,scene);
	
	this.cylinder = new MyCylinder(this.scene, 20, 4);
	this.top = new MyClockSurface(this.scene, 20, 1);
	this.hand = new MyLamp(this.scene, 25, 19);

	this.hand.initBuffers();
	this.top.initBuffers();
	this.cylinder.initBuffers();

	this.ApIndex = 0;

	this.armApearance1 = new CGFappearance(this.scene);
	this.armApearance1.setAmbient(0.25,0.25,0.25,1);
	this.armApearance1.setDiffuse(0.75,0.75,0.75,1);
	this.armApearance1.setSpecular(0.75,0.75,0.75,1);	
	this.armApearance1.setShininess(5);
	this.armApearance1.loadTexture("/CGRA-code/tp6/resources/images/robotBody.jpg");

	this.armApearance2 = new CGFappearance(this.scene);
	this.armApearance2.setAmbient(0.25,0.25,0.25,1);
	this.armApearance2.setDiffuse(0.75,0.75,0.75,1);
	this.armApearance2.setSpecular(0.75,0.75,0.75,1);	
	this.armApearance2.setShininess(5);
	this.armApearance2.loadTexture("/CGRA-code/tp6/resources/images/matrix.jpg");

	this.armApearance3 = new CGFappearance(this.scene);
	this.armApearance3.setAmbient(0.25,0.25,0.25,1);
	this.armApearance3.setDiffuse(0.75,0.75,0.75,1);
	this.armApearance3.setSpecular(0.75,0.75,0.75,1);	
	this.armApearance3.setShininess(5);
	this.armApearance3.loadTexture("/CGRA-code/tp6/resources/images/tex3.jpg");

	this.armApearanceArray = [];
	this.armApearanceArray.push(this.armApearance1, this.armApearance2, this.armApearance3);
};

MyArm.prototype = Object.create(CGFobject.prototype);
MyArm.prototype.constructor=MyArm;

MyArm.prototype.display = function()
{
	this.armApearanceArray[this.ApIndex].apply();

	this.scene.pushMatrix();
	this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.rotate(180*degToRad, 0, 1, 0);
	this.hand.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0, 0, 3);
	this.top.display();
	this.scene.popMatrix();
}
