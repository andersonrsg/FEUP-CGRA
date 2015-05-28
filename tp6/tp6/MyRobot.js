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
	this.ApIndex = 0;
	this.leftWheelRot = 0;
	this.rightWheelRot = 0;

	this.armRotation = 0;
	this.armDirection = 1;

	this.handMove = 0;
	this.tempXRot = 999;
	this.tempZRot = 999;
	this.lastUpdate = -1;
	this.movementPart = 0;

	this.body = new MyCylinder(this.scene, 100, 20);
	this.bottom = new MyClockSurface(this.scene, 12, 1);
	this.head = new MyLamp(this.scene, 25, 19);
	this.leftArm = new MyArm(this.scene);
	this.rightArm = new MyArm(this.scene);
	this.wheel = new MyWheel(this.scene);
	
	this.wheel.initBuffers();
	this.bottom.initBuffers();
	this.body.initBuffers();
	this.head.initBuffers();
	this.leftArm.initBuffers();
	this.rightArm.initBuffers();

	this.headApearance1 = new CGFappearance(this.scene);
	this.headApearance1.setAmbient(0.25,0.25,0.25,1);
	this.headApearance1.setDiffuse(0.75,0.75,0.75,1);
	this.headApearance1.setSpecular(0.75,0.75,0.75,1);	
	this.headApearance1.setShininess(5);
	this.headApearance1.loadTexture("/CGRA-code/tp6/resources/images/robotHead.jpg");

	this.bodyApearance1 = new CGFappearance(this.scene);
	this.bodyApearance1.setAmbient(0.25,0.25,0.25,1);
	this.bodyApearance1.setDiffuse(0.75,0.75,0.75,1);
	this.bodyApearance1.setSpecular(0.75,0.75,0.75,1);	
	this.bodyApearance1.setShininess(5);
	this.bodyApearance1.loadTexture("/CGRA-code/tp6/resources/images/robotBody.jpg");

	this.headApearance2 = new CGFappearance(this.scene);
	this.headApearance2.setAmbient(0.25,0.25,0.25,1);
	this.headApearance2.setDiffuse(0.75,0.75,0.75,1);
	this.headApearance2.setSpecular(0.75,0.75,0.75,1);	
	this.headApearance2.setShininess(5);
	this.headApearance2.loadTexture("/CGRA-code/tp6/resources/images/matrix.jpg");

	this.bodyApearance2 = new CGFappearance(this.scene);
	this.bodyApearance2.setAmbient(0.25,0.25,0.25,1);
	this.bodyApearance2.setDiffuse(0.75,0.75,0.75,1);
	this.bodyApearance2.setSpecular(0.75,0.75,0.75,1);	
	this.bodyApearance2.setShininess(5);
	this.bodyApearance2.loadTexture("/CGRA-code/tp6/resources/images/matrix.jpg");

	this.headApearance3 = new CGFappearance(this.scene);
	this.headApearance3.setAmbient(0.25,0.25,0.25,1);
	this.headApearance3.setDiffuse(0.75,0.75,0.75,1);
	this.headApearance3.setSpecular(0.75,0.75,0.75,1);	
	this.headApearance3.setShininess(5);
	this.headApearance3.loadTexture("/CGRA-code/tp6/resources/images/head3.jpg");

	this.bodyApearance3 = new CGFappearance(this.scene);
	this.bodyApearance3.setAmbient(0.25,0.25,0.25,1);
	this.bodyApearance3.setDiffuse(0.75,0.75,0.75,1);
	this.bodyApearance3.setSpecular(0.75,0.75,0.75,1);	
	this.bodyApearance3.setShininess(5);
	this.bodyApearance3.loadTexture("/CGRA-code/tp6/resources/images/tex3.jpg");

	this.headApearanceArray = [];
	this.bodyApearanceArray = [];
	this.headApearanceArray.push(this.headApearance1, this.headApearance2, this.headApearance3);
	this.bodyApearanceArray.push(this.bodyApearance1, this.bodyApearance2, this.bodyApearance3);

};

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor=MyRobot;

MyRobot.prototype.display = function()
{

	this.headApearanceArray[this.ApIndex].apply();

	this.scene.pushMatrix();
	this.scene.translate(0, 3, 0);
	this.scene.rotate(90*degToRad, 0, 1, 0);
	this.scene.rotate(-90 * degToRad, 1, 0, 0);
	this.head.display();
	this.scene.popMatrix(); 

	this.bodyApearanceArray[this.ApIndex].apply();

	this.scene.pushMatrix();
	this.scene.translate(0, 1, 0);
	this.scene.rotate(90 * degToRad, 1, 0, 0);
	this.bottom.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.scale(1, 0.15, 1);
	this.scene.rotate(-90*degToRad, 1, 0, 0);
	this.body.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(- 1.1, 2.3, 0);
	if (this.handMove == 0)
		this.scene.rotate(-this.armRotation * degToRad, 1, 0, 0);
	else
	{
		this.scene.rotate(this.tempXRot * degToRad, 1, 0, 0);
		this.scene.rotate(this.tempZRot* degToRad, 0, 0, 1);
	}
	this.scene.translate(0, -1.2, 0);
	this.scene.scale(0.2, 0.3, 0.2);
	this.scene.rotate(-90*degToRad, 1, 0, 0);
	this.leftArm.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(1.1, 2.3, 0);
	this.scene.rotate(this.armRotation * degToRad, 1, 0, 0);
	this.scene.translate(0, -1.2, 0);
	this.scene.scale(0.2, 0.3, 0.2);
	this.scene.rotate(-90*degToRad, 1, 0, 0);
	this.rightArm.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-1,0,0);
	this.scene.rotate(this.rightWheelRot, 1, 0, 0);
	this.scene.rotate(180*degToRad, 0, 0, 1);
	this.scene.rotate(90*degToRad, 0, 1, 0);
	this.scene.scale(0.8, 0.8, 0.1);
	this.wheel.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(1,0,0);
	this.scene.rotate(this.leftWheelRot, 1, 0, 0);
	this.scene.rotate(90*degToRad, 0, 1, 0);
	this.scene.scale(0.8, 0.8, 0.1);
	this.wheel.display();
	this.scene.popMatrix();

}

MyRobot.prototype.update = function(currTime)
{
	if (this.lastUpdate == -1)
		this.lastUpdate = currTime;
	var diff = currTime - this.lastUpdate;

	if (this.handMove != 0)
	{
		if (this.tempXRot == 999 && this.tempZRot == 999)
		{
			this.tempXRot = -this.armRotation;
			this.tempZRot = 0;
		}
		else if (this.tempXRot <= -165 && this.movementPart != 4)
		{
			if (this.tempZRot > -20 && this.movementPart == 0)
				this.tempZRot -= diff * (360 / (60 * 100));
			else if (this.tempZRot < 0 && this.movementPart == 1)
			{
				this.movementPart = 1;
				this.tempZRot += diff * (360 / (60 * 100));
			}
			else if (this.tempZRot < 0 && this.movementPart == 0)
				this.movementPart = 1;
			else 
			{
				this.handMove++;
				this.movementPart = 0;
				if (this.handMove == 4)
					this.movementPart = 4;
			}
		}
		else if (this.movementPart != 4)
			this.tempXRot -= diff * (360 / (60 * 50));
		else 
		{
			if (-this.armRotation + 10 > this.tempXRot && -this.armRotation - 10 < this.tempXRot)
			{
				this.handMove = 0;
				this.tempXRot = 999;
				this.tempZRot = 999;
				this.movementPart = 0;
			}
			else
				this.tempXRot += diff * (360 / (60 * 50));
		}
	}
	this.lastUpdate = currTime;
}

MyRobot.prototype.rotateLeft = function (speed)
{
	this.leftWheelRot -= (speed * degToRad) / 1; //a dividir pelo raio
	this.rightWheelRot += (speed * degToRad) / 1; //a dividir pelo raio
	this.yRotation += speed;
};

MyRobot.prototype.rotateRight = function (speed)
{
	this.leftWheelRot += (speed * degToRad) / 1; //a dividir pelo raio
	this.rightWheelRot -= (speed * degToRad) / 1; //a dividir pelo raio
	this.yRotation -= speed;

};

MyRobot.prototype.moveForward = function (speed)
{
	this.Xmovement += Math.sin(this.yRotation * degToRad) * (speed / 15);
	this.Zmovement += Math.cos(this.yRotation * degToRad) * (speed / 15);

	this.leftWheelRot += (speed / 15) / 1; //a dividir pelo raio
	this.rightWheelRot += (speed / 15) / 1; //a dividir pelo raio

	if (this.Xmovement < 2)
		this.Xmovement = 2;
	if (this.Xmovement > 29)
		this.Xmovement = 29;

	if (this.Zmovement < 2)
		this.Zmovement = 2;
	if (this.Zmovement > 29)
		this.Zmovement = 29;
};

MyRobot.prototype.moveBack = function (speed)
{
	this.Xmovement -= Math.sin(this.yRotation * degToRad) * (speed / 30);
	this.Zmovement -= Math.cos(this.yRotation * degToRad) * (speed / 30);

	this.leftWheelRot -= (speed / 30) / 1; //a dividir pelo raio
	this.rightWheelRot -= (speed / 30) / 1; //a dividir pelo raio

	if (this.Xmovement < 2)
		this.Xmovement = 2;
	if (this.Xmovement > 29)
		this.Xmovement = 29;

	if (this.Zmovement < 2)
		this.Zmovement = 2;
	if (this.Zmovement > 29)
		this.Zmovement = 29;
};

MyRobot.prototype.moveArms = function (speed)
{
	if(this.armRotation >= 15 || this.armRotation <= -15){
		this.armDirection = this.armDirection * (-1);
	}
	
	this.armRotation += speed*this.armDirection;
}