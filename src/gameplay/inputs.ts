import Phaser from 'phaser';
import Character from './character';

export default class InputSystem
{
  private scene: Phaser.Scene;
  private character: Character;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys: { [key: string]: Phaser.Input.Keyboard.Key };

  constructor(scene: Phaser.Scene, character: Character)
  {
    this.scene = scene;
    this.character = character;

    if (!scene.input.keyboard)
    {
      throw new Error('NO Keyboard!!!');
    }

    this.keys = {
      W: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
  }

  update(time: number, delta: number): void
  {
    let velocityX = 0;
    let velocityY = 0;


    if (this.keys.W.isDown) velocityY = -1;
    if (this.keys.S.isDown) velocityY = 1;
    if (this.keys.A.isDown) velocityX = -1;
    if (this.keys.D.isDown) velocityX = 1;

    if (velocityX === 0 && velocityY === 0)
    {
      this.character.setIsMoving(false);
      return;
    }
    this.character.setDirection(velocityX, velocityY);
    this.character.setIsMoving(true);
  }
}