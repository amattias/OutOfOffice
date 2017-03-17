var winState = {
    create: function() {

        var nameLabel = game.add.text(80, 80, 'You won', { fill: 'white' });

        var startLabel = game.add.text(80, game.world.height - 80, 'Press "W" key to restart', {fill: 'white'});

        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);

        wkey.onDown.addOnce(this.restart, this);
    },
    restart: function() {
        game.state.start('play');
    }
};