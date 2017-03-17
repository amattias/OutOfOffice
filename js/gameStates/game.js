var game = new Phaser.Game(1920, 1200, Phaser.AUTO, 'gameDiv', bootState, true, false);

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);

