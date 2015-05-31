var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();
	this.enableTextures(true);

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new Plane(this);
	this.leftWall = new MyQuad(this, -0.6, 1.55, -0.6, 1.55);
	this.floor = new MyQuad(this, 0, 10, 0, 12);
	this.boardA = new Plane(this,-0.17, 1.3, 0.1, 0.8, BOARD_A_DIVISIONS);
		this.boardB = new Plane(this,0, 1, 0, 1, BOARD_B_DIVISIONS);
	this.prism = new MyPrism(this, 8, 20);
	this.cylinder = new MyCylinder(this, 8, 20);
	this.lamp = new MyLamp(this, 25, 19);
	this.clock = new MyClock(this, 12, 1);
	this.paperPlane1 = new MyPaperPlane(this, 14, 4);
	this.paperPlane2 = new MyPaperPlane(this, 12, 11);
	this.paperPlane3 = new MyPaperPlane(this, 5, 6);
	this.paperPlane4 = new MyPaperPlane(this, 7, 9);

	// Materials
	this.materialDefault = new CGFappearance(this);

	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	
	this.materialFloor = new CGFappearance(this);
	this.materialFloor.setAmbient(0.25,0.25,0.25,1);
	this.materialFloor.setDiffuse(0.25,0.25,0.25,1);
	this.materialFloor.setSpecular(0.25,0.25,0.25,1);	
	this.materialFloor.setShininess(120);

	this.materialMetal = new CGFappearance(this);
	this.materialMetal.setAmbient(0.24,0.24,0.24,1);
	this.materialMetal.setDiffuse(0.24,0.24,0.24,1);
	this.materialMetal.setSpecular(0.5,0.5,0.5,1);	
	this.materialMetal.setShininess(120);

	this.materialWall = new CGFappearance(this);
	this.materialWall.setAmbient(1,1,0.6,1);
	this.materialWall.setDiffuse(1,1,0.6,1);
	this.materialWall.setSpecular(1,1,0.6,1);	
	this.materialWall.setShininess(120);

	this.windowAppearence = new CGFappearance(this);
	this.windowAppearence.setAmbient(1,1,0.6,1);
	this.windowAppearence.setDiffuse(1,1,0.6,1);
	this.windowAppearence.setSpecular(1,1,0.6,1);	
	this.windowAppearence.setShininess(10);
	this.windowAppearence.loadTexture("/CGRA-code/tp6/resources/images/window.png");
	this.windowAppearence.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.floorApearence = new CGFappearance(this);
	this.floorApearence.setAmbient(0.25,0.25,0.25,1);
	this.floorApearence.setDiffuse(0.25,0.25,0.25,1);
	this.floorApearence.setSpecular(0.25,0.25,0.25,1);	
	this.floorApearence.setShininess(5);
	this.floorApearence.loadTexture("/CGRA-code/tp6/resources/images/floor.png");

	this.slidesApearence = new CGFappearance(this);
	this.slidesApearence.setAmbient(0.25,0.25,0.25,1);
	this.slidesApearence.setDiffuse(0.75,0.75,0.75,1);
	this.slidesApearence.setSpecular(0.25,0.25,0.25,1);	
	this.slidesApearence.setShininess(5);
	this.slidesApearence.loadTexture("/CGRA-code/tp6/resources/images/slides.png");

	this.boardApearence = new CGFappearance(this);
	this.boardApearence.setAmbient(0.25,0.25,0.25,1);
	this.boardApearence.setDiffuse(0.85,0.85,0.85,1);
	this.boardApearence.setSpecular(0.65,0.65,0.65,1);	
	this.boardApearence.setShininess(60);
	this.boardApearence.loadTexture("/CGRA-code/tp6/resources/images/board.png");

	this.stoneApearence = new CGFappearance(this);
	this.stoneApearence.setAmbient(0.25,0.25,0.25,1);
	this.stoneApearence.setDiffuse(0.75,0.75,0.75,1);
	this.stoneApearence.setSpecular(0.25,0.25,0.25,1);	
	this.stoneApearence.setShininess(5);
	this.stoneApearence.loadTexture("/CGRA-code/tp6/resources/images/stone.png");
	
	this.setUpdatePeriod(10);
};



LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0.4,0.4,0.4,0.4);

	this.shader.bind();
	
	// Positions for four lights
	this.lights[0].setPosition(16, 5, 16, 1);
	this.lights[1].setPosition(10, 10, 6.0, 1.0);
	this.lights[2].setPosition(5, 5, 5, 8.0);
	this.lights[3].setPosition(10, 5.0, 5.0, 1.0);


	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1,1,1,1);
	this.lights[0].setConstantAttenuation(0);
	this.lights[0].setLinearAttenuation(1);
	this.lights[0].setQuadraticAttenuation(0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();
	this.lights[1].setVisible(true);

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1,1,1,1);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1,1,1,1);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(1);
	this.lights[3].setQuadraticAttenuation(0);
	this.lights[3].enable();
	
	for (var i = 0; i < 4; i++)
		this.lights[i].setVisible(true);

	this.shader.unbind();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
};

LightingScene.prototype.display = function() {
	this.shader.bind();

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup
	// ---- BEGIN Primitive drawing section


//-----------Columns-------------------------------
	// Floor
	this.floorApearence.apply();
	this.pushMatrix();
	this.translate(7.5, 0, 7.5);
	this.rotate(-90 * degToRad, 1, 0, 0);
	this.scale(15, 15, 0.2);
	this.floor.display();
	this.popMatrix();

	this.materialWall.apply();
	// Left Wall
	this.pushMatrix();
	this.translate(7.5, 4, 0);
	this.scale(15, 8, 0.2);
	this.wall.display();
	this.popMatrix();

	this.windowAppearence.apply();
	// Plane Wall
	this.pushMatrix();
	this.translate(0, 4, 7.5);
	this.rotate(90 * degToRad, 0, 1, 0);
	this.scale(15, 8, 0.2);
	this.leftWall.display();
	this.popMatrix();

	//tables
	this.pushMatrix();
	this.translate(5, 0, 5);
	this.table.display();
	this.popMatrix();

	this.pushMatrix();
	this.translate(12, 0, 5);
	this.table.display();
	this.popMatrix();

	this.pushMatrix();
	this.translate(5, 0, 10);
	this.table.display();
	this.popMatrix();

	this.pushMatrix();
	this.translate(12, 0, 10);
	this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
	this.translate(4, 4.5, 0.2);
	this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
	this.slidesApearence.apply();
	this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
	this.translate(10.5, 4.5, 0.2);
	this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
	this.boardApearence.apply();
	this.boardB.display();
	this.popMatrix();

	//Colunas
	this.stoneApearence.apply();

	this.pushMatrix();
	this.translate(14, 0, 14);
	this.scale(0.4, 0.4, 0.4);
	this.rotate(-90 * degToRad, 1, 0, 0);
	this.cylinder.display();
	this.popMatrix();

	this.pushMatrix();
	this.translate(2, 0, 14);
	this.scale(0.4, 0.4, 0.4);
	this.rotate(-90 * degToRad, 1, 0, 0);
	this.cylinder.display();
	this.popMatrix();

	this.pushMatrix();
	this.translate(14, 0, 2);
	this.scale(0.4, 0.4, 0.4);
	this.rotate(-90 * degToRad, 1, 0, 0);
	this.cylinder.display();
	this.popMatrix();
	
	//Relogio
	this.pushMatrix();
	this.materialMetal.apply();
	this.translate(7.25,7.2,0);
	this.scale(0.7,0.7,0.1);
	this.clock.display();
	this.popMatrix();
	
	//Planes
	this.materialMetal.apply();
	this.pushMatrix();
	this.translate(this.paperPlane1.xTranslation,
		 this.paperPlane1.yTranslation,
		 this.paperPlane1.zTranslation);
	this.rotate(this.paperPlane1.rotZ * degToRad, 0, 0, 1);
	this.rotate(this.paperPlane1.rotX * degToRad, 1, 0, 0);
	this.paperPlane1.display();
	this.popMatrix();

	this.pushMatrix();
	this.translate(this.paperPlane2.xTranslation,
		 this.paperPlane2.yTranslation,
		 this.paperPlane2.zTranslation);
	this.rotate(this.paperPlane2.rotZ * degToRad, 0, 0, 1);
	this.rotate(this.paperPlane2.rotX * degToRad, 1, 0, 0);
	this.paperPlane2.display();
	this.popMatrix();

	this.pushMatrix();
	this.translate(this.paperPlane3.xTranslation,
		 this.paperPlane3.yTranslation,
		 this.paperPlane3.zTranslation);
	this.rotate(this.paperPlane3.rotZ * degToRad, 0, 0, 1);
	this.rotate(this.paperPlane3.rotX * degToRad, 1, 0, 0);
	this.paperPlane3.display();
	this.popMatrix();

	this.pushMatrix();
	this.translate(this.paperPlane4.xTranslation,
		 this.paperPlane4.yTranslation,
		 this.paperPlane4.zTranslation);
	this.rotate(this.paperPlane4.rotZ * degToRad, 0, 0, 1);
	this.rotate(this.paperPlane4.rotX * degToRad, 1, 0, 0);
	this.paperPlane4.display();
	this.popMatrix();

	//-----------Why the transformation-----------------
	
	// ---- END Primitive drawing section

	this.shader.unbind();
};

LightingScene.prototype.update = function(currTime) {
	this.clock.update(currTime);
	this.paperPlane1.update(currTime);
	this.paperPlane2.update(currTime);	
	this.paperPlane3.update(currTime);
	this.paperPlane4.update(currTime);
};