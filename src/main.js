import Phaser from 'phaser'

//import HelloWorldScene from './HelloWorldScene'
//import { GameScene } from './GameScene'
//import {newGame} from './newGame'
import { FirstTest } from './firstTest'
const config = {
	type: Phaser.AUTO,				//랜더링 방식	Phaser.CANVASE WEBGL AUTO 가 있음
	parent: 'app',
	width: 1280,
	height: 720,					//화면 크기
	physics: {						//물리엔진
		default: 'arcade', 			//matter
		arcade: {
			gravity: { y: 200 },	//중력
		},
	},
	scene: [FirstTest],
}

export default new Phaser.Game(config)
