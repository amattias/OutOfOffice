var playerAnimationSpeed = 9;
var playerMaxSpeedX = 550;
var playerMaxSpeedY = 1500;
var playerAcceleration = 80;
var jumpSpeed = 1600;

var jumpTimer = 0;
var speakTimer = 0;

var Player = function(game, blockedLayer, groundFriction, airFriction ){

    var that = this;
    that.hasSpoken = false;
    var spriteSize = {w: 40, h: 105, x: 20, y: 20 };

    var movingEntity = new MovingEntity(game, playerAcceleration, 'player', 16, 900, 
                        spriteSize, 2500, jumpSpeed, true, blockedLayer, 0.3);

    var animateEntity = new AnimateEntity(movingEntity, playerAnimationSpeed, 3, 7,
                                {runRight: [0, 1, 2], runLeft: [4, 5, 6], jumpRight: [10, 11], jumpLeft: [8, 9]});

    var dialogHelper = new DialogHelper(movingEntity, game);

    game.camera.follow(movingEntity.sprite());

    return {
        sprite: movingEntity.sprite,
        update: function(){
            movingEntity.update();

            //Add ground and air friction
            if(movingEntity.sprite().body.velocity.x > 0){

                if(movingEntity.sprite().body.onFloor()){
                    movingEntity.sprite().body.velocity.x -= groundFriction;
                }
                else {
                    movingEntity.sprite().body.velocity.x -= airFriction;
                }
            }
            else if(movingEntity.sprite().body.velocity.x < 0){

                if(movingEntity.sprite().body.onFloor()){
                    movingEntity.sprite().body.velocity.x += groundFriction;
                }
                else {
                    movingEntity.sprite().body.velocity.x += airFriction;
                }
            }

            //Cap to maxspeed in x and y direction
            if(Math.abs(movingEntity.sprite().body.velocity.x) > playerMaxSpeedX){
                movingEntity.sprite().body.velocity.x = playerMaxSpeedX * Math.sign(movingEntity.sprite().body.velocity.x);
            }

            if(movingEntity.sprite().body.velocity.y > playerMaxSpeedY){
                movingEntity.sprite().body.velocity.y = playerMaxSpeedY;
            }

            animateEntity.animate();

            dialogHelper.update();
       },
        moveLeft: function(){
            movingEntity.moveLeft();
        },
        moveRight: function(){
            movingEntity.moveRight();
        },
        tryJump: function() {
            if(game.time.now > jumpTimer){
                movingEntity.tryJump();
                jumpTimer = game.time.now + 500;
            }
        },
        speak: function(phraseId){
            if(game.time.now > speakTimer){
                dialogHelper.entitySpeak("What is this\nplace?"); 
                speakTimer = game.time.now + 500;
            }
        }
    };
};