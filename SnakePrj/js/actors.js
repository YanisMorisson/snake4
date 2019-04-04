class tete extends Entity{
    constructor(xp){
       super(xp,(CANVAS_HEIGHT/(random(1,10))),gTextures["tete"])
       //gTextures["tete"]
       //CANVAS_HEIGHT/(random(0,10))
           
        this.speed= 60
        this.dx = random(10,25)
        this.dy = random(10,25)
      }
      
       update(dt) {
           super.update(dt)
   
          this.x += this.dx * dt
   
          this.y += this.dy * dt
   
           if (this.getLeft() < 0){
              
               gsm.changeStage(gStages.get("over"))
           }
        
           if (this.getRight() >900){
            gsm.changeStage(gStages.get("over"))
               }
           
           if (this.getTop() < 0){
            gsm.changeStage(gStages.get("over"))
                   }
   
           if (this.getBottom() > 700){
            gsm.changeStage(gStages.get("over"))
                       }
       }

       move(direction) {
   
        switch (direction){

            case "LEFT":
                this.dx = -this.speed 
                this.dy = 0
                break
    
            case "RIGHT":
                this.dx = 2*this.speed
                this.dy = 0
                break
            
    
            case "DOWN":
                this.dy = 2*this.speed  
                this.dx = 0
                break
    
            case "UP":
                this.dy = -this.speed
                this.dx = 0
                break

           default:
           break
            } 
        }
       

       render() {
   
           super.render()
           super.renderDebug()
   
   
       }
       
   stop() {
       this.dx=0
   }

   } 


   
   class pomme extends Entity {

    constructor(tete) {
        super(random(CANVAS_HEIGHT),random(CANVAS_WIDTH), gTextures["pomme"],18,18)
       this.tete = tete
    }

    stop() {
        this.x = random(CANVAS_WIDTH)
        this.y = random(CANVAS_HEIGHT)
    }

    update(dt) {
        super.update(dt)
       this.isCollision()
       
    }
isCollision(){
    if ( this.collides(this.tete))
    {
    
        this.x = random(CANVAS_WIDTH)
        this.y = random(CANVAS_HEIGHT)

        
    }


}


    render() {
        

        super.render()

        super.renderDebug()
    }
}