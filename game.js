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
            dark: 5,
            focus: 3
        }
        this.revealed = false;
        this.power = 0;
        this.sprite;
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
        this.load.image("focus", "focus.png");
        this.load.image("library", "blank.png");
    }
    create(){
        //this.scale.startFullscreen();
        let w = this.game.config.width;
        let h = this.game.config.height;
        let scalefactor = 10;
        let glyphs = [
            this.add.image(-7*scalefactor, -7*scalefactor, "fire"),
            this.add.image(7*scalefactor, -7*scalefactor, "water"),
            this.add.image(-7*scalefactor, 7*scalefactor, "earth"),
            this.add.image(7*scalefactor, 7*scalefactor, "air"),
            this.add.image(0, -10*scalefactor, "light"),
            this.add.image(0, 10*scalefactor, "dark"),
            this.add.image(-10*scalefactor, 0, "blank"),
            this.add.image(10*scalefactor, 0, "delete"),
            this.add.image(12*scalefactor, -12*scalefactor, "focus"),
            this.add.image(-12*scalefactor, -12*scalefactor, "library")
        ]
        let cntr = this.add.container();
        //cntr.setDepth(2);
        cntr.x = w*0.5;
        cntr.y = h*0.5;
        for(let i = 0; i < 10; i++){
            cntr.add(glyphs[i]);
            glyphs[i].setDepth(2);
            glyphs[i].alpha = 0;
            //glyphs[i].setInteractive();
            glyphs[i].setScale(0.4);
        }
        console.log(cntr.list[1]);
        console.log(w*0.5);

        glyphs[0].on("pointerdown", () =>{
            if(this.lookedglyph != null && this.glyphcounts.fire > 0){
                this.lookedglyph.glyph = "fire";
                this.glyphcounts.fire -= 1;
                this.lookedglyph.display(this.add.image(0, 0, "fire"));
                console.log(this.glyphcounts.fire);
            }
        });
        glyphs[1].on("pointerdown", () =>{
            if(this.lookedglyph != null && this.glyphcounts.water > 0){
                this.lookedglyph.glyph = "water";
                this.glyphcounts.water -= 1;
                this.lookedglyph.display(this.add.image(0, 0, "water"));
                //console.log(this.glyphcounts.water);
            }
        });
        glyphs[2].on("pointerdown", () =>{
            if(this.lookedglyph != null && this.glyphcounts.earth > 0){
                this.lookedglyph.glyph = "earth";
                this.glyphcounts.earth -= 1;
                this.lookedglyph.display(this.add.image(0, 0, "earth"));
                //console.log(this.glyphcounts.earth);
            }
        });
        glyphs[3].on("pointerdown", () =>{
            if(this.lookedglyph != null && this.glyphcounts.air > 0){
                this.lookedglyph.glyph = "air";
                this.glyphcounts.air -= 1;
                this.lookedglyph.display(this.add.image(0, 0, "air"));
                //console.log(this.glyphcounts.air);
            }
        });
        glyphs[4].on("pointerdown", () =>{
            if(this.lookedglyph != null && this.glyphcounts.light > 0){
                this.lookedglyph.glyph = "light";
                this.glyphcounts.light -= 1;
                this.lookedglyph.display(this.add.image(0, 0, "light"));
                //console.log(this.glyphcounts.light);
            }
        });
        glyphs[5].on("pointerdown", () =>{
            if(this.lookedglyph != null && this.glyphcounts.dark > 0){
                this.lookedglyph.glyph = "dark";
                this.glyphcounts.dark -= 1;
                this.lookedglyph.display(this.add.image(0, 0, "dark"));
                //console.log(this.glyphcounts.dark);
            }
        });
        
        glyphs[6].on("pointerdown", () =>{
            if(this.lookedglyph != null){
                this.lookedglyph.glyph = "blank";
                this.glyphcounts.fire -= 1;
                this.lookedglyph.display(null);
                //console.log("blank");
            }
        });
        glyphs[7].on("pointerdown", () =>{
            if(this.lookedglyph != null && this.lookedglyph.parent != null){
                let index = this.lookedglyph.parent.children.find(element => element == this.lookedglyph);
                let tempa = this.lookedglyph.parent.children[0];
                this.lookedglyph.parent.children[index] = tempa;
                this.lookedglyph.parent.children.shift();
                if(this.lookedglyph.parent.children.length == 0){
                    this.lookedglyph.parent.center = false;
                    this.lookedglyph.parent.setScale(1);
                    if(this.lookedglyph.parent.displayed != null){
                        this.lookedglyph.parent.displayed.setScale(0.15);
                    }
                }
                this.clearchildren(this.lookedglyph);
                this.lookedglyph.ring.destroy();
                this.lookedglyph.destroy();
                this.lookedglyph.display(null);
                this.lookedglyph = null;
            }
            else if(this.lookedglyph != null){
                this.clearchildren(this.lookedglyph);
                this.lookedglyph.center = false;
                this.lookedglyph.setScale(1);
                if(this.lookedglyph.displayed != null){
                    this.lookedglyph.parent.displayed.setScale(0.15);
                }
                //console.log(children.length);
            }
        });
        glyphs[8].on("pointerdown", () =>{
            if(this.lookedglyph != null && this.glyphcounts.focus >0){
                this.lookedglyph.glyph = "focus";
                this.glyphcounts.focus -= 1;
                this.lookedglyph.display(this.add.image(0, 0, "focus"));
            }
        });
        glyphs[9].on("pointerdown", () =>{
            if(this.lookedglyph != null){
                this.lookedglyph.glyph = "library";
                this.lookedglyph.display(this.add.image(0, 0, "library"));
                this.lookedglyph.addtext(this, this.sprite.body.maxVelocity.y);
            }
        });
        
        
        let center = new glyphcircle(this, w*0.5, h*0.5, 30, 0xFFFFFF, 0);
        center.showrings(this);
        this.input.on("held", (glyph) => {
            console.log("worked!");
            this.lookedglyph = glyph;
            this.input.disable(center);
            this.disabletouch(center);
            if(!this.revealed){
                this.revealglyphs(cntr, glyphs);
            }
        })
        this.input.on("pointerdown", () =>{
            this.input.enable(center);
            this.enabletouch(center);
            this.hideglyphs(glyphs);
        })

        //this is for the info
        this.sprite = this.physics.add.image(1000, 1000, 'blank');
        this.sprite.body.maxVelocity.x = 0;
        this.sprite.body.maxVelocity.y = 0;
        this.sprite.setAlpha(0);
        this.createBodyGui(this.sprite.body);
    }
    update(){
        
    }

    createBodyGui(body)
    {
        const gui = new dat.GUI({ width: 200 });
        this.createVectorGui(gui, 'X is power, Y is library number', body.maxVelocity, 0, 100, 0, 1000, 10);
        return gui;
    }
    
    createVectorGui (gui, name, vector, min1, max1, min2, max2, step)
    {
        const folder = gui.addFolder(name);

        folder.add(vector, 'x', min1, max1, step);
        folder.add(vector, 'y', min2, max2, step);

        return folder;
    }
    clearchildren(glyph){
        if(glyph.children.length == 0){
            glyph.display(null);
            if(glyph.text != null){
                glyph.text.destroy();
                glyph.text = null;
            }
            if(glyph.ring!= null){
                glyph.ring.destroy();
            }
            if(glyph.parent != null){
                glyph.destroy();
            }
            return;
        }
        else{
            for(let i = 0; i < glyph.children.length; i++){
                this.clearchildren(glyph.children[i]);
            }
            //glyph.children = [];
            glyph.display(null);
            if(glyph.ring!= null){
                glyph.ring.destroy();
            }
            if(glyph.parent != null){
                glyph.destroy();
            }
            if(glyph.text != null){
                glyph.text.destroy();
                glyph.text = null;
            }
        }
    }
    revealglyphs(cntr, glyphs){
        if(!this.revealed){
            cntr.x = this.lookedglyph.x;
            cntr.y = this.lookedglyph.y;
            for(let i = 0; i < 10; i++){
                glyphs[i].setInteractive();
                //console.log(glyphs[i]);
                let deltax = glyphs[i].x;
                let deltay = glyphs[i].y;
                this.tweens.add({
                    targets: glyphs[i],
                    x: {from: 0, to: deltax},
                    y: {from: 0, to: deltay},
                    alpha: 1,
                    duration: 500
                });
                this.revealed = true;
            }
        }
    }
    hideglyphs(glyphs){
        if(this.revealed){
            for(let i = 0; i < 10; i++){
                glyphs[i].removeInteractive();
                this.tweens.add({
                    targets: glyphs[i],
                    alpha: 0,
                    duration: 500
                });
                this.revealed = false;
            }
        }
    }
    disabletouch(glyph){
        if(glyph.children.length == 0){
            this.input.disable(glyph);
            return;
        }
        else{
            for(let i = 0; i < glyph.children.length; i++){
                this.disabletouch(glyph.children[i]);
            }
            this.input.disable(glyph);
        }
    }
    enabletouch(glyph){
        if(glyph.children.length == 0){
            this.input.enable(glyph);
            return;
        }
        else{
            for(let i = 0; i < glyph.children.length; i++){
                this.enabletouch(glyph.children[i]);
            }
            this.input.enable(glyph);
        }
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
        this.displayed = null;
        this.text = null;

        this.innerring = 450*(0.33);
        this.middlering = 450*(0.66);
        this.outerring = 450;

        scene.add.existing(this);
        this.setInteractive();
        scene.input.setDraggable(this);
        this.holding(scene);
    }
    holding(scene){
        this.on('pointerdown', ()=>{
            if(!this.setimer){
                this.currenttimer = scene.time.addEvent({
                    delay: 300,
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
                    if(this.displayed!= null){
                        this.displayed.setScale(0.5);
                    }
                }
            }
            if(this.dist(this.x, pointer.x, this.y, pointer.y) <this.outerring){
                sub.x = pointer.x;
                sub.y = pointer.y;
                if(ring!= null){
                    this.ringdrag(ring, pointer);
                }
            }
        })
        scene.input.on("pointerup", (pointer)=>{
            this.moved = false;
        })
    }
    ringdrag(ring, pointer){
        //console.log("dragging!");
        ring.radius = this.dist(this.x, pointer.x, this.y, pointer.y);
    }
    dist(x1, x2, y1, y2){
        let a = Math.abs(x1 - x2);
        let b = Math.abs(y1 - y2);
        return Math.sqrt(a*a + b*b);
    }
    display(glyph){
        if(glyph != null){
            if(this.displayed != null){
                this.displayed.destroy();
                this.displayed = null;
            }
            if(!this.center){
                glyph.setScale(0.4);
            }
            else{
                glyph.setScale(0.5);
            }
            glyph.x = this.x;
            glyph.y = this.y;
            this.displayed = glyph;
        }
        else if(this.displayed != null){
            this.displayed.destroy();
            this.displayed = null;
            if(this.text != null){
                this.text.destroy();
                this.text = null;
            }
        }
    }
    showrings(scene){
        scene.add.existing(new Phaser.GameObjects.Arc(scene, this.x, this.y, this.innerring, 0, 360, false, 0x00FF00, 0.2));
        scene.add.existing(new Phaser.GameObjects.Arc(scene, this.x, this.y, this.middlering, 0, 360, false, 0xFFA500, 0.2));
        scene.add.existing(new Phaser.GameObjects.Arc(scene, this.x, this.y, this.outerring, 0, 360, false, 0x880808, 0.2));
    }
    
    addtext(scene, num){
        if(this.text != null){
            this.text.destroy();
        }
        this.text = scene.add.text(this.x, this.y, num.toString(10));
        this.text.setScale(2);
        this.text.setOrigin(0.5,0.5);
        this.text.setTint(0x000000);
    }
}

class glyphcombo{
    constructor(meaning, subjects = [], verbmods = [], verbs = [], antiverbmods = []){
        this.meaning = meaning;
        this.glyphs = glyphs;
    }
}
let config = {
    type: Phaser.WEBGL,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    backgroundColor: 0xFFFF00,
    physics: {
        default: "arcade",
    },
    scene: [gamescene],
}

let game = new Phaser.Game(config);


