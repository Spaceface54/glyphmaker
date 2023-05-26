class gamescene extends Phaser.Scene{
    constructor(){
        super("gamescene");
    }
    preload(){
        this.load.path ="./assets/";
    }
    create(){
        //this.scale.startFullscreen();
        let w = this.game.config.width;
        let h = this.game.config.height;
        let center = new glyphcircle(this, w*0.5, h*0.5, 20, 0xFFFFFF, 1);
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


        scene.add.existing(this);
        this.setInteractive();
        scene.input.setDraggable(this);
        this.holding(scene);
    }
    holding(scene){
        this.on('pointerdown', ()=>{
            if(!this.setimer){
                scene.time.addEvent({
                    delay: 700,
                    loop: false,
                    callback: () =>{
                        if(!this.moved){
                            console.log("pull up glyphs");
                        }
                        this.setimer = false;
                        //this.moved = false;
                    }
                });
            }
            this.setimer = true;
        })
        let sub;
        this.on("dragstart", (pointer)=>{

        })
        this.on("drag", (pointer) =>{
            if(!this.moved){
                console.log("made glyph")
                this.moved = true;
                sub = new glyphcircle(scene, pointer.x, pointer.y, this.radius, this.fillColor, 1);
                if(!this.center){
                    this.center = true;
                    this.setScale(1.2);
                }
            }
            sub.x = pointer.x;
            sub.y = pointer.y;
        })
        this.on("dragend", (pointer)=>{
            if(!this.setimer){
                this.moved = false;
            }
        })
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