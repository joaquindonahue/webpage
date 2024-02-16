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


var handImage = new Image();
Image.src = "C:\Users\quiqu\Desktop\Website\resources\Dev4\pinch.png";

var hand = PS.spriteImage(handImage);
//var hand = PS.spriteSolid(2,1);
var handX = 0;
var handY = 0;
var ENTITIES = 0;
var ALIENS = 0;
var BOMBS = 0;
var SHIPS = 0;
var STILLTOUCHING = 0;
var COUNTER = 0;


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
	
	
	setInterval(PS.newEntity, 1500);
	setInterval(PS.moveAliens, 1000);
	setInterval(PS.moveBombs, 500);
	setInterval(PS.moveShips, 500);

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
	if((x - 1) != -1){
		if(PS.glyph(x - 1, y) != ""){	
			if(PS.data(x - 1, y) == "ALIEN"){
				PS.glyph(x - 1, y, "");
				PS.data(x - 1, y, 0);
				COUNTER--;
				PS.statusText(COUNTER + " to until level!");
				ENTITIES--;
				ALIENS--;
			}
			else if(PS.data(x - 1, y) == "SHIP"){
				PS.glyph(x - 1, y, "");
				PS.data(x - 1, y, 0);
				COUNTER = COUNTER - 3;
				PS.statusText(COUNTER + " to until level!");
				ENTITIES--;
				SHIPS--;
			}
			else if(PS.data(x - 1, y) == "BOMB"){
				//PS.reset();
				PS.glyph(x - 1, y, "");
				PS.data(x - 1, y, 0);
				ENTITIES--;
				BOMBS--;
			}
		}
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

	handX = x;
	handY = y;

	if(x < 1){
		handX = 1;
	}
	
	PS.spriteMove(hand, handX - 1, handY);

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
			else if (randomEntity <= 18 && BOMBS < 8) {
				PS.glyph(randomX, randomY, 128163);
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
					PS.glyph(i + 1, j, 128163);
					PS.data(i + 1, j, "BOMB");
				}
				else if(randomizer == 2 && i != 0 && PS.glyph(i - 1, j) == ""){
					PS.glyph(i, j, "");
					PS.data(i, j, 0);
					PS.glyph(i - 1, j, 128163);
					PS.data(i - 1, j, "BOMB");
				}
				else if(randomizer == 3 && j != 24 && PS.glyph(i, j + 1) == ""){
					PS.glyph(i, j, "");
					PS.data(i, j, 0);
					PS.glyph(i, j + 1, 128163);
					PS.data(i, j + 1, "BOMB");
				}
				else if(randomizer == 4 && j != 0 && PS.glyph(i, j - 1) == ""){
					PS.glyph(i, j, "");
					PS.data(i, j, 0);
					PS.glyph(i, j - 1, 128163);
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