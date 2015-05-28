/**
 * MyWindow
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyWindow(scene) {
	CGFobject.call(this,scene);

	this.quadLeft = new MyQuad(this.scene, -2.2, 0.05, -0.7, 1.7);
	this.quadRight = new MyQuad(this.scene, 0.95, 2.5, -0.7, 1.7);
	this.quadTop = new MyQuad(this.scene, -0.92, 2.23, -1, 0.05);
	this.quadDown = new MyQuad(this.scene, -0.92, 2.23, 0.95, 2);

	this.quadTop.initBuffers();
	this.quadDown.initBuffers();
	this.quadRight.initBuffers();
	this.quadLeft.initBuffers();
};

MyWindow.prototype = Object.create(CGFobject.prototype);
MyWindow.prototype.constructor=MyWindow;

MyWindow.prototype.display = function()
{
	this.scene.windowAppearence.apply();
	this.scene.pushMatrix();
	this.scene.translate(0.3, 0, -0.1);
	this.scene.scale(0.4, 1, 1);
	this.quadRight.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-0.4, 0, -0.1);
	this.scene.scale(0.4, 1, 1);
	this.quadLeft.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0, -0.35, 0);
	this.scene.scale(1, 0.3, 1);
	this.quadDown.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0, 0.35, 0);
	this.scene.scale(1, 0.3, 1);
	this.quadTop.display();
	this.scene.popMatrix();
}