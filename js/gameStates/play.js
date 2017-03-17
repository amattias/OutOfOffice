var groundFriction = 30;
var airFriction = 5;
var worldGravity = 2500;

var bg, text;

var playState = {
   create: function(){
       game.physics.arcade.TILE_BIAS = 100;
       game.stage.backgroundColor = "#4488AA";

       var bmd = game.add.bitmapData(128,128);

       // draw to the canvas context like normal
       bmd.ctx.beginPath();
       bmd.ctx.rect(0,0,1024,768);
       bmd.ctx.fillStyle = '#99e6ff';
       bmd.ctx.fill();

       bg = game.add.tileSprite(0, 0, 1920, 1200, bmd);
       bg.fixedToCamera = true;

       this.map = game.add.tilemap('level1');

       this.map.addTilesetImage('tiles');
       this.map.setCollisionByExclusion([ 0 ]);

        //create layer
       this.blockedLayer = this.map.createLayer('blockedLayer');

       this.blockedLayer.resizeWorld();

       this.enemies = [];

       this.player = new Player(game, this.blockedLayer, groundFriction, airFriction);

       for (var i = 0; i < 5; i++)
       {
           this.enemies.push(new Enemy(game, this.blockedLayer, groundFriction, airFriction,  30, 120, (500 + (500 * i)), 300, this.player));
       }

       this.inputHelper = InputHelper(game, this.player);

       game.physics.arcade.gravity.y =  worldGravity;
   },
   update: function(){
       this.player.update();

       for(var i = 0; i < this.enemies.length; i++){
           this.enemies[i].update();
       }

       this.inputHelper.update();

   },
   Win: function(){
       game.state.start('win')
   }
};