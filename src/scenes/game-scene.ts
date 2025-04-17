import Phaser from 'phaser';
import Character from '../gameplay/character';
import { GAME_HEIGHT, GAME_WIDTH, STARTING_HEARTS } from '../consts';
import InputSystem from '../gameplay/inputs';
import EggManager from '../gameplay/egg-manager';
import MilkManager from '../gameplay/milk-manager';

export default class GameScene extends Phaser.Scene
{
  private player: Character | null = null;
  private inputSystem: InputSystem | null = null;
  private eggsManager: EggManager | null = null;
  private milkManager: MilkManager | null = null;

  private heartsAmount: number = STARTING_HEARTS;
  private gallons: number = 0;

  constructor()
  {
    super({ key: 'GameScene' });
  }

  create(): void
  {
    // Add map image
    const map = this.add.image(GAME_WIDTH * 0.5, GAME_HEIGHT * 0.5, 'map');
    map.setOrigin(0.5, 0.5);
    map.setScale(3);

    this.heartsAmount = STARTING_HEARTS;
    this.gallons = 0;

    this.player = new Character(this, GAME_WIDTH * 0.5, GAME_HEIGHT * 0.5, 'player');
    this.player.setScale(2);
    this.player.body?.setCircle(6, 18, 18);


    // ------------------------------------
    // ----------- Managers --------------
    // ------------------------------------
    this.inputSystem = new InputSystem(this, this.player);
    this.eggsManager = new EggManager(this, this.player);
    this.milkManager = new MilkManager(this, this.player);


    // ------------------------------------
    // ------------- Events ---------------
    // ------------------------------------
    let onGameOver = () => this.scene.start('MainMenuScene');
    const uiScene = this.scene.get('UIScene');
    uiScene.events.on('game-over-triggered', onGameOver, this);

    this.events.on('milk-collected', this.increaseGallons, this);
    this.events.on('egg-hit', this.reduceHearts, this);

    this.scene.launch('UIScene', { gameScene: this });
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () =>
    {
      this.scene.stop('UIScene');
      this.events.off('milk-collected', this.increaseGallons, this);
      this.events.off('egg-hit', this.reduceHearts, this);
      this.events.off('game-over-triggered', onGameOver, this);
    });

  }

  update(time: number, delta: number): void
  {
    this.inputSystem?.update(time, delta);
    this.eggsManager?.update(time, delta);
    this.milkManager?.update(time, delta);
  }

  increaseGallons(gallons: number): void
  {
    this.gallons += gallons;
    this.events.emit('gallons-changed', this.gallons);
  }

  reduceHearts(): void
  {
    this.heartsAmount -= 1;
    this.events.emit('hearts-changed', this.heartsAmount);
    if (this.heartsAmount <= 0)
    {
      this.gameOver();
    }
  }

  gameOver(): void
  {
    const particles = this.add.particles(
      this.player?.x,
      this.player?.y,
      "spark",
      {
        speed: { min: 100, max: 400 },
        scale: { start: 1, end: 3 },
        lifespan: 200,
        quantity: 30,
        blendMode: 'ADD',
        duration: 500
      });

    this.player?.destroy();
  }
}