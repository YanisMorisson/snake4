
class IntroStage extends Stage {
	constructor(gsm) {
		super(gsm)

		

		this.tab = [65, 65, 65]
        this.indice = 0
        this.timer = 0
        this.toggle = true

        this.label = new Label()
        this.label.setSize(50)
       // this.label.setColor(color(250, 250, 250))

        this.name = "aaa"
	}

	update(dt) {                                        // s'actualise en permanence 


       // if (gInput.isKeyPressed(ENTER)) {                   // si on presse entrer faire l'action suivante:

		//	gsm.changeStage(gStages.get("play"))            // Changer le stage et passer a play 
		
	//	}

		this.timer += dt                                    // Gerer la frequence de clignotement de la selection 
        if (this.timer > 0.3) {                             // plus petit--> plus rapide 
            this.timer = 0
            this.toggle = !this.toggle
        }

        if (gInput.isKeyPressed(ENTER)) {                   // Lorsque l'on press ENTRER 

            this.name = "" + char(this.tab[0]) + char(this.tab[1]) + char(this.tab[2])        // on affecte le nom du joueur aux trois tableau de characteres qu'il aura choisi

            let options = {
                "name": this.name                                   // on passe le nom du joueur en datas afin de pouvoir le communiquer a un autre stage par la suite 
            }

            gsm.changeStage(gStages.get("play"), options)
        }

        if (gInput.isKeyPressed(LEFT_ARROW) && this.indice > 0) {       // gerer le deplacement de la selection afin de choisir la rangée  (tableau)
            this.indice = this.indice - 1
        }

        if (gInput.isKeyPressed(RIGHT_ARROW) && this.indice < 2) {
            this.indice = this.indice + 1
        }

        if (gInput.isKeyPressed(DOWN_ARROW)) {                        // gerer le deplacement de la selection afin de choisir lettre 
            this.tab[this.indice] = this.tab[this.indice] + 1
            if (this.tab[this.indice] > 90) {
                this.tab[this.indice] = 65
            }
        }

        if (gInput.isKeyPressed(UP_ARROW)) {
            this.tab[this.indice] = this.tab[this.indice] - 1
            if (this.tab[this.indice] < 65) {
                this.tab[this.indice] = 90
			}
		}
	}


	render()                                                                    // ce qui sera affiché à l'écran
	{
        textFont(gFonts['snakebold'])                          // definir la police qu'on utilise 
		textAlign(CENTER)                                     // centrer notre texte 
		fill(5, 55, 10)                                       // changer la couleur de la police 
        
        textSize(40)

		background(gTextures["background"])                                              // mettre l'image en fond  

		text('.JS', CANVAS_HEIGHT, CANVAS_WIDTH/4.7)
        text('NAME :', ( CANVAS_HEIGHT) /2, CANVAS_WIDTH /1.45)
        
		this.afficheName()                                              // afficher le nom 
		
        text('PRESS      ENTER     TO      START', (CANVAS_HEIGHT)/1.6, 680)
  

}

    afficheName() {
    let xp = CANVAS_WIDTH / 1.9  //place de A A A dans le canvas
    let yp = CANVAS_HEIGHT / 1.127

    //**************** */
    if (this.indice == 0) {                         //changement de la lettre dans le tableau selon l'endroit ou l'on est (l'etat de "indice")
        if (this.toggle) {
            text(char(this.tab[0]), xp, yp)         // colonne 1 
        }
        text(char(this.tab[1]), xp + 50, yp)        
        text(char(this.tab[2]), xp + 100, yp)
    }
    //******************** */

    else if (this.indice == 1) {
        if (this.toggle) {
            text(char(this.tab[1]), xp + 50, yp)        // colonne 2
        }
        text(char(this.tab[0]), xp, yp)
        text(char(this.tab[2]), xp + 100, yp)
    }
    //********************* */
    else if (this.indice == 2) {
        if (this.toggle) {
            text(char(this.tab[2]), xp + 100, yp)       // colonne 3
        }
        text(char(this.tab[0]), xp, yp)
        text(char(this.tab[1]), xp + 50, yp)
    }
}

	onEnter(datas)
	 {
        gSounds["menu"].setLoop(true)

        gSounds["menu"].setVolume(0.5)
        
        gSounds["menu"].play()
	}

	onExit(datas) 
	{
        gSounds["menu"].setLoop(false)
        
        gSounds["menu"].stop()
	}
	
	
}


class PlayStage extends Stage {
    constructor(gsm) {
        super(gsm)

        this.tete = new tete(random(CANVAS_HEIGHT),random(CANVAS_WIDTH))
        this.pomme =new pomme (this.tete)
        this.score= 0
     
    }

    update(dt)  {
       
       this.tete.update(dt)
        this.pomme.update(dt)

        this.Collisions()
       // this.isGameOver()

        if (gInput.isKeyPressed(RIGHT_ARROW)){
            this.tete.move("RIGHT")
        }
      


        if (gInput.isKeyPressed(LEFT_ARROW)){
            this.tete.move("LEFT")
        }
      

      
        if (gInput.isKeyPressed(UP_ARROW)){
            this.tete.move("UP")
        }
      

        if (gInput.isKeyPressed(DOWN_ARROW)){
                this.tete.move("DOWN")
        }
      
     }
     
Collisions(){
this.pomme.isCollision()

}



    render() {
        this.tete.render()
        this.pomme.render()
    }
   

    onEnter(datas)
    {
        if (datas) {
            this.name = datas.name
            this.score = datas.points
        }
        gSounds["jeu"].play()

      gSounds["jeu"].setLoop(true)

       gSounds["jeu"].setVolume(0.5)
       
   }

   onExit() 
   {
      // gSounds["jeu"].setLoop(false)
       
       gSounds["jeu"].stop()
   }

}
    

class OverStage extends Stage {
    constructor(gsm) {
        super(gsm)

		
		textAlign(CENTER)                                     // centrer notre texte 
		fill(5, 55, 10)                                       // changer la couleur de la police 

		this.tab = [65, 65, 65]
        this.indice = 0
        this.timer = 0
        this.toggle = true

        this.label = new Label()
        this.label.setSize(50)
        this.score = new ScoreManager()
        this.name= 'AAA'
    }
    
    update(dt) {
        if (gInput.isKeyPressed(ENTER)) {

            gsm.changeStage(gStages.get("introduction"))
        }
    }

    render() {

        textFont(gFonts['snakebold'])                          // definir la police qu'on utilise 

        background(gTextures["background-over"])                                              // mettre l'image en fond  

		//text('.JS', CANVAS_HEIGHT, CANVAS_WIDTH/4.7)
        //text('NAME :', ( CANVAS_HEIGHT) /2, CANVAS_WIDTH /1.45)
        
		//this.afficheName()                                              // afficher le nom 
        textSize(30)
        text('PRESS    ENTER    TO     RESTART', (CANVAS_HEIGHT)/5.5+100,CANVAS_WIDTH /1.6 )
        
        textSize(50)
        text("Game Over :" + this.name,(CANVAS_HEIGHT)/5+100,(CANVAS_WIDTH) /2-150)
       
        this.label.render(CANVAS_WIDTH / 4, CANVAS_HEIGHT / 4)

       
        this.label.setText("Score= " + this.score + " pts")
        this.label.render(400, 50)
        

       // this.label.setText('Press a Enter\n to Start')
        //this.label.render(CANVAS_WIDTH / 4, 100 + CANVAS_HEIGHT / 2)
    }

    onEnter(datas) {
        if (datas != undefined) {
            this.score.setName(datas.name)
            this.score.setPoints(datas.points)
        }

        gSounds["menu"].setLoop(true)
        gSounds["menu"].play()

    }

    onExit() {
        gSounds["menu"].setLoop(false)
        gSounds["menu"].stop()
    }
}
