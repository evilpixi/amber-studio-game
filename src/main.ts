import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, IS_LANDSCAPE } from './consts';
import PreloadScene from './scenes/preload-scene';
import MainMenuScene from './scenes/main-menu-scene';
import GameScene from './scenes/game-scene';
import UIScene from './scenes/ui-scene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'game-container'
  },
  scene: [
    PreloadScene,
    MainMenuScene,
    GameScene,
    UIScene
  ],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
};

export default new Phaser.Game(config)