import Phaser from 'phaser';
import GameScene from './game-scene';
import { GAME_HEIGHT, GAME_WIDTH, STARTING_HEARTS } from '../consts';

export default class UIScene extends Phaser.Scene
{
  private hearts: Phaser.GameObjects.Sprite[] = [];
  private gallonsText: Phaser.GameObjects.Text | null = null;
  private gameScene: GameScene | null = null;

  constructor()
  {
    super({ key: 'UIScene' });
  }

  init(data: any): void
  {
    this.gameScene = data.gameScene;
  }

  create(): void
  {
    // ------------------------------------
    // ----------- Milk --------------
    // ------------------------------------
    this.gallonsText = this.add.text(12, 56, '#gallonS_TEXT', {
      fontSize: '18px',
      fontFamily: 'font-title',
      color: '#fff'
    });
    this.updateGallons(0);

    this.hearts = [];
    for (let i = 0; i < STARTING_HEARTS; i++)
    {
      const heart = this.add.sprite(12 + i * 36, 18, 'heart', 0).setOrigin(0, 0);
      heart.setScale(1);
      this.hearts.push(heart);
    }


    // ------------------------------------
    // ------------- Events ---------------
    // ------------------------------------
    this.gameScene?.events.on('gallons-changed', this.onGallonsChanged, this);
    this.gameScene?.events.on('hearts-changed', this.onHeartsChanged, this);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () =>
    {
      this.events.off('gallons-changed', this.onGallonsChanged);
      this.events.off('hearts-changed', this.onGallonsChanged);
    });
  }

  updateGallons(gallons: number): void
  {
    if (this.gallonsText)
    {
      this.gallonsText.setText(`Milk gallons: ${gallons}`);
    }
  }

  onGallonsChanged = (newGallons: number) =>
  {
    if (this.gallonsText)
      this.updateGallons(newGallons);
  };

  onHeartsChanged = (newHearts: number) =>
  {
    if (this.hearts.length <= newHearts) return;

    const oldHeart = this.hearts.pop();
    if (!oldHeart) return;

    this.tweens.add({
      targets: oldHeart,
      alpha: 0,
      scale: 0,
      duration: 100,
      ease: 'Quad',
      onComplete: () => oldHeart.destroy()
    })

    if (newHearts <= 0)
    {
      this.showGameOver();
    }
  }

  showGameOver(): void
  {
    this.cameras.main.shake(400, 0.01);
    this.cameras.main.flash(200, 255, 0, 0);

    let gameOverRectangle = this.add.rectangle(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      GAME_HEIGHT,
      0x000000, 0.8);
    gameOverRectangle.setOrigin(0.5, 0.5);
    gameOverRectangle.setDepth(1000);
    gameOverRectangle.setAlpha(0);

    this.tweens.add({
      targets: gameOverRectangle,
      alpha: 1,
      duration: 500,
      ease: 'Quad',
      onComplete: () =>
      {
        gameOverRectangle.setInteractive();
        gameOverRectangle.on('pointerdown', () =>
          this.events.emit('game-over-triggered')
        );
      }
    })

    let gameOverText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'GAME OVER', {
      fontSize: '48px',
      fontFamily: 'font-title',
      color: '#fff'
    });
    gameOverText.setOrigin(0.5, 0.5);
    gameOverText.setDepth(1001);
    gameOverText.setAlpha(0);

    this.tweens.add({
      targets: gameOverText,
      alpha: 1,
      delay: 300,
      duration: 500,
      ease: 'Quad',
    });

    let clickToMenuText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 60,
      'Click to go to Main Menu',
      {
        fontSize: '24px',
        fontFamily: 'font-title',
        color: '#fff'
      });
    clickToMenuText.setOrigin(0.5, 0.5);
    clickToMenuText.setDepth(1001);
    clickToMenuText.setAlpha(0);

    this.tweens.add({
      targets: clickToMenuText,
      alpha: 1,
      delay: 700,
      duration: 500,
      ease: 'Quad',
    });
  }
}