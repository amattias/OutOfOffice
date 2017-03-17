var speakTimer = 0;

var Enemy = function(game, blockedLayer, groundFriction, airFriction, speed, maxSpeed, posX, posY, player){

    var that = this;

    that.moveRight = false;
    var spriteSize = {w: 40 , h: 60, x: 22, y: 0 };

    var movingEntity = new MovingEntity(game, speed, 'enemy', posX, posY, 
                        spriteSize, 2500, 400, false, blockedLayer, 0.5);

    var animateEntity = new AnimateEntity(movingEntity, 9, 3, 7,
                                {runRight: [0, 1, 2], runLeft: [4, 5, 6], jumpRight: [5], jumpLeft: [6]});

    var dialogHelper = new DialogHelper(movingEntity, game);

    function onCollision(enemy, obj) {
        speak("Hey watch out,\nmister!");
    }

    function speak(phraseId){
        if(game.time.now > speakTimer){
            dialogHelper.entitySpeak(phraseId); 
            speakTimer = game.time.now + 2000;
        }
    }

    return {
        update: function() {

            if(that.moveRight){
                movingEntity.moveRight();
            }else {
                movingEntity.moveLeft();
            }
            game.physics.arcade.collide(movingEntity.sprite(), player.sprite(), onCollision);
            movingEntity.update();

            //Cap to maxspeed
            if(Math.abs(movingEntity.sprite().body.velocity.x) > maxSpeed){
                movingEntity.sprite().body.velocity.x = maxSpeed * Math.sign(movingEntity.sprite().body.velocity.x);
            }

            animateEntity.animate();

            dialogHelper.update();

            if(!movingEntity.isMoving()){
                that.moveRight = !that.moveRight;
            }
        }
    };
}