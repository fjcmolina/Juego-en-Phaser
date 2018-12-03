import Palas from '../gameObjects/palas.js';

var scoreRight = 0;
var scoreLeft = 0;

var scoreTextLeft;
var scoreTextRight;

class Scene_play extends Phaser.Scene {
    constructor(){
        super({key: "Scene_play"});
    }
    
    create(){

        //let solo funciona en la funcion create
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;

       //Separador
       this.add.image(center_width,center_height, "separador");

       //Pala izquierda
       this.left = new Palas(this, 30, center_height, "left");
       //Pala derecha
       this.right = new Palas(this, this.sys.game.config.width - 30, center_height, "right");

       //Pelota
        this.physics.world.setBoundsCollision(false,false,true,true); //rebote(izquierda,derecha,arriba,abajo)
        this.ball = this.physics.add.image(center_width,center_height,"ball");
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);//Para cuando rebote lleve la misma velocidad
        this.ball.setVelocityX(-180);

        //Fisica
        this.physics.add.collider(this.ball, this.left,this.chocaPala ,function(){
            this.sound.play("boundPala")
        }, this);
        this.physics.add.collider(this.ball, this.right, this.chocaPala ,function(){
            this.sound.play("boundPala")
        }, this);

        //Controles
        //Pala derecha
        this.cursor =  this.input.keyboard.createCursorKeys();

        //Pala izquierda
        this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        //Musica
        var music = this.sound.add('musica');

        this.loadButton = this.add.text(10, 10, ' Play Music', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => music.play());

        this.loadButton = this.add.text(10, 30, ' Stop Music', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => music.stop());

        //Puntuacion
        scoreTextLeft = this.add.text(128, 40, scoreLeft, { font: '32px Arial', fill: '#0095DD' });
        scoreTextRight = this.add.text(500, 40, scoreRight, { font: '32px Arial', fill: '#0095DD' });
    }

    update(){

        //Puntuacion
        if(this.ball.x < 0 ){
            scoreRight++;
            scoreTextRight.setText(scoreRight);
            if(scoreRight == 3){
                //this.add.text(this.sys.game.config.width/2, this.sys.game.config.height/2, 'Jugador derecha gana', { font: '16px Arial', fill: '#0095DD' });
                alert("JUGADOR MORADO GANA");
                location.reload();
               // setTimeout("location.reload()",1000);
            }
        }else if(this.ball.x > this.sys.game.config.width){
            scoreLeft++;
            scoreTextLeft.setText(scoreLeft);
            if(scoreLeft == 3){
                //this.add.text(this.sys.game.config.width/2, this.sys.game.config.height/2, 'Jugador izquierda gana', { font: '16px Arial', fill: '#0095DD' });
                alert("JUGADOR AZUL GANA");
                location.reload();
               // setTimeout("location.reload()",1000);
            }
        }

        //La pelota vuelve al centro
        if(this.ball.x < 0 || this.ball.x > this.sys.game.config.width){
            this.ball.setPosition(this.sys.game.config.width/2, this.sys.game.config.height/2);
        }

        //Controles
        //Pala derecha
        if(this.cursor.down.isDown){
            this.right.body.setVelocityY(300);
        }else if(this.cursor.up.isDown){
            this.right.body.setVelocityY(-300);
        }else{
            this.right.body.setVelocityY(0);
        }

        //Pala izquierda
        if(this.cursor_S.isDown){
           this.left.body.setVelocityY(300); 
        }else if(this.cursor_W.isDown){
            this.left.body.setVelocityY(-300); 
        }else{
            this.left.body.setVelocityY(0);
        }
    }

    chocaPala(){
        this.ball.setVelocityY(Phaser.Math.Between(-120,120));
    }
}

export default Scene_play;