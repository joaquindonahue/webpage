/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)

Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
This version of Perlenspiel (3.3.x) is hosted at <https://ps3.perlenspiel.net>
Perlenspiel is Copyright © 2009-22 Brian Moriarty.
This file is part of the standard Perlenspiel 3.3.x devkit distribution.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with the Perlenspiel devkit. If not, see <http://www.gnu.org/licenses/>.
*/

/*
This JavaScript file is a template for creating new Perlenspiel 3.3.x games.
Any unused event-handling function templates can be safely deleted.
Refer to the tutorials and documentation at <https://ps3.perlenspiel.net> for details.
*/

/*
The following comment lines are for JSHint <https://jshint.com>, a tool for monitoring code quality.
You may find them useful if your development environment is configured to support JSHint.
If you don't use JSHint (or are using it with a configuration file), you can safely delete these two lines.
*/

/* jshint browser : true, devel : true, esversion : 6, freeze : true */
/* globals PS : true */

"use strict"; // Do NOT remove this directive!

var LEVEL = 1;
var ENTITIES = 0;
var ALIENS = 0;
var BOMBS = 0;
var SHIPS = 0;

var COUNTER = 10;
var TOUCHX;
var TOUCHY;
var MOUSEX;
var MOUSEY;

var STARTORSTOP = 0;
var ENTITY_TIMER;
var ALIENS_TIMER;
var SHIPS_TIMER;
var BOMBS_TIMER;

var lHandX;
var lHandY;
var rHandX;
var rHandY;
var HANDS_EVADED;

var START_TIMER;
var STARTED_SPAWN;

var BEEP_COUNTER = 1;
var STARTED_BEEPS;


/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.init = function( system, options ) {

	// Uncomment the following code line
	// to verify operation:

	// PS.debug( "PS.init() called\n" );

	// This function should normally begin
	// with a call to PS.gridSize( x, y )
	// where x and y are the desired initial
	// dimensions of the grid.
	// Call PS.gridSize() FIRST to avoid problems!
	// The sample call below sets the grid to the
	// default dimensions (8 x 8).
	// Uncomment the following code line and change
	// the x and y parameters as needed.

	PS.gridSize(25, 25);
	PS.border(PS.ALL, PS.ALL, 0);
	PS.gridColor(31, 27, 36);
	PS.color(PS.ALL, PS.ALL, 31, 27, 36);
	PS.statusColor(PS.COLOR_WHITE);
	PS.levelTimers();

	// This is also a good place to display
	// your game title or a welcome message
	// in the status line above the grid.
	// Uncomment the following code line and
	// change the string parameter as needed.

	PS.statusText(COUNTER + " until next level!");

	// Add any other initialization code you need here.
};

/*
PS.touch ( x, y, data, options )
Called when the left mouse button is clicked over bead(x, y), or when bead(x, y) is touched.
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/


PS.touch = function( x, y, data, options ) {
	if(PS.data(x, y) != "LAVA"){
		PS.color(x, y, 250, 222, 80);	
		TOUCHX = x;
		TOUCHY = y;
	}	
	if(PS.glyph(x , y) != ""){	
		if(PS.data(x , y) == "ALIEN"){
			PS.glyph(x, y, "");
			PS.data(x, y, 0);
			PS.audioPlay( "fx_zurp" );
			COUNTER--;
			PS.statusText(COUNTER + " until next level!");
			ENTITIES--;
			ALIENS--;
		}
		else if(PS.data(x, y) == "SHIP"){
			PS.glyph(x, y, "");
			PS.data(x, y, 0);
			PS.audioPlay( "fx_beep");
			COUNTER = COUNTER - 3;
			PS.statusText(COUNTER + " until next level!");
			ENTITIES--;
			SHIPS--;
		}
		else if(PS.data(x, y) == "KEY"){
			PS.glyph(x, y, "");
			PS.data(x, y, 0);
			PS.audioPlay( "fx_coin3");
			PS.openPath();
		}
		else if(PS.data(x, y) == "BOMB"){
			PS.audioPlay("fx_blast4");
			PS.reset();
		}
		else if(PS.data(x, y) == "BOSS"){
			PS.glyph(x, y, "");
			PS.data(x, y, 0);
			PS.audioPlay( "fx_bang");
			COUNTER--;
		}
	}
	if(COUNTER <= 0){
		LEVEL++;
		PS.audioPlay("fx_powerup4");
		PS.reset();
	}
};

/*
PS.release ( x, y, data, options )
Called when the left mouse button is released, or when a touch is lifted, over bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.release = function( x, y, data, options ) {
	if(PS.data(x, y) != "LAVA"){
		PS.color(TOUCHX, TOUCHY, 31, 27, 36);		
	}	
};

/*
PS.enter ( x, y, button, data, options )
Called when the mouse cursor/touch enters bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.enter = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );
	MOUSEX = x;
	MOUSEY = y;

	if(PS.color(x, y) == PS.COLOR_RED){
		PS.audioPlay("fx_shoot7");
		PS.reset();
	}
	else{
		var w = {
			top : 3,
			left : 0,
			bottom : 3,
			right : 3
		}
		
		if(PS.data(x, y) != "BORDER"){
			PS.border(x, y, w);
			PS.borderColor(x, y, 250, 222, 80);
		}
		else if(PS.data(x, y) == "BORDER"){
			PS.color(x, y, 250, 222, 80);
		}
 	}

	// Add code here for when the mouse cursor/touch enters a bead.
};

/*
PS.exit ( x, y, data, options )
Called when the mouse cursor/touch exits bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exit = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:
	if(PS.data(x, y) != "BORDER"){
		PS.border(x, y, 0);
	}
	else if(PS.data(x, y) == "BORDER"){
		PS.color(x, y, 31, 27, 36);
	}
	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead.
};

/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exitGrid = function( options ) {
	// Uncomment the following code line to verify operation:

	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid.
};

/*
PS.keyDown ( key, shift, ctrl, options )
Called when a key on the keyboard is pressed.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.keyDown = function( key, shift, ctrl, options ) {
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is pressed.
};

/*
PS.keyUp ( key, shift, ctrl, options )
Called when a key on the keyboard is released.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.keyUp = function( key, shift, ctrl, options ) {
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is released.
};

/*
PS.input ( sensors, options )
Called when a supported input device event (other than those above) is detected.
This function doesn't have to do anything. Any value returned is ignored.
[sensors : Object] = A JavaScript object with properties indicating sensor status; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: Currently, only mouse wheel events are reported, and only when the mouse cursor is positioned directly over the grid.
*/

PS.input = function( sensors, options ) {
	// Uncomment the following code lines to inspect first parameter:

//	 var device = sensors.wheel; // check for scroll wheel
//
//	 if ( device ) {
//	   PS.debug( "PS.input(): " + device + "\n" );
//	 }

	// Add code here for when an input event is detected.
};

PS.newEntity = function(){
	if(ENTITIES < 20){
		var randomY = (PS.random(25) - 1);
		var randomX = (PS.random(25) - 1);
		var randomEntity = PS.random(20);

		if(PS.glyph(randomX, randomY) == ""){
			if (randomEntity <= 10 && ALIENS < 10) {
				PS.glyph(randomX, randomY, 128125);
				PS.data(randomX, randomY, "ALIEN");
				ALIENS++;
			} 
			else if (randomEntity <= 18 && BOMBS < 8 && LEVEL > 1) {
				PS.glyph(randomX, randomY, 129512);
				PS.data(randomX, randomY, "BOMB");
				BOMBS++;
			} 
			else if(randomEntity != 19 && randomEntity != 20 && ALIENS < 10){
				PS.glyph(randomX, randomY, 128125);
				PS.data(randomX, randomY, "ALIEN");
				ALIENS++;
			}
			else if (SHIPS < 2) {
				PS.glyph(randomX, randomY, 128760);
				PS.data(randomX, randomY, "SHIP");
				SHIPS++;
			}
			ENTITIES++;
		}
	}
}

PS.moveAliens = function(){
	for(var i = 0; i < 25; i++){
		for(var j = 0; j < 25; j++){
			if(PS.data(i, j) == "ALIEN"){
				var randomizer = PS.random(4);
				if(randomizer == 1 && i != 24 && PS.glyph(i + 1, j) == ""){
					PS.glyph(i, j, "");
					PS.data(i, j, 0);
					PS.glyph(i + 1, j, 128125);
					PS.data(i + 1, j, "ALIEN");
				}
				else if(randomizer == 2 && i != 0 && PS.glyph(i - 1, j) == ""){
					PS.glyph(i, j, "");
					PS.data(i, j, 0);
					PS.glyph(i - 1, j, 128125);
					PS.data(i - 1, j, "ALIEN");
				}
				else if(randomizer == 3 && j != 24 && PS.glyph(i, j + 1) == ""){
					PS.glyph(i, j, "");
					PS.data(i, j, 0);
					PS.glyph(i, j + 1, 128125);
					PS.data(i, j + 1, "ALIEN");
				}
				else if(randomizer == 4 && j != 0 && PS.glyph(i, j - 1) == ""){
					PS.glyph(i, j, "");
					PS.data(i, j, 0);
					PS.glyph(i, j - 1, 128125);
					PS.data(i, j - 1, "ALIEN");
				}
			}
		}
	}
}

PS.moveBombs = function(){
	for(var i = 0; i < 25; i++){
		for(var j = 0; j < 25; j++){
			if(PS.data(i, j) == "BOMB"){
				var randomizer = PS.random(4);
				if(randomizer == 1 && i != 24 && PS.glyph(i + 1, j) == ""){
					PS.glyph(i, j, "");
					PS.data(i, j, 0);
					PS.glyph(i + 1, j, 129512);
					PS.data(i + 1, j, "BOMB");
				}
				else if(randomizer == 2 && i != 0 && PS.glyph(i - 1, j) == ""){
					PS.glyph(i, j, "");
					PS.data(i, j, 0);
					PS.glyph(i - 1, j, 129512);
					PS.data(i - 1, j, "BOMB");
				}
				else if(randomizer == 3 && j != 24 && PS.glyph(i, j + 1) == ""){
					PS.glyph(i, j, "");
					PS.data(i, j, 0);
					PS.glyph(i, j + 1, 129512);
					PS.data(i, j + 1, "BOMB");
				}
				else if(randomizer == 4 && j != 0 && PS.glyph(i, j - 1) == ""){
					PS.glyph(i, j, "");
					PS.data(i, j, 0);
					PS.glyph(i, j - 1, 129512);
					PS.data(i, j - 1, "BOMB");
				}
			}
		}
	}
}

PS.moveShips = function(){
	for(var i = 0; i < 25; i++){
		for(var j = 0; j < 25; j++){
			if(PS.data(i, j) == "SHIP"){
				var randomizer = PS.random(4);
				if(randomizer == 1 && i != 24 && PS.glyph(i + 1, j) == ""){
					PS.glyph(i, j, "");
					PS.data(i, j, 0);
					PS.glyph(i + 1, j, 128760);
					PS.data(i + 1, j, "SHIP");
				}
				else if(randomizer == 2 && i != 0 && PS.glyph(i - 1, j) == ""){
					PS.glyph(i, j, "");
					PS.data(i, j, 0);
					PS.glyph(i - 1, j, 128760);
					PS.data(i - 1, j, "SHIP");
				}
				else if(randomizer == 3 && j != 24 && PS.glyph(i, j + 1) == ""){
					PS.glyph(i, j, "");
					PS.data(i, j, 0);
					PS.glyph(i, j + 1, 128760);
					PS.data(i, j + 1, "SHIP");
				}
				else if(randomizer == 4 && j != 0 && PS.glyph(i, j - 1) == ""){
					PS.glyph(i, j, "");
					PS.data(i, j, 0);
					PS.glyph(i, j - 1, 128760);
					PS.data(i, j - 1, "SHIP");
				}
			}
		}
	}
}

PS.reset = function(){
	if(LEVEL == 1){
		COUNTER = 10;
		ENTITIES = 0;
		ALIENS = 0;
		BOMBS = 0;
		SHIPS = 0;
		PS.glyph(PS.ALL, PS.ALL, "");
		PS.data(PS.ALL, PS.ALL, "");
	}
	else if(LEVEL == 2){
		COUNTER = 15;
		PS.statusText(COUNTER + " until next level!");
		ENTITIES = 0;
		ALIENS = 0;
		BOMBS = 0;
		SHIPS = 0;
		PS.glyph(PS.ALL, PS.ALL, "");
		PS.data(PS.ALL, PS.ALL, "");

		PS.color(PS.ALL, PS.ALL, 31, 27, 36);

		var map = [
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
		];
	
		var x, y, data;
	
		 for (y = 0; y < 25; y += 1 ) {
			 for (x = 0; x < 25; x += 1 ) {
				data = map [ ( y * 25) + x ];
				if( data === 1){
					PS.color( x, y, PS.COLOR_RED);
					PS.data( x, y, "LAVA");
				}
			 }
		 }
	}

	else if(LEVEL == 3){
		COUNTER = 15;
		PS.statusText(COUNTER + " until next level!");
		ENTITIES = 0;
		ALIENS = 0;
		BOMBS = 0;
		SHIPS = 0;
		PS.glyph(PS.ALL, PS.ALL, "");
		PS.data(PS.ALL, PS.ALL, "");

		PS.color(PS.ALL, PS.ALL, 31, 27, 36);

		var map = [
			1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
			1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1,
			1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1,
			1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1,
			1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
			1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
			1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
			1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
			1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
			1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
			1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,		
			1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
			1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
			1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
			1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
			1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
			1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 
			1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,  
			1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
			1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
		];
	
		var x, y, data;
	
		 for (y = 0; y < 25; y += 1 ) {
			 for (x = 0; x < 25; x += 1 ) {
				data = map [ ( y * 25) + x ];
				if( data === 1){
					PS.color( x, y, PS.COLOR_RED);
					PS.data( x, y, "LAVA");
				}
			 }
		 }
	}
	else if(LEVEL == 4){
		COUNTER = 5;
		STARTORSTOP++;
		PS.border(PS.ALL, PS.ALL, 0);
		PS.statusText("WAIT FOR AN OPPORTUNITY!");
		ENTITIES = 0;
		ALIENS = 0;
		BOMBS = 0;
		SHIPS = 0;
		HANDS_EVADED = 0;
		BEEP_COUNTER = 1;
		PS.introTimers(1);
		PS.introTimers(3);
		STARTED_BEEPS = 0;
		STARTED_SPAWN = 0;
		PS.glyph(PS.ALL, PS.ALL, "");
		PS.data(PS.ALL, PS.ALL, "");
		PS.levelTimers();
		lHandX = 1;
		lHandY = 1;
		rHandX = 9;
		rHandY = 11;
		PS.introTimers(0);

		PS.color(PS.ALL, PS.ALL, 31, 27, 36);
		PS.glyph(13, 6, 128126);
		PS.glyph(11, 4, 128126);
		PS.glyph(11, 6, 128126);
		PS.glyph(13, 4, 128126);
		PS.glyph(12, 5, 128126);
		PS.data(13, 6, "BOSS");
		PS.data(11, 4, "BOSS");
		PS.data(13, 4, "BOSS");
		PS.data(11, 6, "BOSS");
		PS.data(12, 5, "BOSS");
		PS.glyph(4, 6, 128125);
		PS.glyph(5, 5, 128125);
		PS.glyph(4, 5, 128125);
		PS.glyph(5, 6, 128125);

		var map = [
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,	
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		];
	
		var x, y, data;
	
		 for (y = 0; y < 25; y += 1 ) {
			 for (x = 0; x < 25; x += 1 ) {
				data = map [ ( y * 25) + x ];
				if( data === 1){
					PS.color( x, y, PS.COLOR_RED);
					PS.data( x, y, "LAVA");
				}
			 }
		 }
	}	 
	else if(LEVEL == 5){
		COUNTER = 999;
		PS.statusText("YOU WIN!");
		ENTITIES = 0;
		ALIENS = 0;
		BOMBS = 0;
		SHIPS = 0;
		PS.glyph(PS.ALL, PS.ALL, "");
		PS.data(PS.ALL, PS.ALL, "");
		PS.border(PS.ALL, PS.ALL, 0);
		PS.introTimers(1);
		PS.introTimers(3);
		PS.color(PS.ALL, PS.ALL, 31, 27, 36);

		var map = [
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1,		
			1, 0, 0, 0 ,0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		];
	
		var x, y, data;
	
		 for (y = 0; y < 25; y += 1 ) {
			 for (x = 0; x < 25; x += 1 ) {
				data = map [ ( y * 25) + x ];
				if( data === 1){
					PS.color( x, y, 174, 81, 240);
					PS.data( x, y, "LAVA");
				}
			 }
		 }
	}	 
}

PS.levelTimers = function(){
	if(STARTORSTOP == 0){
		ENTITY_TIMER = PS.timerStart( 115, PS.newEntity );
		ALIENS_TIMER = PS.timerStart( 45, PS.moveAliens );
		SHIPS_TIMER = PS.timerStart( 25, PS.moveShips );
		BOMBS_TIMER = PS.timerStart( 25, PS.moveBombs );
	}
	else if(STARTORSTOP == 1){
		PS.timerStop(ENTITY_TIMER);
		PS.timerStop(ALIENS_TIMER);
		PS.timerStop(BOMBS_TIMER);
		PS.timerStop(SHIPS_TIMER);
	}
}

PS.introTimers = function(StartOrStop){
	if(StartOrStop == 0 && STARTED_SPAWN == 0){
		START_TIMER = PS.timerStart( 30, PS.spawnHand);
		STARTED_SPAWN = 1;
	}
	else if(StartOrStop == 1 && STARTED_SPAWN == 1){
		PS.timerStop(START_TIMER);
		STARTED_SPAWN = 0;
	}
	else if(StartOrStop == 2 && STARTED_SPAWN == 0){
		START_TIMER = PS.timerStart( 30, PS.countCrush);
		STARTED_BEEPS = 1;
	}
	else if(StartOrStop == 3 && STARTED_BEEPS == 1){
		PS.timerStop(START_TIMER);
		STARTED_BEEPS = 0;
	}
}

PS.spawnHand = function(){
	PS.introTimers(1);
	var pinchRight = 0;
	if(HANDS_EVADED >= 1){
		if(HANDS_EVADED <= 3){
			var randomizer = PS.random(2);
		}
		else{
			var randomizer = PS.random(4);
		}

		if(randomizer == 1){
			lHandX = 1;
			lHandY = 12;
			rHandX = 12;
			rHandY = 24;
		}
		else if(randomizer == 2){
			lHandX = 12;
			lHandY = 12;
			rHandX = 24;
			rHandY = 24;
			pinchRight = 1;
		}
		else if(randomizer == 3){
			lHandX = 1;
			lHandY = 12;
			rHandX = 20;
			rHandY = 24;
		}
		else if(randomizer == 4){
			lHandX = 4;
			lHandY = 12;
			rHandX = 24;
			rHandY = 24;
			pinchRight = 1;
		}
	}

	var x, y, w;
	for (y = lHandY; y < rHandY; y += 1 ) {
		for (x = lHandX; x < rHandX; x += 1 ) {
		   if(y == lHandY){
				if(x == lHandX && pinchRight == 0){
					w = {
						top : 15,
						left : 15,
						bottom : 0,
						right : 0
					}
				}
				else if(x == rHandX - 1 && pinchRight == 1){
					w = {
						top : 15,
						left : 0,
						bottom : 0,
						right : 15
					}
				}
				else{
					w = {
						top : 15,
						left : 0,
						bottom : 0,
						right : 0
					}
				}
				PS.data(x, y, "BORDER");
				PS.border(x, y, w);
				PS.borderColor(x, y, 174, 81, 240);
		    }
			else if(y == rHandY - 1){
				if(x == lHandX && pinchRight == 0){
					w = {
						top : 0,
						left : 15,
						bottom : 15,
						right : 0
					}
				}
				else if(x == rHandX - 1 && pinchRight == 1){
					w = {
						top : 0,
						left : 0,
						bottom : 15,
						right : 15
					}
				}
				else{
					w = {
						top : 0,
						left : 0,
						bottom : 15,
						right : 0
					}
				}
				PS.data(x, y, "BORDER");
				PS.border(x, y, w);
				PS.borderColor(x, y, 174, 81, 240);
			}
			else if(x == lHandX && pinchRight == 0){
				w = {
					top : 0,
					left : 15,
					bottom : 0,
					right : 0
				}
				PS.data(x, y, "BORDER");
				PS.border(x, y, w);
				PS.borderColor(x, y, 174, 81, 240);
			}
			else if(x == rHandX - 1 && pinchRight == 1){
				w = {
					top : 0,
					left : 0,
					bottom : 0,
					right : 15
				}
				PS.data(x, y, "BORDER");
				PS.border(x, y, w);
				PS.borderColor(x, y, 174, 81, 240);
			}
		}
	}
	PS.audioPlay("fx_blip");
	PS.introTimers(2);
}

PS.countCrush = function(){

	if(BEEP_COUNTER < 2){
		PS.audioPlay("fx_blip");
	}
	else if(BEEP_COUNTER == 2){
		var x, y;
		PS.audioPlay("fx_squink");
		for (y = lHandY; y < rHandY; y += 1 ) {
			for (x = lHandX; x < rHandX; x += 1 ) {
				PS.color(x, y, 174, 81, 240);
				PS.data(x, y, "CRUSHED");
				if(PS.data(x, y) != "KEY"){
					PS.glyph(x, y, "");
				}
				if(MOUSEX == x && MOUSEY == y){
					PS.audioPlay("fx_shoot7");
					PS.reset();
				}
			}
		}

	}
	else if(BEEP_COUNTER == 3){
		PS.introTimers(3);
		BEEP_COUNTER = 0;
		for (y = lHandY; y < rHandY; y += 1 ) {
			for (x = lHandX; x < rHandX; x += 1 ) {
				if(rHandY != 11){
					PS.color(x, y, 31, 27, 36);
					PS.border(x, y, 0);
					PS.data(x, y, "");
				}
				else{
					PS.color(x, y, PS.COLOR_RED);
					PS.border(x, y, 0);
					PS.data(x, y, "LAVA");
				}
				if(MOUSEX == x && MOUSEY == y){
					PS.audioPlay("fx_shoot7");
					PS.reset();
				}
			}
		}
		if(HANDS_EVADED == 10){
			PS.glyph(12, 18, 128273);
			PS.data(12, 18, "KEY");
		}
		HANDS_EVADED++;
		PS.introTimers(0);
	}
	BEEP_COUNTER++;
}

PS.openPath = function(){
	PS.statusText("CRUSH THEM!");
	PS.color(PS.ALL, PS.ALL, 31, 27, 36);
	var map = [
		1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
		1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1,
		1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1,
		1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
		1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,	
		1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];

	var x, y, data;

	 for (y = 0; y < 25; y += 1 ) {
		 for (x = 0; x < 25; x += 1 ) {
			data = map [ ( y * 25) + x ];
			if( data === 1){
				PS.color( x, y, PS.COLOR_RED);
				PS.data( x, y, "LAVA");
			}
			else if(PS.data(x, y) == "LAVA"){
				PS.data(x, y, "");
			}
		 }
	 }
	 PS.glyph(13, 6, 128126);
	 PS.glyph(11, 4, 128126);
	 PS.glyph(11, 6, 128126);
	 PS.glyph(13, 4, 128126);
	 PS.glyph(12, 5, 128126);
	 PS.data(13, 6, "BOSS");
	 PS.data(11, 4, "BOSS");
	 PS.data(13, 4, "BOSS");
	 PS.data(11, 6, "BOSS");
	 PS.data(12, 5, "BOSS");
}