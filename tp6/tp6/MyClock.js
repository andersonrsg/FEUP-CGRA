/**
 * MyClock
 * @constructor
 */
 function MyClock(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;
	this.lastUpdate = -1;

	this.clockAppearence = new CGFappearance(this.scene);
	this.clockAppearence.loadTexture("/CGRA-code/tp5/resources/images/clock.png");
	this.clockAppearence.setAmbient(0.24,0.24,0.24,1);
	this.clockAppearence.setDiffuse(0.24,0.24,0.24,1);
	this.clockAppearence.setSpecular(0.5,0.5,0.5,1);	
	this.clockAppearence.setShininess(5);
	
	this.handleAppearence = new CGFappearance(this.scene);
	this.handleAppearence.setAmbient(0,0,0,0);
	this.handleAppearence.setDiffuse(0,0,0,0);
	this.handleAppearence.setSpecular(0,0,0,0);	
	this.handleAppearence.setShininess(0);
	

	this.cylinder = new MyCylinder(this.scene, slices, stacks);
	this.cylinder.initBuffers();

	this.surface = new MyClockSurface(this.scene, slices, stacks);
	this.surface.initBuffers();

	this.hourHand = new MyClockHand(this.scene, 0.4, 90);
	this.hourHand.initBuffers();

	this.minuteHand = new MyClockHand(this.scene, 0.7, 180);
	this.minuteHand.initBuffers();
		
	this.secondHand = new MyClockHand(this.scene, 1, 270);
	this.secondHand.initBuffers();
	
 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;

 MyClock.prototype.display = function() {
 	var degToRad = Math.PI / 180.0;


    this.scene.pushMatrix();

	this.cylinder.display();

	this.clockAppearence.apply();
	this.surface.display();

	this.handleAppearence.apply();
	
	this.scene.pushMatrix();
	this.scene.translate(0,0,1.01);
	this.scene.rotate(this.hourHand.angle * degToRad, 0, 0, 1);
	this.hourHand.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0,1.01);
	this.scene.rotate(this.minuteHand.angle * degToRad, 0, 0, 1);
	this.minuteHand.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0,1.01);
	this.scene.rotate(this.secondHand.angle * degToRad, 0, 0, 1);
	this.secondHand.display();
	this.scene.popMatrix();
    this.scene.popMatrix();
	
};

MyClock.prototype.update = function(currTime) {
	if (this.lastUpdate == -1) {
		this.lastUpdate = currTime;
		secInc = 0.6;
	}
	else {
		var diff = currTime - this.lastUpdate;
		this.lastUpdate = currTime;
		secInc = diff * (360 / (60 * 1000));
	}

	this.secondHand.setAngle(this.secondHand.angle - secInc);
	this.minuteHand.setAngle(this.minuteHand.angle - secInc / 60);
	this.hourHand.setAngle(this.hourHand.angle - secInc / 3600);
};