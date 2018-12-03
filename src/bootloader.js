
class Bootloader extends Phaser.Scene{
    constructor(){
        super({key: "Bootloader"});
    }

    preload(){

        //Bara de carga
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(150, 230, 320, 50);
        
        this.load.on('progress',function(value){
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.fillStyle(0xffffff,1);//el 1 es la opacidad de la barra
            progressBar.fillRect(160, 240, 300 * value, 30);
        });

        //Texto cargando
        var loadingText = this.make.text({
            x: 260,
            y: 255,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        //Porcentaje de carga
        var percentText = this.make.text({
            x: 340,
            y: 255,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
    
        //Boton Jugar
         this.loadButton = this.add.text(230,150, 'JUGAR', { fill: '#0f0',font: '50px monospace' })
        .setInteractive()
        .on('pointerdown', () => this.scene.start("Scene_play"));

        this.load.image("ball", "./assets/ball.png");
        this.load.image("left", "./assets/left_pallete.png");
        this.load.image("right", "./assets/right_pallete.png");
        this.load.image("separador", "./assets/separator.png");

        this.load.audio("boundPala",["./assets/ballBounce.m4a","//assets/ballBounce.ogg"]);

        this.load.audio("musica",["./assets/musicaFondo.mp3","//assets/musicaFondo.ogg"])
    }   
}

export default Bootloader;