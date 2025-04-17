import Phaser from 'phaser';

const FRAME_RATE = 6;

export default class PreloadScene extends Phaser.Scene
{
  constructor()
  {
    super({ key: 'PreloadScene' });
  }

  private loadBar!: Phaser.GameObjects.Graphics;

  init(): void
  {
    this.add.rectangle(this.scale.width / 2, this.scale.height / 2, this.scale.width, 30, 0xffffff, 1);
    this.add.rectangle(this.scale.width / 2, this.scale.height / 2, this.scale.width, 28, 0x000000, 1);
    this.loadBar = this.add.graphics();
    this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, 'Loading...', {
      fontSize: '32px',
      color: '#ffffff',
    }).setOrigin(0.5, 0.5);
  }

  preload(): void
  {
    // load bar
    this.load.on('progress', (value: number) =>
    {
      this.loadBar.clear();
      this.loadBar.fillStyle(0xffffff, 1);
      this.loadBar.fillRect(0, this.scale.height / 2 - 10, this.scale.width * value, 20);
    });

    this.load.on('complete', () =>
    {
      this.loadBar.destroy();
    });

    // assets
    this.load.spritesheet('player', 'assets/images/character.png', { frameWidth: 48, frameHeight: 48 });
    this.load.image('egg', 'assets/images/egg.png');
    this.load.spritesheet('milk', 'assets/images/milk.png', { frameWidth: 16, frameHeight: 16 });
    this.load.image('spark', 'assets/images/spark.png');
    this.load.image('heart', 'assets/images/heart.png');
    this.load.image('map', 'assets/images/map.png');

    this.load.font('font-title', 'assets/fonts/SpecialGothicExpandedOne-Regular.ttf');
  }

  create(): void
  {
    // --------------------------------------------
    // ---------------- animations ----------------
    // --------------------------------------------

    // --- player idle animations ---
    this.anims.create({
      key: 'player-idle-down',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
      frameRate: FRAME_RATE,
      repeat: -1
    });
    this.anims.create({
      key: 'player-idle-up',
      frames: this.anims.generateFrameNumbers('player', { start: 4, end: 5 }),
      frameRate: FRAME_RATE,
      repeat: -1
    });

    this.anims.create({
      key: 'player-idle-left',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 9 }),
      frameRate: FRAME_RATE,
      repeat: -1
    });

    this.anims.create({
      key: 'player-idle-right',
      frames: this.anims.generateFrameNumbers('player', { start: 12, end: 13 }),
      frameRate: FRAME_RATE,
      repeat: -1
    });

    // --- player walk animations ---
    this.anims.create({
      key: 'player-walk-down',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 2, 1, 3] }),
      frameRate: FRAME_RATE,
      repeat: -1
    });
    this.anims.create({
      key: 'player-walk-up',
      frames: this.anims.generateFrameNumbers('player', { frames: [4, 6, 5, 7] }),
      frameRate: FRAME_RATE,
      repeat: -1
    });

    this.anims.create({
      key: 'player-walk-left',
      frames: this.anims.generateFrameNumbers('player', { frames: [8, 10, 9, 11] }),
      frameRate: FRAME_RATE,
      repeat: -1
    });

    this.anims.create({
      key: 'player-walk-right',
      frames: this.anims.generateFrameNumbers('player', { frames: [12, 14, 13, 15] }),
      frameRate: FRAME_RATE,
      repeat: -1
    });

    // --------------------------------------------
    // -------------- start game ------------------
    // --------------------------------------------
    this.scene.start("MainMenuScene");
  }
}