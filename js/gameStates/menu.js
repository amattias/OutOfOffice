var menuState = {
    create: function() {

       var startLabel = game.add.text(80, 100, 'A day at the office',  { font: '30px carrier_command', fill: 'white'});

       var startLabel = game.add.text(80, 230, 'Press SPACE to start',  { font: '30px carrier_command', fill: 'white'});

        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // wkey.onDown.addOnce(this.start, this);
        this.start();
    },
    start: function() {
        game.state.start('play');
    }
};