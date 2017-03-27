//Plays the intro and show menu
var menuState = {
    create: function() {

       this.introScreen = game.add.sprite(game.world.centerX - 286, game.world.centerY - 203, 'intro_screen');

       this.walkAnimation = this.introScreen.animations.add('walk', [3,4,5,6], 3);
       this.walkToDeskAnimation = this.introScreen.animations.add('walkToDesk', [7,8,9,10,11,12], 4);

       this.walkToDeskAnimation.onComplete.add(function () {	
           this.mainTitleLabel.visible = true;
           this.startLabel.visible = true;
       }, this);

       this.mainTitleLabel = game.add.text(game.world.centerX, game.world.centerY - 270, 'Out of office',  { font: '30px carrier_command', fill: 'white'});
       this.mainTitleLabel.anchor.x = 0.5;

       this.startLabel = game.add.text(game.world.centerX, game.world.centerY + 230, 'Press SPACE to start',  { font: '30px carrier_command', fill: 'white'});
       this.startLabel.anchor.x = 0.5;

       var wkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

       wkey.onDown.addOnce(this.start, this);

       this.introAnimationLogic();
    },
    introAnimationLogic: function() {

        var that = this;

       //Start intro
       that.mainTitleLabel.visible = false;
       that.startLabel.visible = false;
       that.introScreen.frame = 0;

       function openDoor() {
           that.introScreen.frame = 1;
           game.time.events.add(1000, walk);
       }

       function walk() {
            that.walkAnimation.play();
           game.time.events.add(1000, walkToDesk);
       }

       function walkToDesk() {
            that.walkToDeskAnimation.play();
       }

       game.time.events.add(1000, openDoor);
    },
    start: function() {
        game.state.start('play');
    }
};