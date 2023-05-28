let dragging = false;

// fire, water, air, earth, light, dark

class gamescene extends Phaser.Scene{
    constructor(){
        super("gamescene");
        this.lookedglyph = null;
        this.glyphcounts = {
            fire: 5,
            water: 5,
            air: 5,
            earth: 5,
            light: 5,
            dark: 5
        }
    }
    preload(){
        //this.load.path ="./assets/";
        this.load.image("fire", "fire.png");
        this.load.image("water", "water.png");
        this.load.image("air", "air.png");
        this.load.image("earth", "earth.png");
        this.load.image("light", "light.png");
        this.load.image("dark", "dark.png");
        this.load.image("blank", "blank.png");
        this.load.image("delete", "delete.png");
    }
    create(){
        //this.scale.startFullscreen();
        let w = this.game.config.width;
        let h = this.game.config.height;

        let glyphs = [
            this.add.image(w*0.4, h*0.45, "fire"),
            this.add.image(w*0.6, h*0.45, "water"),
            this.add.image(w*0.4, h*0.55, "earth"),
            this.add.image(w*0.6, h*0.55, "air"),
            this.add.image(w*0.5, h*0.42, "light"),
            this.add.image(w*0.5, h*0.58, "dark"),
            this.add.image(w*0.37, h*0.5, "blank"),
            this.add.image(w*0.63, h*0.5, "delete")
        ]
        
        for(let i = 0; i < 8; i++){
            glyphs[i].setDepth(2);
            glyphs[i].alpha = 1;
            glyphs[i].setInteractive();
            glyphs[i].setScale(0.2);
        }

        glyphs[0].on("pointerdown", () =>{
            if(this.lookedglyph != null && this.glyphcounts.fire > 0){
                this.lookedglyph.glyph = "fire";
                this.glyphcounts.fire -= 1;
                //console.log(this.glyphcounts.fire);
            }
        });
        glyphs[1].on("pointerdown", () =>{
            if(this.lookedglyph != null && this.glyphcounts.water > 0){
                this.lookedglyph.glyph = "water";
                this.glyphcounts.water -= 1;
                //console.log(this.glyphcounts.water);
            }
        });
        glyphs[2].on("pointerdown", () =>{
            if(this.lookedglyph != null && this.glyphcounts.earth > 0){
                this.lookedglyph.glyph = "earth";
                this.glyphcounts.earth -= 1;
                //console.log(this.glyphcounts.earth);
            }
        });
        glyphs[3].on("pointerdown", () =>{
            if(this.lookedglyph != null && this.glyphcounts.air > 0){
                this.lookedglyph.glyph = "air";
                this.glyphcounts.air -= 1;
                //console.log(this.glyphcounts.air);
            }
        });
        glyphs[4].on("pointerdown", () =>{
            if(this.lookedglyph != null && this.glyphcounts.light > 0){
                this.lookedglyph.glyph = "light";
                this.glyphcounts.light -= 1;
                //console.log(this.glyphcounts.light);
            }
        });
        glyphs[5].on("pointerdown", () =>{
            if(this.lookedglyph != null && this.glyphcounts.dark > 0){
                this.lookedglyph.glyph = "dark";
                this.glyphcounts.dark -= 1;
                //console.log(this.glyphcounts.dark);
            }
        });
        
        glyphs[6].on("pointerdown", () =>{
            if(this.lookedglyph != null){
                this.lookedglyph.glyph = "blank";
                this.glyphcounts.fire -= 1;
                //console.log("blank");
            }
        });
        glyphs[7].on("pointerdown", () =>{
            if(this.lookedglyph != null && this.glyphcounts.fire > 0){
                //delete function
                //console.log("delete");
            }
        });
        
        
        let center = new glyphcircle(this, w*0.5, h*0.5, 10, 0xFFFFFF, 0);
        this.input.on("held", (glyph) => {
            console.log("worked!");
            this.lookedglyph = glyph;
        })
    }
    update(){
        
    }
}

class glyphcircle extends Phaser.GameObjects.Arc{
    constructor(scene, x, y, radius, fillColor, fillAlpha) {
        super(scene, x, y, radius, 0, 360, false, fillColor, fillAlpha);
        this.setStrokeStyle(1, 0x000000, 1);

        this.moved = false;
        this.setimer = false;
        this.radius = radius;
        this.center = false;
        this.fillColor = fillColor;
        this.currenttimer;
        this.glyph = "blank";
        this.ring = null;
        this.parent = null;
        this.children = [];

        scene.add.existing(this);
        this.setInteractive();
        scene.input.setDraggable(this);
        this.holding(scene);
    }
    holding(scene){
        this.on('pointerdown', ()=>{
            if(!this.setimer){
                this.currenttimer = scene.time.addEvent({
                    delay: 700,
                    loop: false,
                    callback: () =>{
                        if(!this.moved){
                            //console.log("pull up glyphs");
                            scene.input.emit("held", this);
                        }
                        this.setimer = false;
                        //this.moved = false;
                    }
                });
            }
            this.setimer = true;
        })
        let sub
        let ring;

        this.on("drag", (pointer) =>{
            if(this.currenttimer != null){
                scene.time.removeEvent(this.currenttimer);
                this.setimer = false;
            }
            if(!this.moved){
                console.log("made glyph")
                this.moved = true;
                sub = new glyphcircle(scene, pointer.x, pointer.y, this.radius, this.fillColor, this.fillAlpha);
                ring = scene.add.existing(new Phaser.GameObjects.Arc(scene, this.x, this.y, this.dist(this.x, sub.x, this.y, sub.y), 0, 360, false, 0xffffff, 0));
                ring.setStrokeStyle(1, 0x000000, 1);
                ring.setDepth(-1);
                sub.ring = ring;
                sub.parent = this;
                this.children.push(sub);
                if(!this.center){
                    this.center = true;
                    this.setScale(1.7);
                }
            }
            if(ring!= null){
                this.ringdrag(ring, pointer);
            }
            sub.x = pointer.x;
            sub.y = pointer.y;
        })
        scene.input.on("pointerup", (pointer)=>{
            this.moved = false;
        })
    }
    ringdrag(ring, pointer){
        console.log("dragging!");
        ring.radius = this.dist(this.x, pointer.x, this.y, pointer.y);
    }
    dist(x1, x2, y1, y2){
        let a = Math.abs(x1 - x2);
        let b = Math.abs(y1 - y2);
        return Math.sqrt(a*a + b*b);
    }
}
let config = {
    type: Phaser.WEBGL,
    width: 1170/2.8,
    height: 2532/3.4,
    backgroundColor: 0xFFFF00,
    scene: [gamescene],
}

let game = new Phaser.Game(config);


