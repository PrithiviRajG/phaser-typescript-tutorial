'use strict';
/** Imports */
import State from './state';

// The first (boot) state of the game
export default class BootState extends State {
  create(): void {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.state.start('preloader');
  }
}
