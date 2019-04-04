/*
GameEngine.js
use with p5.js
version 0.18.06.14
author A De Carvalho

Entity:
+getSpeedModule()
Label:
+font arial
ScoreManager:
-decrementsLives()


*/
//************* */
//************ */
class RecBounds {
    constructor(x = 0, y = 0, w = 10, h = 10) {
        this.x = x
        this.y = y

        this.w = w
        this.h = h

        this.xi = 0
        this.yi = 0
    }

    overlap(target) {
        //cas B
        if (this.x > target.x && this.x < (target.x + target.w) && this.y > target.y && this.y < (target.y + target.h))
            return true

        //cas A
        if ((this.x + this.w) > target.x && (this.x + this.w) < (target.x + target.w) && this.y > target.y && this.y < (target.y + target.h))
            return true

        //cas C
        if (this.x > target.x && this.x < (target.x + target.w) && (this.y + this.h) > target.y &&
            (this.y + this.h) < (target.y + target.h))
            return true

        //cas D
        if ((this.x + this.w) > target.x && (this.x + this.w) < (target.x + target.w) && (this.y + this.h) > target.y && (this.y + this.h) < (target.y + target.h))
            return true
        //
        return false
    }

    update(xp, yp) {
        this.x = xp
        this.x = this.x + this.xi

        this.y = yp
        this.y = this.y + this.yi
    }

    render() {
        strokeWeight(1);
        stroke(55, 55, 55);
        noFill()
        rect(this.x, this.y, this.w, this.h)
    }

    inflate(xi, yi) {
        this.xi = xi
        this.yi = yi
        this.w = this.w - 2 * this.xi
        this.h = this.h - 2 * this.yi

    }
}
//*********** */
//********** */
class Entity {
    constructor(x = 0, y = 0, image_src = undefined, w = 50, h = 50) {
        this.x = x
        this.y = y
        this.image = image_src

        //speed
        this.dx = 0
        this.dy = 0

        //dim
        if (this.image != undefined) {
            this.width = this.image.width
            this.height = this.image.height
        } else {
            this.width = w
            this.height = h
        }

        //state
        this.state = -1

        //bouds
        this.rectbounds = new RecBounds(this.x, this.y, this.width, this.height)
    }

    getCenterX() {
        return (this.x + this.width / 2)
    }

    getCenterY() {
        return (this.y + this.height / 2)
    }

    getLeft() {
        return this.x
    }

    setLeft(left) {
        this.x = left
    }

    getRight() {
        return this.x + this.width
    }

    setCenterX(centerX) {
        this.x = centerX - this.width / 2
    }

    setCenterY(centerY) {
        this.y = centerY - this.height / 2
    }

    setRight(right) {
        this.x = right - this.width
    }

    getTop() {
        return this.y
    }

    setTop(top) {
        this.y = top
    }

    getBottom() {
        return this.y + this.height
    }

    setBottom(bottom) {
        this.y = bottom - this.height
    }

    getSpeedModule() {
        let mod = sqrt(this.dx * this.dx + this.dy * this.dy)
        return mod
    }

    inflate(xi, yi) {
        this.rectbounds.inflate(xi, yi)
    }

    collides(other_entity) {
        if (this.rectbounds.overlap(other_entity.rectbounds)) {
            return true
        } else {
            return false
        }
    }

    update(dt) {
        this.x = floor(this.x + this.dx * dt)
        this.y = floor(this.y + this.dy * dt)

        this.rectbounds.update(this.x, this.y)
    }

    render() {
        if (this.image != undefined) {
            image(this.image, this.x, this.y, this.width, this.height)
        } else {
            fill(255, 0, 255)
            strokeWeight(0)
            rect(this.x, this.y, this.width, this.height)
        }
    }
    renderDebug() {
        this.rectbounds.render()
    }
}
//********** */
//********* */
class Stage {
    constructor(gsm) {
        this.gsm = gsm
    }

    update(dt) {}

    render() {}

    onEnter(param = undefined) {}

    onExit() {}
}
//***************** */
//**************** */
class StageManager {
    constructor() {
        this.tab = []
        this.current = undefined
    }

    pushStage(newstage) {
        this.tab.push(newstage)
        this.current = this.tab[this.tab.length - 1]
        this.current.onEnter()
    }

    popStage() {
        if (this.tab.length > 0) {
            this.current = this.tab.pop()
            this.current.onExit()
        }
    }

    changeStage(newstage, datas) {
        if (this.tab.length > 0) {
            this.current.onExit()
            this.tab.pop()
            //
            this.tab.push(newstage)
            this.current = this.tab[this.tab.length - 1]
            this.current.onEnter(datas)
        }
    }

    update(dt) {
        this.current.update(dt)
    }

    render() {
        this.current.render()
    }
}
//********** */
//********* */
class Quads {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

    print() {
        console.log("x= " + x + " y=" + y)
    }
}
/*************** */
//************* */
class Animation {
    constructor(atlas, widthSprite, heightSprite, duration = 1 / 30, looping = false) {
        this.quads = []
        this.atlas = atlas
        this.width = widthSprite
        this.height = heightSprite
        this.duration = duration
        this.looping = looping

        this.atlasW = atlas.width
        this.atlasH = atlas.height

        this.nbY = int(this.atlasH / this.height)
        this.nbX = int(this.atlasW / this.width)

        this.currentFRame = 0

        this.timer = 0
        this.createQuads()

        this.go = false
    }

    play() {
        this.go = true
    }

    stop() {
        this.go = false
    }

    isPlaying() {
        return this.go
    }

    createQuads() {
        for (let y = 0; y < this.nbY; ++y) {
            for (let x = 0; x < this.nbX; x++) {
                this.quads.push(new Quads(x, y, this.width, this.height))
            }
        }
    }

    update(dt) {
        if (this.go && this.quads.length > 1) {
            this.timer += dt

            if (this.timer > this.duration) {
                this.timer = 0
                this.currentFRame++
                    if (this.currentFRame > this.quads.length - 1) {
                        this.currentFRame = 0
                        if (this.looping == false) {
                            this.go = false
                        }

                    }
            }

        }
    }

    render(xp, yp) {
        if (this.go) {
            //
            let quad = this.quads[this.currentFRame]

            image(this.atlas,
                xp,
                yp,
                this.width,
                this.height,
                this.quads[this.currentFRame].x * this.width,
                this.quads[this.currentFRame].y * this.height,
                this.quads[this.currentFRame].w,
                this.quads[this.currentFRame].h)
        }
    }
}
//************* */
//************ */
class Particle {
    constructor(x = 0, y = 0, radius = 15, rgbColor = color(25, 25, 25), liveMax = 2) {
        this.radius = radius
        this.xinit = x
        this.yinit = y
        this.x = x
        this.y = y
        this.dx = 0
        this.dy = 0
        this.alpha = 255
        this.timer = 0
        this.live = random(0.1, liveMax)
        this.state = "LIVE"
        this.rgbColor = rgbColor
    }

    isDead() {
        if (this.state === "DEAD") {
            return true
        } else {
            return false
        }
    }

    move(xn, yn) {
        this.xinit = xn
        this.yinit = yn
    }

    reset(xn, yn) {
        this.xinit = xn
        this.yinit = yn
        this.x = this.xinit
        this.y = this.yinit

        this.live = random(1, this.live)
        this.timer = 0
        this.alpha = 255
        this.state = "LIVE"
    }

    setVelocity(dx, dy) {
        this.dx = dx
        this.dy = dy
    }

    setSpeed(module, angle) {
        this.dx = module * cos(angle)
        this.dy = module * sin(angle)
    }

    update(dt) {
        this.timer += dt
        if (this.timer > this.live) {
            this.timer = 0
            this.state = "DEAD"
        }

        this.alpha = 255 - (255 * this.timer) / this.live

        this.x += this.dx * dt
        this.y += this.dy * dt
    }

    render() {
        noStroke()

        this.rgbColor.setAlpha(this.alpha)
        fill(this.rgbColor)
        ellipse(this.x, this.y, this.radius)
    }
}
//*********************** */
//********************** */
class ParticlesGenerator {
    constructor(xp, yp, speed_min = 10, speed_max = 80, angle_min = PI / 4, angle_max = 3 * PI / 4) {
        this.xp = xp
        this.yp = yp
        this.speed_min = speed_min
        this.speed_max = speed_max
        this.angle_min = angle_min
        this.angle_max = angle_max
        this.go = false

        this.particules = []
        //
        for (let i = 0; i < 100; i++) {
            this.particules.push(new Particle(this.xp, this.yp))
            this.particules[i].setSpeed(random(this.speed_min, this.speed_max), random(this.angle_min, this.angle_max))
        }
    }

    start() {
        this.go = true
    }

    stop() {
        this.go = false
    }

    move(xn, yn) {
        this.xp = xn
        this.yp = yn
    }

    update(dt) {
        if (this.particules.length > 0 && this.go) {
            for (let i = 0; i < this.particules.length; i++) {
                this.particules[i].update(dt)
                //
                if (this.particules[i].isDead()) {
                    this.particules[i].reset(this.xp, this.yp)
                }
            }
        }
    }

    render() {
        if (this.particules.length > 0 && this.go) {
            for (let i = 0; i < this.particules.length; i++) {
                this.particules[i].render()
            }
        }
    }
}
//***************** */
//**************** */
class InputManager {
    constructor() {
        this.tabKeyPressed = {}
        this.tabKeyReleased = {}
        this.mouseclicked = false
        this.mousePosiX = 0
        this.mousePosiY = 0
    }

    update() {
        this.tabKeyPressed = {}
        this.tabKeyReleased = {}
        this.tabMouseClicked = {}
        this.mouseclicked = false
    }

    setKeyboardPressed(keyCode) {
        this.tabKeyPressed[keyCode] = true
    }

    setKeyboardReleased(keyCode) {
        this.tabKeyReleased[keyCode] = true
    }

    setMouseClicked(px, py) {
        this.mouseclicked = true
        this.mousePosiX = px
        this.mousePosiY = py
    }

    setMouseReleased(px, py) {
        this.mouseclicked = false
        this.mousePosiX = px
        this.mousePosiY = py
    }

    isMouseClicked() {
        return this.mouseclicked
    }

    isKeyPressed(keyCode) {
        return this.tabKeyPressed[keyCode]
    }

    isKeyReleased(keyCode) {
        return this.tabKeyReleased[keyCode]
    }
}
//****************** */
//***************** */
class ScoreManager {
    constructor() {
        this.name = "---"
        this.points = 0
        this.lives = 3
        this.label = new Label()
        this.label.setSize(24)
        this.label.setColor(color(255, 255, 55))
    }

    setName(zename) {
        this.name = zename
    }

    getName() {
        return this.name
    }

    getPoints() {
        return this.points
    }

    setPoints(nb) {
        this.points = nb
    }

    getLives() {
        return this.lives
    }

    incrementsPoints(amt) {
        this.points += amt
    }

    incrementsLives(amt = 1) {
        if (this.lives >= 0 && this.lives < 3) {
            this.lives += amt
        }
    }

    decrementsLives() {
        this.lives--
    }

    isGameOver() {
        if (this.lives < 0) {
            return true
        } else {
            return false
        }
    }

    reset() {
        this.points = 0
        this.lives = 3
    }

    update(dt) {}

    render() {
        this.label.setText("Points: " + this.points)
        this.label.render(10, 30)
        this.label.setText(this.name)
        this.label.render(200, 30)

        fill(255, 50, 50, 200)
        strokeWeight(0)
        let xd = CANVAS_WIDTH - 100

        if (this.lives > 0) {
            for (let i = 0; i < this.lives; i++) {
                ellipse(xd + 25 * i, 30, 20)
            }
        }
    }
}
//*********** */
//********** */
class Label {
    constructor(text = "", size = 20) {
        this.txt = text
        this.size = size
        this.visible = true
        this.style = BOLD //NORMAL ITALIC BOLD
        this.rgbColor = color(255, 255, 255)
        this.align = LEFT
    }

    setVisible(visible) {
        this.visible = visible
    }

    setText(txt) {
        this.txt = txt
    }

    setColor(rgbColor) {
        this.rgbColor = rgbColor
    }

    setSize(size) {
        this.size = size
    }

    setAlign(mode) {
        this.align = mode
    }

    render(xp, yp) {
        if (this.visible) {
            textFont("arial")
            textAlign(this.align)
            textSize(this.size)
            textStyle(this.style)
            fill(this.rgbColor)
            noStroke()
            text(this.txt, xp, yp)
        }
    }
}
//** */
//end