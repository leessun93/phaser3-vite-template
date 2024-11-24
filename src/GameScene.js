import Phaser from "phaser";

export class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
  }

  collectStar(player, star) {
    star.disableBody(true, true);

    this.data.set("score", this.data.get("score") + 10);

    this.children
      .getByName("scoreText")
      .setText("Score: " + this.data.get("score"));
  
      const stars = this.data.get("stars");
/*
      if (stars.countActive(true) === 0) {
           stars.children.iterate(function (child) {
             child.enableBody(true, child.x, 0, true, true);
           });
     
           const x =
             player.x < 400
               ? Phaser.Math.Between(400, 800)
               : Phaser.Math.Between(0, 400);
     
           const bombs = this.data.get("bombs");
     
           const bomb = bombs.create(x, 16, "bomb");
     
           bomb.setBounce(1);
     
           bomb.setCollideWorldBounds(true);
     
           bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
         }  */




         if (stars.countActive(true) === 0) {
            stars.children.iterate(function (child) {
              child.enableBody(true, child.x, 0, true, true);
            });
          }
          const x =
            player.x < 400
              ? Phaser.Math.Between(400, 800)
              : Phaser.Math.Between(0, 400);
      
          const bombs = this.data.get("bombs");
      
          const bomb = bombs.create(x, 16, "bomb");
      
          bomb.setBounce(1);
      
          bomb.setCollideWorldBounds(true);
      
          bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);         
}

  hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");
  }


  preload() {
    this.load.image("sky", "assets/sky.png");

    this.load.image("ground", "assets/platform.png");

    this.load.image("star", "assets/star.png");

    this.load.image("bomb", "assets/bomb.png");

    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(400, 300, "sky");

    //this.add.image(400, 300, "star");
    const stars = this.physics.add.group({
        key: "star",
  
        repeat: 11,
  
        setXY: { x: 12, y: 0, stepX: 70 },
    });
    this.data.set("stars", stars);
    
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    
     
    /*지형*/
    const platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, "ground").setScale(2).refreshBody();

    platforms.create(600, 400, "ground");

    platforms.create(50, 250, "ground");

    platforms.create(750, 220, "ground");

    /*플레이어*/
    //생성자 this.physics.add.sprite 로 다이나믹 객체 생성
    const player = this.physics.add.sprite(100, 450, 'dude').setName("player");
    player.setBounce(0.2); //setBounce로 충돌시 바운스효과 생성
    //화면경계에서 충돌 on
    player.setCollideWorldBounds(true);
    //지형과 상호작용을 위한 코드
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms); 
    this.anims.create({

        key: 'left',

        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),

        frameRate: 10,  //fps 설정

        repeat: -1  //애니메이션 반복수 , -1은 무한

    });

    this.anims.create({

        key: 'turn',
    
        frames: [ { key: 'dude', frame: 4 } ],
    
        frameRate: 20
    
    });

    this.anims.create({

        key: 'right',
    
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    
        frameRate: 10,
    
        repeat: -1
    
    });

    this.physics.add.overlap(player, stars, this.collectStar, undefined, this);
    this.data.set("score", 0);

    this.add.text(16, 16, 'score: 0', { fontSize: '32px', backgroundColor: '#000' }).setName("scoreText");  



    const bombs = this.physics.add.group();

    this.data.set("bombs", bombs);

    this.physics.add.collider(bombs, platforms);

    this.physics.add.collider(player, bombs, this.hitBomb, undefined, this);
}

  //여기에 키보드 입력값 코드 작성
  update() {
    //기보드 값 집어넣을 변수 생성
    const cursors = this.input.keyboard.createCursorKeys();

    const player = this.children.getByName("player");
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
  
        player.anims.play("left", true);
      } else if (cursors.right.isDown) {
        player.setVelocityX(160);
  
        player.anims.play("right", true);
      } else {
        player.setVelocityX(0);
  
        player.anims.play("turn");
      }
  
      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
      }

      
  }
}