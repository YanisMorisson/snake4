const CANVAS_WIDTH = 900
const CANVAS_HEIGHT = 700

const gStages = new Map()
const gsm = new StageManager()

let gTextures = {}
let gSounds = {}
let gFonts = {}


const gInput = new InputManager()

let now = 0
let ex = 0
let dt = 0

let timer=0
let fps=0

function preload() { 			// on charge les elements qu'on va utiliser 
	
	gSounds["menu"] = loadSound("./assets/musics/intro.mp3")

	gSounds["jeu"] = loadSound("./assets/musics/intro.mp3")

	gFonts["snakebold"] = loadFont('./assets/fonts/snakebold.ttf')

	gTextures["background"]= loadImage('./assets/images/Snake-Photo.png')
	
	gTextures["background-over"]= loadImage('./assets/images/Snake-PhotoOver.png')

	gTextures["tete"] = loadImage("/assets/images/tete.bmp")

	gTextures["pomme"] = loadImage("/assets/images/pomme.png")
	
}

function setup() {
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
	
	gStages.set("introduction", new IntroStage(gsm))

	gStages.set("play", new PlayStage(gsm))
	
	gStages.set("over", new OverStage(gsm))


	gsm.pushStage(gStages.get("introduction"))
}




function draw() {

	background(60)

	now = millis()					// clignotement de AAA
	dt = (now - ex) / 1000

	gsm.update(dt)

	gInput.update()

	gsm.render()

	ex = now
		

  
  
}
function keyPressed() {							// fonction pour "utiliser" la touche pressée  
	gInput.setKeyboardPressed(keyCode)
}

function keyReleased() {
	gInput.setKeyboardReleased(keyCode)
}




