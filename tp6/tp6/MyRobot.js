/**
 * MyRobot
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

 var degToRad = Math.PI / 180.0;

function MyRobot(scene) {
	CGFobject.call(this,scene);
	
	this.yRotation = 0;
	this.Xmovement = 2;
	this.Zmovement = 2;

	this.body = new MyCylinder(this.scene, 12, 20);
	this.bottom = new MyClockSurface(this.scene, 12, 1);
	this.head = new MyLamp(this.scene, 25, 19);
	
	this.bottom.initBuffers();
	this.body.initBuffers();
	this.head.initBuffers();
};

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor=MyRobot;

MyRobot.prototype.display = function()
{
	this.scene.pushMatrix();
	this.scene.translate(this.Xmovement, 0.5, this.Zmovement);
	this.scene.scale(1, 0.15, 1);
	this.scene.rotate(-90*degToRad, 1, 0, 0);
	this.body.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(this.Xmovement, 3.5, this.Zmovement);
	this.scene.rotate(-90 * degToRad, 1, 0, 0);
	this.head.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(this.Xmovement, 1.5, this.Zmovement);
	this.scene.rotate(90 * degToRad, 1, 0, 0);
	this.bottom.display();
	this.scene.popMatrix();

}

MyRobot.prototype.rotateLeft = function (speed)
{
	this.yRotation += speed;
};

MyRobot.prototype.rotateRight = function (speed)
{
	this.yRotation -= speed;
};

MyRobot.prototype.moveForward = function (speed)
{
	this.Xmovement += Math.sin(this.yRotation * degToRad) * (speed / 15);
	this.Zmovement += Math.cos(this.yRotation * degToRad) * (speed / 15);
};

MyRobot.prototype.moveBack = function (speed)
{
	this.Xmovement -= Math.sin(this.yRotation * degToRad) * (speed / 30);
	this.Zmovement -= Math.cos(this.yRotation * degToRad) * (speed / 30);
};