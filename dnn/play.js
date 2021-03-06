var playState = {

	
    render: function() {

   

    },

    preload: function() {

	},
    

    imageclicked: function(sprite, pointer)
    {

        var canmove = [];
       
        // check if can move right
        if(sprite.x + tilesize == blankx && sprite.y == blanky)
            canmove.push({tile: sprite, direction: 'right'});
        // check if can move left
        if(sprite.x - tilesize == blankx && sprite.y == blanky)
            canmove.push({tile: sprite, direction: 'left'});
        // check if can move up
        if(sprite.y - tilesize == blanky && sprite.x == blankx)
            canmove.push({tile: sprite, direction: 'up'});
        // check if can move down
        if(sprite.y + tilesize == blanky && sprite.x == blankx)
            canmove.push({tile: sprite, direction: 'down'});

        if (canmove.length == 1)
        {
            playState.movetile(canmove[0], false);

            if (this.checkwin())
            {
                playState.movetile({tile: original[gridsize * gridsize - 1].tile, direction: ''}, false);

                //  so we won :o)
                
               
               postback('win');
        
               
            }
        }
    },

    checkwin: function(){

        for(var i = 0; i < original.length - 1; i++)
        {

            if (original[i].tile.x != original[i].x || original[i].tile.y != original[i].y )
                return false;
        }
        return true;
    },

    create: function() {

       

       
        tiles = game.add.group();
        tiles.enableBody = true;  
        // load up all the tiles

        for(var x =0; x<gridsize;x++)
        {
            for(var y =0; y<gridsize;y++)
            {
                // game.add.sprite(224 + x * 88, 124 + y * 88, 'i' + x + 'x' + y);
                var image = game.add.sprite(0, 0, 'i' + x + 'x' + y); 
                tilesize = image.width;
                image.x = ((game.world.width - (gridsize * tilesize)) / 2) + (x * tilesize);
                image.y = ((game.world.height - (gridsize * tilesize)) / 2) + (y * tilesize);
                image.inputEnabled=true;
                image.events.onInputDown.add(this.imageclicked,this);
                // tiles.create(224 + x * 88, 124 + y * 88, 'i' + x + 'x' + y);
                tiles.add(image);

                original.push({tile: image, x: image.x, y: image.y});

            }
        }  


      //  scramble
      
      
            blankx = tiles.children[gridsize * gridsize - 1].x;
            blanky = tiles.children[gridsize * gridsize - 1].y;


            tiles.children[gridsize * gridsize - 1].x = 700;
            tiles.children[gridsize * gridsize - 1].y = 124;

            
           
           for(var randmoves = 0; randmoves < 1000; randmoves++){

                //  get a list of tles that can move
                var canmove = [];
               
                for (var i = 0, len = tiles.children.length; i < len; i++) {  
                    
                    target = tiles.children[i];
                
                    
                    // check if can move right
                    if(target.x + tilesize == blankx && target.y == blanky)
                        canmove.push({tile: target, direction: 'right'});
                    // check if can move left
                    if(target.x - tilesize == blankx && target.y == blanky)
                        canmove.push({tile: target, direction: 'left'});
                    // check if can move up
                    if(target.y - tilesize == blanky && target.x == blankx)
                        canmove.push({tile: target, direction: 'up'});
                    // check if can move down
                    if(target.y + tilesize == blanky && target.x == blankx)
                        canmove.push({tile: target, direction: 'down'});
                }

                var indextomove = Math.floor(Math.random() * canmove.length);
                playState.movetile(canmove[indextomove], true);
               
            }

    },

   movetile: function(t, scrambling) {

        //  scrambing not used for now.  intended to supress any animation if in scramble mode

        var target = t.tile;
        var direction = t.direction;
        
        var tempx = blankx;
        var tempy = blanky;
        blankx = target.x;
        blanky = target.y

        target.x = tempx;
        target.y = tempy;
     
    },


	update: function() {

	}
}

 