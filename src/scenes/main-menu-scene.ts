import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../consts';

let updateTime = 200;
let currentUpdateTime = 0;

export default class MainMenuScene extends Phaser.Scene
{
  private clickText!: Phaser.GameObjects.Text;

  constructor()
  {
    super('MainMenuScene');
  }

  create()
  {
    let bg = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'map');
    bg.setScale(3);
    this.tweens.add({
      targets: bg,
      alpha: 0.5,
      duration: 2000,
      ease: 'Power2',
      yoyo: true,
      repeat: -1
    })


    this.clickText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT * 0.7, 'Click anywhere to start', {
      fontSize: '24px',
      color: '#ffffff',
      align: 'center',
      fontFamily: 'font-title'
    });
    this.clickText.setOrigin(0.5, 0.5);
    this.input.on('pointerdown', () =>
    {
      this.scene.start('GameScene');
    });

    //this.scene.start('GameScene');

    let titleText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT * 0.3, 'Kibby vs Eggs', {
      fontSize: '48px',
      color: '#ffffff',
      fontFamily: 'font-title'
    });
    titleText.setOrigin(0.5, 0.5);

    this.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'player').play('player-idle-down').setScale(4);

    this.add.text(GAME_WIDTH - 20, GAME_HEIGHT - 20, 'v1.0.0 by evilpixi', {
      fontSize: '16px',
      color: '#ffffff',
    }).setOrigin(1, 1);
  }

  update(time: number, delta: number)
  {
    currentUpdateTime += delta;
    if (currentUpdateTime >= updateTime)
    {
      currentUpdateTime -= updateTime;
      this.clickText.setAlpha(this.clickText.alpha === 1 ? 0.5 : 1);
    }
  }
}