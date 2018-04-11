var loadState = {

	preload: function() {
        
		var loadingLabel = game.add.text(80, 150, 'loading...',
            { font: '30px Courier', fill: '#ffffff' });

        for(var x =0; x<gridsize;x++)
        {
            for(var y =0; y<gridsize;y++)
            {
            	  game.load.image('i' + x + 'x' + y, 'assets/i' + gridsize + '/i' + x + 'x' + y + '.png');

            }

        }
    },

    create: function() {

        game.state.start('menu');
    }

}