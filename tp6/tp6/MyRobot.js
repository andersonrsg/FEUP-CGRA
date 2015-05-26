/**
 * MyRobot
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

 var degToRad = Math.PI / 180.0;

function MyRobot(scene) {
	CGFobject.call(this,scene);
	
	this.yRotation = 0;
	this.Xmovement = 15;
	this.Zmovement = 15;
	this.initBuffers();
};

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor=MyRobot;

MyRobot.prototype.initBuffers = function () {
	this.vertices = [
            0.5, 0.3, 0,
            -0.5, 0.3, 0,
            0, 0.3, 2,
			];

	this.indices = [
            0, 1, 2, 
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;

	this.normals = [
	//TROCAR NORMAIS - ESTAO ERRADAS
		0, 1, 0,
		0, 1, 0,
		0, 1, 0,
	];

	this.texCoords = [
	];

	this.initGLBuffers();
};

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