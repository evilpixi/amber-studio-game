import Phaser from 'phaser';

export default class Milk extends Phaser.Physics.Arcade.Sprite
{
  private gallons: number = 10;
  private aliveTime: number = 9000;
  private maxTimeAlive: number = this.aliveTime;
  private status: number = 2;

  constructor(scene: Phaser.Scene, x: number, y: number)
  {
    super(scene, x, y, 'milk', 2);
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  initalize()
  {
    this.setScale(2);
    this.setAlpha(1);
    this.setFrame(2);
    this.gallons = 10;
    this.aliveTime = this.maxTimeAlive;
  }

  update(time: number, delta: number): void
  {
    this.aliveTime -= delta;

    if (this.aliveTime <= 6000 && this.status === 2)
    {
      this.gallons -= 3;
      this.setFrame(1);
      this.alpha = 0.6;
      this.status = 1;
    }

    if (this.aliveTime <= 3000 && this.status === 1)
    {
      this.gallons -= 3;
      this.setFrame(0);
      this.alpha = 0.3;
      this.status = 0;
    }
    if (this.aliveTime <= 0 && this.status === 0)
    {
      this.destroy();
    }
  }

  getGallons(): number
  {
    return this.gallons;
  }
}