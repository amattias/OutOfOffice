var loadState = {

    preload: function() {
        
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh();

        var loadingLabel = game.add.text(80, 150, 'loading...', 
                                            { font: '30px carrier_command', fill: 'white'});

        game.load.spritesheet('player', 'assets/dudeTileMap.png', 80, 160, 12);
        game.load.spritesheet('enemy', 'assets/monsterTileMap.png', 80, 80, 10);
        game.load.spritesheet('intro_screen', 'assets/intro_screen.png', 574, 406, 13);

        game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/tiles.png');
        game.load.bitmapFont('carrier_command', 'assets/carrier_command.png', 'assets/carrier_command.xml');
    },

    create: function() {
        game.state.start('menu');
    }
};