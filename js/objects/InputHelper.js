var keyboard;
var pad1;

var InputHelper = function(game, player){

    keyboard = game.input.keyboard;

    var cursorKeys = game.input.keyboard.createCursorKeys();

    game.input.gamepad.start();

     // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
    pad1 = game.input.gamepad.pad1;

    return {
        update: function() {
            if(keyboard.isDown(Phaser.Keyboard.A) || cursorKeys.left.isDown ||
                pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1){

                player.moveLeft();
            }
            else if(keyboard.isDown(Phaser.Keyboard.D) || cursorKeys.right.isDown ||
                pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {

                player.moveRight();
            }
            
            if(keyboard.isDown(Phaser.Keyboard.SPACEBAR) || pad1.isDown(Phaser.Gamepad.XBOX360_A)){
                player.tryJump();
            } 

            if(keyboard.isDown(Phaser.Keyboard.S)){
                player.speak(1);
            }
        }
    };
}