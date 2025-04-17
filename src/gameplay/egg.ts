import Phaser from 'phaser';

export default class Egg extends Phaser.Physics.Arcade.Sprite
{
  constructor(scene: Phaser.Scene, x: number, y: number)
  {
    super(scene, x, y, 'egg');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCircle(this.width / 2, 0, 0);

    const angularSpeed = Phaser.Math.Between(0, 1) === 0
      ? Phaser.Math.Between(-350, -180)
      : Phaser.Math.Between(180, 350);
    this.setAngularVelocity(angularSpeed);
  }

  public moveTo(x: number, y: number, duration: number): void
  {
    this.scene.tweens.add({
      targets: this,
      x: x,
      y: y,
      duration: duration,
      ease: 'Quad',
      onComplete: () =>
      {
        this.setActive(false)
        this.setVisible(false);
      }
    });
  }
}