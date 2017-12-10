'use strict';
/** Imports */
import State from './state';

// The main state of the game
export default class MainState extends State {
  sky: Phaser.Sprite; // Reference to background sprite

  player : any;

  stars : any;

  cursors : Phaser.CursorKeys;

  platforms: Phaser.Group; // Reference to the group of platform's sprites

  create(): void {

    // Phaser supports some physical engines (p2, box2d, ninja and arcate).
    // For our game, we don't need a strong physical simulation, so we'll choose
    // `arcade` model.
    this.game.physics.startSystem(Phaser.Physics.ARCADE);



    // Add a simple background
    this.sky = this.game.add.sprite(0, 0, 'sky');


    // Also we create a group for platforms
    this.platforms = this.game.add.group();

    // and enable physics for any object that is created in this group
    this.platforms.enableBody = true;


    // Create the ground
    const ground = this.platforms.create(
      0,
      this.game.world.height - 64,
      'platform'
    );

    // and scale it to fit the width of the game (the original sprite
    // size - 400x32, width of the game - 800)
    ground.scale.setTo(2, 2);

    // And make it immovable (Otherwise it will fall when we jump on it).
    ground.body.immovable = true;

    // Also add two ledges
    const ledge1 = this.platforms.create(400, 400, 'platform');
    ledge1.body.immovable = true;

    const ledge2 = this.platforms.create(-150, 250, 'platform');
    ledge2.body.immovable = true;

    // The this.player and its settings
    this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
    
        //  We need to enable physics on the this.player
        this.game.physics.arcade.enable(this.player);
    
        //  this.player physics properties. Give the little guy a slight bounce.
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
    
        //  Our two animations, walking left and right.
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    
        //  Finally some this.stars to collect
        this.stars = this.game.add.group();
    
        //  We will enable physics for any star that is created in this group
        this.stars.enableBody = true;
    
        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++)
        {
            //  Create a star inside of the 'this.stars' group
            var star = this.stars.create(i * 70, 0, 'star');
    
            //  Let gravity do its thing
            star.body.gravity.y = 300;
    
            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

        //  Our controls.
    this.cursors = this.game.input.keyboard.createCursorKeys();

  }

  update() : void {
    

//  Collide the this.player and the this.stars with the this.platforms
this.game.physics.arcade.collide(this.player, this.platforms);
this.game.physics.arcade.collide(this.stars, this.platforms);

//  Checks to see if the this.player overlaps with any of the this.stars, if he does call the collectStar function
this.game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

//  Reset the this.players velocity (movement)
this.player.body.velocity.x = 0;

if (this.cursors.left.isDown)
{
    //  Move to the left
    this.player.body.velocity.x = -150;

    this.player.animations.play('left');
}
else if (this.cursors.right.isDown)
{
    //  Move to the right
    this.player.body.velocity.x = 150;

    this.player.animations.play('right');
}
else
{
    //  Stand still
    this.player.animations.stop();

    this.player.frame = 4;
}

//  Allow the this.player to jump if they are touching the ground.
if (this.cursors.up.isDown && this.player.body.touching.down)
{
    this.player.body.velocity.y = -350;
}
}

collectStar (player, star) {
  
  // Removes the star from the screen
  star.kill();
 
}

}
