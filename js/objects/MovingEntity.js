var MovingEntity = function(game, entityAcceleration, spriteKey, posX, posY, spriteSize, 
                            entityGravity, jumpSpeed, entityFacingRight, blockedLayer, inAirEntityFactor){

    var that = this;
    that.entitySprite = game.add.sprite(posX, posY, spriteKey);
    that.entityMoving = false; 

    game.physics.enable(that.entitySprite, Phaser.Physics.ARCADE);

    that.entitySprite.body.setSize(spriteSize.w, spriteSize.h, spriteSize.x, spriteSize.y);
    that.entitySprite.body.collideWorldBounds = true;

    that.entitySprite.body.gravity.y = entityGravity;
    
    return {
        isMoving: function() {
            return that.entityMoving;
        },
        isFacingRight: function() {
            return entityFacingRight;
        },
        sprite: function() {
            return that.entitySprite;
        },
        moveLeft: function(){
           if(that.entitySprite.body.onFloor()){
             that.entitySprite.body.velocity.x -= entityAcceleration;
           }
           else {
             that.entitySprite.body.velocity.x -= (entityAcceleration * inAirEntityFactor)
           }

           entityFacingRight = false;
        },
        moveRight: function(){
            if(that.entitySprite.body.onFloor()){
                that.entitySprite.body.velocity.x += entityAcceleration;
            }
            else {
               that.entitySprite.body.velocity.x += (entityAcceleration * inAirEntityFactor);
            }
           entityFacingRight = true;
        },
        tryJump: function() {
            if( that.entitySprite.body.onFloor()){
                that.entitySprite.body.velocity.y = -jumpSpeed;
            }
        },
        update: function(onCollision) {
            if(typeof onCollision !== "undefined"){
                game.physics.arcade.collide(that.entitySprite, blockedLayer, onCollision);
            }
            else {
                game.physics.arcade.collide(that.entitySprite, blockedLayer);
            }

            if(that.entitySprite.body.velocity.x <= 10 && that.entitySprite.body.velocity.x >= -10){
                that.entitySprite.body.velocity.x = 0;

                that.entityMoving = false;
            }
            else {
                that.entityMoving = true;
            }
        }
    };
}