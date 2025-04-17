import Phaser from 'phaser';
const SPEED = 200;

export default class Character extends Phaser.Physics.Arcade.Sprite
{
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  private direction: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0);
  private lastDirection: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 1); // Default facing down
  private isMoving: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
  {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.direction = new Phaser.Math.Vector2(0, 0);

    this.setCollideWorldBounds(true);
    this.name = 'player';
  }

  setDirection(x: number = 0, y: number = 0): void
  {
    this.direction?.set(x, y);
    if (x !== 0 || y !== 0)
    {
      this.lastDirection.set(x, y);
    }
  }

  setIsMoving(isMoving: boolean): void
  {
    this.isMoving = isMoving;
  }

  protected preUpdate(time: number, delta: number): void
  {
    super.preUpdate(time, delta);

    if (!this.direction) return;
    if (this.isMoving)
    {
      // Normalize the direction vector to ensure consistent speed
      const normalizedDirection = this.direction.clone().normalize();
      this.setVelocity(normalizedDirection.x * SPEED, normalizedDirection.y * SPEED);

      if (this.direction.x < 0)
      {
        this.anims.play('player-walk-left', true);
      } else if (this.direction.x > 0)
      {
        this.anims.play('player-walk-right', true);
      } else if (this.direction.y < 0)
      {
        this.anims.play('player-walk-up', true);
      } else if (this.direction.y > 0)
      {
        this.anims.play('player-walk-down', true);
      }
    }
    else
    {
      this.setVelocity(0, 0);

      // Play idle animation based on the last direction
      if (this.lastDirection.x < 0)
      {
        this.anims.play('player-idle-left', true);
      } else if (this.lastDirection.x > 0)
      {
        this.anims.play('player-idle-right', true);
      } else if (this.lastDirection.y < 0)
      {
        this.anims.play('player-idle-up', true);
      } else if (this.lastDirection.y > 0)
      {
        this.anims.play('player-idle-down', true);
      }
    }
  }
}
