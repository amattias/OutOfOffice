var level1Dialog = "What is this place?";

var dialogBoxGfx;

var DialogHelper = function(entity, game){

    var that = this;
    var graphics = game.add.graphics(game.world.centerX, game.world.centerY);

    that.destroyDialogTimer = {};
    that.dialogText;
    that.phraseToSpeak = "";
    that.letterId = -1;
    that.hasDialogToPrint = false;
    that.letterSpeed = 50;
    that.letterTimer = 0;

    function resetDialogBox(){
        that.dialogText.text = "";
        that.phraseToSpeak = "";
        graphics.destroy();
        that.letterId = -1;
    }

    function drawDialogBoxRect(){
        graphics.destroy();
        graphics = game.add.graphics(entity.sprite().x + 25, entity.sprite().y - 125);
        graphics.beginFill(0x000000, 1);

        var rows = that.phraseToSpeak.split('\n');
        var boxHeight = (38 * (rows.length)) + 15;
        var boxWidth = (25 * GetLongestRow(rows)) + 20;

        graphics.drawRoundedRect(0, 0, boxWidth, boxHeight, 9);

        graphics.lineStyle(2, 0x000000);
        graphics.moveTo(50, boxHeight);
        graphics.lineTo(entity.sprite().width / 2, boxHeight + 25);
        graphics.lineTo(entity.sprite().width / 2 + 2 ,boxHeight + 25);
        graphics.lineTo(75, boxHeight);
    }

    function GetLongestRow(rows){
        var maxLetters = 0;

        for(var i = 0; i < rows.length; i++){
            if(rows[i].length > maxLetters){
                maxLetters = rows[i].length;
            }
        }

        return maxLetters;
    } 

    return {
        entitySpeak: function(phrase) {
           game.time.events.remove(that.destroyDialogTimer); //Cancel any existing dialogs

           if((typeof that.dialogText !== "undefined") && (typeof graphics !== "undefined")){
             that.dialogText.destroy();
             graphics.destroy();
           }

           that.phraseToSpeak = phrase;
           that.letterId = 0; 
           that.hasDialogToPrint = true;

           drawDialogBoxRect();
           that.dialogText = game.add.bitmapText(entity.sprite().x + 50, entity.sprite().y - 130, 'carrier_command','',18);           
           that.letterTimer = game.time.now;
        },
        update: function(){

           if((typeof that.dialogText !== "undefined") && (typeof graphics !== "undefined")){
                that.dialogText.x = entity.sprite().x + 50;
                that.dialogText.y = entity.sprite().y - 110;
                graphics.x = entity.sprite().x + 25;
                graphics.y = entity.sprite().y -125;
           }

           if(that.hasDialogToPrint) {
               if((that.letterId < that.phraseToSpeak.length) && (that.letterTimer < game.time.now)){

                    var res = that.phraseToSpeak.substr(0, that.letterId + 1);

                    that.dialogText.text = res;

                    that.letterId += 1; 
                    that.letterTimer = game.time.now + that.letterSpeed;
               }else if(that.letterId >= that.phraseToSpeak.length) {
                   that.destroyDialogTimer = game.time.events.add(Phaser.Timer.SECOND * 2, resetDialogBox);
                   that.hasDialogToPrint = false;
               }
            }         
        }
    }
};