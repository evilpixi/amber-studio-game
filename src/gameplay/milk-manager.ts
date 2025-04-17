import Phaser from 'phaser';
import Character from './character';
import Milk from './milk';

export default class MilkManager
{
  private scene: Phaser.Scene;
  private milkGroup: Phaser.Physics.Arcade.Group;
  private respawnTime: number = 3000;
  private currentRespawnTime: number = 0;
  private maxSize: number = 3;

  constructor(scene: Phaser.Scene, player: Character)
  {
    this.scene = scene;

    // Create a group to store all Milk objects
    this.milkGroup = this.scene.physics.add.group({
      classType: Milk,
      maxSize: this.maxSize
    });

    // ------------------------------------
    // ----------- Collision --------------
    // ------------------------------------
    this.scene.physics.add.overlap(player, this.milkGroup, (player, milk) =>
    {
      const milkSprite = milk as Milk;
      this.scene.events.emit('milk-collected', milkSprite.getGallons());
      milkSprite.destroy();
    });

    this.generateMilk();
  }

  generateMilk(): void
  {
    if (this.milkGroup.getLength() >= this.maxSize) return;
    const milk = this.milkGroup.get();
    if (milk)
    {
      milk.enableBody(true,
        Phaser.Math.Between(100, this.scene.scale.width - 100),
        Phaser.Math.Between(100, this.scene.scale.height - 100),
        true,
        true);
      milk.initalize();
    }
  }

  update(time: number, delta: number): void
  {
    this.currentRespawnTime += delta;
    if (this.currentRespawnTime >= this.respawnTime)
    {
      this.currentRespawnTime -= this.respawnTime;
      this.generateMilk();
    }

    for (const milk of this.milkGroup.getChildren() as Milk[])
    {
      milk.update(time, delta);
    }
  }
}