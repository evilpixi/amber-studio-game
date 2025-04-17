import Phaser from 'phaser';
import Character from './character';
import Egg from './egg';
import { GAME_HEIGHT, GAME_WIDTH } from '../consts';

export default class EggManager
{
  private scene: Phaser.Scene;
  private player: Character;
  private eggLimit: number = 10; // Maximum number of eggs on screen
  private eggGroup: Phaser.Physics.Arcade.Group | null = null;
  private nextEggTime: number = 0;

  constructor(scene: Phaser.Scene, player: Character)
  {
    this.scene = scene;
    this.player = player;
    this.eggGroup = this.scene.physics.add.group({
      classType: Egg,
      maxSize: this.eggLimit,
    });

    // ------------------------------------
    // ----------- Collision --------------
    // ------------------------------------
    this.scene.physics.add.overlap(
      this.player,
      this.eggGroup,
      (player, egg) =>
      {
        const eggSprite = egg as Egg;
        let eggDestoyedAnimation = this.scene.add.image(eggSprite.x, eggSprite.y, 'egg');
        this.scene.cameras.main.shake(200, 0.01);

        this.scene.tweens.add({
          targets: eggDestoyedAnimation,
          alpha: 0,
          scale: 3.5,
          duration: 300,
          onComplete: () => eggDestoyedAnimation.destroy(),
        });

        this.scene.events.emit('egg-hit');

        eggSprite.destroy();
      }
    )

  }

  // Creates a new egg at a random position on the screen
  createEggs()
  {
    // Randomly choose a border to spawn the egg
    const border = Phaser.Math.Between(0, 3); // 0: top, 1: right, 2: bottom, 3: left
    let egg: Egg | null = null;
    let x = 0, y = 0;

    switch (border)
    {
      case 0: // Top
        x = Phaser.Math.Between(0, GAME_WIDTH);
        y = 0;
        break;
      case 1: // Right
        x = GAME_WIDTH;
        y = Phaser.Math.Between(0, GAME_HEIGHT);
        break;
      case 2: // Bottom
        x = Phaser.Math.Between(0, GAME_WIDTH);
        y = GAME_HEIGHT;
        break;
      case 3: // Left
        x = 0;
        y = Phaser.Math.Between(0, GAME_HEIGHT);
        break;
    }

    // create the egg
    if (this.eggGroup)
    {
      egg = this.eggGroup.get(x, y, 'egg') as Egg;
      if (egg)
      {
        egg.setActive(true);
        egg.setVisible(true);
        this.flyAround(egg);
      }
    }

    // add rotation, purely aesthetic
    const angularSpeed = Phaser.Math.Between(0, 1) === 0
      ? Phaser.Math.Between(-350, -180)
      : Phaser.Math.Between(180, 350);
    if (egg) egg.setAngularVelocity(angularSpeed);

    egg?.setScale(2);
  }

  // Moves the egg to a random position on the screen and destroys it after the animation
  private flyAround(egg: Phaser.GameObjects.Sprite)
  {
    const targetX = Phaser.Math.Between(0, GAME_WIDTH);
    const targetY = Phaser.Math.Between(0, GAME_HEIGHT);

    this.scene.tweens.add({
      targets: egg,
      x: targetX,
      y: targetY,
      duration: Phaser.Math.Between(1000, 3000),
      onComplete: () =>
      {
        egg.destroy();
      }
    });
  }

  // Updates the egg manager, checking if it's time to create a new egg
  update(time: number, delta: number): void
  {
    if (this.eggGroup && this.eggGroup.getLength() < this.eggLimit && time > this.nextEggTime)
    {
      this.createEggs();
      this.nextEggTime = time + Phaser.Math.Between(300, 900); // Random delay between egg spawns
    }
  }
}