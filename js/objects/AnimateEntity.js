
var AnimateEntity = function(entity, animationSpeed, facingRightFrameId, facingLeftFrameId, animationFrames) {

    entity.sprite().animations.add('runRight', animationFrames.runRight);
    entity.sprite().animations.add('runLeft', animationFrames.runLeft);
    entity.sprite().animations.add('jumpRight', animationFrames.jumpRight);
    entity.sprite().animations.add('jumpLeft', animationFrames.jumpLeft);

    return {
        animate: function() {
            if(!entity.isMoving()) {
                entity.sprite().animations.stop();

                if(entity.isFacingRight()){
                    entity.sprite().frame = facingRightFrameId;
                }
                else {
                    entity.sprite().frame = facingLeftFrameId;
                }
            }else {
                if(entity.sprite().body.onFloor()){
                        if(entity.isFacingRight()){
                            entity.sprite().animations.play('runRight', animationSpeed, true);
                        }
                        else{
                            entity.sprite().animations.play('runLeft', animationSpeed, true);
                        }
                }
                else {
                        if(entity.isFacingRight()){
                            entity.sprite().animations.play('jumpRight', animationSpeed, true);
                        }
                        else{
                            entity.sprite().animations.play('jumpLeft', animationSpeed, true);
                        }
                }
            }
        }
    };
}