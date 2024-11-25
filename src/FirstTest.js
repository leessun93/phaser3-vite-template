import Phaser from "phaser";

export class FirstTest extends Phaser.Scene {
    constructor() {
        super("game-scene");
      }

    preload(){
        //리소스 로드
        this.load.image('bangWoolE', 'assets/bangWollE.png');
        this.load.image("dollDdungE", "assets/dollDdungE.png");
        //배경로드
        this.load.image("sky", "assets/sky.png");
        this.load.image("ground", "assets/platform.png");
    }
    
    create(){
        this.background = this.add.image(1280,720, "sky");
        this.background.setOrigin(0,0);
        //케릭터 추가
        this.bangW = this.add.image(200,300, "bangWoolE");
        this.dollD = this.add.image(600,300, "dollDdungE");

        this.bangW.flipX = true;
        this.dollD.flipY = false;


        //키보드
        this.keyBoardInput = this.input.keyboard.createCursorKeys();

    }

    update(){
        this.move(this.bangW);

    }
/*
    init(){

    }
    shutdown(){

    }
    destroy(){

    }*/




    /*전역 함수*/
    move(player){
        const PLAYER_SPEED = 2;
        //player.y += PLAYER_SPEED;
        if(this.keyBoardInput.left.isDown ||
           this.keyBoardInput.right.isDown ||
           this.keyBoardInput.up.isDown ||
           this.keyBoardInput.down.isDown){
            console.log("무빙");
        } 
        //좌 우
        if(this.keyBoardInput.left.isDown){
            player.x -= PLAYER_SPEED;
            player.flipX = false;
        }else if(this.keyBoardInput.right.isDown){
            player.x += PLAYER_SPEED;
            player.flipX = true;
        }
        //상 하
        if(this.keyBoardInput.up.isDown){
            player.y -= PLAYER_SPEED;
        }else if(this.keyBoardInput.down.isDown){
            player.y += PLAYER_SPEED;
        }
    }
}
