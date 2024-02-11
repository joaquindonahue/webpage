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

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

var currentPkX = 2;
var currentPkY = 2;
var currentGnX = 18;
var currentGnY = 2;
var currentLvl = 1;
var currentGoalGnX = 13;
var currentGoalGnY = 12;
var currentGoalPkX = 6;
var currentGoalPkY = 16;



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

	PS.statusText("Puzzle Lvl-1");
	PS.gridSize( 21, 22 );
	PS.border (PS.ALL, PS.ALL, 0);

	PS.resetFirst();

	// This is also a good place to display
	// your game title or a welcome message
	// in the status line above the grid.
	// Uncomment the following code line and
	// change the string parameter as needed.

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
	// Uncomment the following code line
	// to inspect x/y parameters:

	// PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );
	if(y == 21 && !(currentLvl == 4))
	{
		PS.resetLvl();
	}
	// Add code here for mouse clicks/touches
	// over a bead.
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
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead.
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

	if(!(((currentGnX == currentGoalGnX) && (currentGnY == currentGoalGnY)) && ((currentPkX == currentGoalPkX) && (currentPkY == currentGoalPkY)))){
			if (key == PS.KEY_ARROW_LEFT)
			{
				if(PS.color(currentPkX - 1, currentPkY) == PS.COLOR_RED || PS.color(currentGnX - 1, currentGnY) == PS.COLOR_RED){
					PS.resetLvl();
				}
				else
				{
					if(PS.color(currentPkX - 1, currentPkY) == PS.COLOR_WHITE)
					{
						if(!((currentPkX == currentGoalPkX) && (currentPkY == currentGoalPkY)))
						{
							PS.color(currentPkX, currentPkY, PS.DEFAULT);
						}
						currentPkX = currentPkX - 1;
						PS.color(currentPkX, currentPkY, 224, 54, 187);
					}
					else if((currentPkX - 1 == currentGoalPkX) && (currentPkY == currentGoalPkY))
					{
						PS.color(currentPkX, currentPkY, PS.DEFAULT);
						currentPkX = currentPkX - 1;
						PS.color(currentPkX, currentPkY, 224, 54, 187);
					}

					if(PS.color(currentGnX - 1, currentGnY) == PS.COLOR_WHITE)
					{
						if(!((currentGnX == currentGoalGnX) && (currentGnY == currentGoalGnY)))
						{
							PS.color(currentGnX, currentGnY, PS.DEFAULT);
						}
						currentGnX = currentGnX - 1;
						PS.color(currentGnX, currentGnY, 61, 214, 56);
					}
					else if((currentGnX - 1 == currentGoalGnX) && (currentGnY == currentGoalGnY))
					{
						PS.color(currentGnX, currentGnY, PS.DEFAULT);
						currentGnX = currentGnX - 1;
						PS.color(currentGnX, currentGnY, 61, 214, 56);
					}
					if(((currentGnX == currentGoalGnX) && (currentGnY == currentGoalGnY)) && ((currentPkX == currentGoalPkX) && (currentPkY == currentGoalPkY)))
					{
						PS.color(currentGoalPkX, currentGoalPkY, 255, 232, 25);
						PS.alpha(currentGoalPkX, currentGoalPkY, 255);
						PS.color(currentGoalGnX, currentGoalGnY, 255, 232, 25)
						PS.alpha(currentGoalGnX, currentGoalGnY, 255);

						currentLvl = currentLvl + 1;
						PS.resetLvl();
					}
				}
			}
			else if (key == PS.KEY_ARROW_RIGHT)
			{
				if(PS.color(currentPkX + 1, currentPkY) == PS.COLOR_RED || PS.color(currentGnX + 1, currentGnY) == PS.COLOR_RED){
					PS.resetLvl();
				}
				else
				{
					if(PS.color(currentGnX + 1, currentGnY) == PS.COLOR_WHITE)
					{
						if(!((currentGnX == currentGoalGnX) && (currentGnY == currentGoalGnY))){
							PS.color(currentGnX, currentGnY, PS.DEFAULT);
						}
						currentGnX = currentGnX + 1;
						PS.color(currentGnX, currentGnY, 61, 214, 56);
					}
					else if((currentGnX + 1 == currentGoalGnX) && (currentGnY == currentGoalGnY))
					{
						PS.color(currentGnX, currentGnY, PS.DEFAULT);
						currentGnX = currentGnX + 1;
						PS.color(currentGnX, currentGnY, 61, 214, 56);
					}
					if(PS.color(currentPkX + 1, currentPkY) == PS.COLOR_WHITE)
					{
						if(!((currentPkX == currentGoalPkX) && (currentPkY == currentGoalPkY)))
						{
							PS.color(currentPkX, currentPkY, PS.DEFAULT);
						}
						currentPkX = currentPkX + 1;
						PS.color(currentPkX, currentPkY, 224, 54, 187);
					}
					else if((currentPkX + 1 == currentGoalPkX) && (currentPkY == currentGoalPkY))
					{
						PS.color(currentPkX, currentPkY, PS.DEFAULT);
						currentPkX = currentPkX + 1;
						PS.color(currentPkX, currentPkY, 224, 54, 187);
					}
					if(((currentGnX == currentGoalGnX) && (currentGnY == currentGoalGnY)) && ((currentPkX == currentGoalPkX) && (currentPkY == currentGoalPkY)))
					{
						PS.color(currentGoalPkX, currentGoalPkY, 255, 232, 25);
						PS.alpha(currentGoalPkX, currentGoalPkY, 255);
						PS.color(currentGoalGnX, currentGoalGnY, 255, 232, 25);
						PS.alpha(currentGoalGnX, currentGoalGnY, 255);

						currentLvl = currentLvl + 1;
						PS.resetLvl();
					}
				}
			}
			else if (key == PS.KEY_ARROW_DOWN)
			{
				if(PS.color(currentPkX, currentPkY + 1) == PS.COLOR_RED || PS.color(currentGnX, currentGnY + 1) == PS.COLOR_RED){
					PS.resetLvl();
				}
				else
				{
					if(PS.color(currentPkX, currentPkY + 1) == PS.COLOR_WHITE)
					{
						if(!((currentPkX == currentGoalPkX) && (currentPkY == currentGoalPkY)))
						{
							PS.color(currentPkX, currentPkY, PS.DEFAULT);
						}
						currentPkY = currentPkY + 1;
						PS.color(currentPkX, currentPkY, 224, 54, 187);
					}
					else if((currentPkX == currentGoalPkX) && (currentPkY + 1 == currentGoalPkY))
					{
						PS.color(currentPkX, currentPkY, PS.DEFAULT)
						currentPkY = currentPkY + 1;
						PS.color(currentPkX, currentPkY, 224, 54, 187);
					}
					if(PS.color(currentGnX, currentGnY + 1) == PS.COLOR_WHITE)
					{
						if(!((currentGnX == currentGoalGnX) && (currentGnY == currentGoalGnY)))
						{
							PS.color(currentGnX, currentGnY, PS.DEFAULT);
						}
						currentGnY = currentGnY + 1;;
						PS.color(currentGnX, currentGnY, 61, 214, 56);
					}
					else if((currentGnX == currentGoalGnX) && (currentGnY + 1 == currentGoalGnY))
					{
						PS.color(currentGnX, currentGnY, PS.DEFAULT)
						currentGnY = currentGnY + 1;;
						PS.color(currentGnX, currentGnY, 61, 214, 56);
					}
					if(((currentGnX == currentGoalGnX) && (currentGnY == currentGoalGnY)) && ((currentPkX == currentGoalPkX) && (currentPkY == currentGoalPkY)))
					{
						PS.color(currentGoalPkX, currentGoalPkY, 255, 232, 25);
						PS.alpha(currentGoalPkX, currentGoalPkY, 255);
						PS.color(currentGoalGnX, currentGoalGnY, 255, 232, 25)
						PS.alpha(currentGoalGnX, currentGoalGnY, 255);

						currentLvl = currentLvl + 1;
						PS.resetLvl();
					}
				}
			}
			else if (key == PS.KEY_ARROW_UP)
			{
				if(PS.color(currentPkX, currentPkY - 1) == PS.COLOR_RED || PS.color(currentGnX, currentGnY - 1) == PS.COLOR_RED){
					PS.resetLvl();
				}
				else
				{
					if(PS.color(currentPkX, currentPkY - 1) == PS.COLOR_WHITE)
					{
						if(!((currentPkX == currentGoalPkX) && (currentPkY == currentGoalPkY)))
						{
							PS.color(currentPkX, currentPkY, PS.DEFAULT);
						}
						currentPkY = currentPkY - 1;
						PS.color(currentPkX, currentPkY, 224, 54, 187);
					}
					else if((currentPkX == currentGoalPkX) && (currentPkY - 1 == currentGoalPkY))
					{
						PS.color(currentPkX, currentPkY, PS.DEFAULT)
						currentPkY = currentPkY - 1;
						PS.color(currentPkX, currentPkY, 224, 54, 187);
					}
					if(PS.color(currentGnX, currentGnY - 1) == PS.COLOR_WHITE || ((currentGnX == currentGoalGnX) && (currentGnY - 1 == currentGoalGnY)))
					{
						if(!((currentGnX == currentGoalGnX) && (currentGnY == currentGoalGnY)))
						{
							PS.color(currentGnX, currentGnY, PS.DEFAULT);
						}
						currentGnY = currentGnY - 1;;
						PS.color(currentGnX, currentGnY, 61, 214, 56);
					}
					else if((currentGnX == currentGoalGnX) && (currentGnY - 1 == currentGoalGnY))
					{
						PS.color(currentGnX, currentGnY, PS.DEFAULT)
						currentGnY = currentGnY - 1;;
						PS.color(currentGnX, currentGnY, 61, 214, 56);
					}
					if(((currentGnX == currentGoalGnX) && (currentGnY == currentGoalGnY)) && ((currentPkX == currentGoalPkX) && (currentPkY == currentGoalPkY)))
					{
						PS.color(currentGoalPkX, currentGoalPkY, 255, 232, 25);
						PS.alpha(currentGoalPkX, currentGoalPkY, 255);
						PS.color(currentGoalGnX, currentGoalGnY, 255, 232, 25)
						PS.alpha(currentGoalGnX, currentGoalGnY, 255);

						currentLvl = currentLvl + 1;
						PS.resetLvl();
					}
				}
			}
		}
}
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

PS.resetLvl = function(){
	if(currentLvl == 1)
	{
		PS.resetFirst();
	}

	else if(currentLvl == 2){
		PS.resetSecond();
	}
	else if(currentLvl == 3){
		PS.resetThird();
	}
	else if(currentLvl == 4){
		PS.resetEnd();
	}
}

PS.resetFirst = function(){
	PS.color(PS.ALL, PS.ALL, PS.COLOR_WHITE);
	PS.alpha(PS.ALL, PS.ALL, 255);

	currentPkX = 2;
	currentPkY = 2;
	currentGnX = 18;
	currentGnY = 2;	

	for(var i = 0; i < 21; i++)
	{
		PS.color(20, i, 96, 89, 99);
		PS.color(i, 20, 96, 89, 99);
		PS.color(0, i, 96, 89, 99);
		PS.color(i, 0, 96, 89, 99);
		PS.color(10, i, 96, 89, 99);

		if(i < 7 || ((13 < i) && (i < 20))){
			PS.color(i, 4, 96, 89, 99);
		}
	}

	//GREEN PATH
	PS.color(4, 1, 96, 89, 99);
	PS.color(4, 3, 96, 89, 99);
	PS.color(11, 8, 96, 89, 99);
	PS.color(12, 8, 96, 89, 99);
	PS.color(13, 8, 96, 89, 99);
	PS.color(14, 8, 96, 89, 99);
	PS.color(15, 8, 96, 89, 99);
	PS.color(16, 8, 96, 89, 99);
	PS.color(17, 8, 96, 89, 99);
	PS.color(19, 8, 96, 89, 99);
	PS.color(16, 6, 96, 89, 99);
	PS.color(16, 9, 96, 89, 99);
	PS.color(16, 10, 96, 89, 99);
	PS.color(16, 11, 96, 89, 99);
	PS.color(16, 12, 96, 89, 99);
	PS.color(16, 13, 96, 89, 99);
	PS.color(16, 14, 96, 89, 99);
	PS.color(16, 15, 96, 89, 99);
	PS.color(16, 16, 96, 89, 99);
	PS.color(16, 17, 96, 89, 99);
	PS.color(17, 12, 96, 89, 99);
	PS.color(18, 12, 96, 89, 99);
	PS.color(18, 16, 96, 89, 99);
	PS.color(19, 16, 96, 89, 99);
	PS.color(15, 17, 96, 89, 99);
	PS.color(13, 17, 96, 89, 99);
	PS.color(11, 17, 96, 89, 99);

	PS.color(currentGoalGnX, currentGoalGnY, 61, 214, 56)
	PS.alpha(currentGoalGnX, currentGoalGnY, 100);

	//PINK PATH
	PS.color(7, 4, 96, 89, 99);
	PS.color(7, 5, 96, 89, 99);
	PS.color(7, 6, 96, 89, 99);
	PS.color(7, 7, 96, 89, 99);
	PS.color(7, 8, 96, 89, 99);
	PS.color(7, 9, 96, 89, 99);
	PS.color(7, 10, 96, 89, 99);
	PS.color(7, 12, 96, 89, 99);
	PS.color(8, 12, 96, 89, 99);
	PS.color(9, 12, 96, 89, 99);
	PS.color(6, 12, 96, 89, 99);
	PS.color(5, 12, 96, 89, 99);
	PS.color(4, 12, 96, 89, 99);
	PS.color(3, 12, 96, 89, 99);
	PS.color(3, 11, 96, 89, 99);
	PS.color(3, 10, 96, 89, 99);
	PS.color(3, 9, 96, 89, 99);
	PS.color(3, 8, 96, 89, 99);
	PS.color(3, 7, 96, 89, 99);
	PS.color(3, 5, 96, 89, 99);
	PS.color(2, 8, 96, 89, 99);
	PS.color(1, 10, 96, 89, 99);
	PS.color(4, 8, 96, 89, 99);
	PS.color(5, 8, 96, 89, 99);
	PS.color(2, 12, 96, 89, 99);
	PS.color(16, 1, 96, 89, 99);
	PS.color(16, 3, 96, 89, 99);

	PS.color(currentGoalPkX, currentGoalPkY, 224, 54, 187);
	PS.alpha(currentGoalPkX, currentGoalPkY, 100);

	PS.glyph(8, 21, "R");
	PS.glyph(9, 21, "E");
	PS.glyph(10, 21, "S");
	PS.glyph(11, 21, "E");
	PS.glyph(12, 21, "T");
	PS.color(currentPkX, currentPkY, 224, 54, 187);
	PS.color(currentGnX, currentGnY, 61, 214, 56);
}

PS.resetSecond = function(){
	PS.color(PS.ALL, PS.ALL, PS.COLOR_WHITE);
	PS.alpha(PS.ALL, PS.ALL, 255);

	PS.statusText("Puzzle Lvl-2");
	PS.glyph(8, 21, "R");
	PS.glyph(9, 21, "E");
	PS.glyph(10, 21, "S");
	PS.glyph(11, 21, "E");
	PS.glyph(12, 21, "T");

	currentPkX = 11;
	currentPkY = 9;
	currentGnX = 9;
	currentGnY = 13;

	currentGoalGnX = 9;
	currentGoalGnY = 18;

	currentGoalPkX = 5;
	currentGoalPkY = 18;

	PS.color(currentPkX, currentPkY, 224, 54, 187);
	PS.color(currentGnX, currentGnY, 61, 214, 56);

	PS.color(currentGoalGnX, currentGoalGnY, 61, 214, 56)
	PS.alpha(currentGoalGnX, currentGoalGnY, 100);

	PS.color(currentGoalPkX, currentGoalPkY, 224, 54, 187);
	PS.alpha(currentGoalPkX, currentGoalPkY, 100);

	var map = [
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 1, 2, 1,
		1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1,
		1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 1,
		1, 0, 2, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1,
		1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1,
		1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 2, 1, 0, 1,
		1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 2, 0, 2, 1, 0, 0, 1, 0, 0, 0, 1,
		1, 2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1,
		1, 0, 0, 1, 0, 0, 2, 0, 0, 1, 0, 9, 0, 1, 0, 0, 1, 0, 1, 0, 1,
		1, 0, 0, 1, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 2, 1,
		1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 1, 0, 9, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1,
		1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 1, 2, 1, 0, 1,
		1, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
		1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 8, 0, 1, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];

	var x, y, data;

 	for ( y = 0; y < 21; y += 1 ) {
	 	for ( x = 0; x < 21; x += 1 ) {
			 data = map [ ( y * 21 ) + x ];
	 		if ( data === 1 )
			{
 				PS.color( x, y, 96, 89, 99);
 			}
			else if( data === 2){
				PS.color( x, y, PS.COLOR_RED);
			}
 		}
 	}
}

PS.resetThird = function(){
	PS.color(PS.ALL, PS.ALL, PS.COLOR_WHITE);
	PS.alpha(PS.ALL, PS.ALL, 255);

	PS.statusText("Puzzle Lvl-3");
	PS.glyph(8, 21, "R");
	PS.glyph(9, 21, "E");
	PS.glyph(10, 21, "S");
	PS.glyph(11, 21, "E");
	PS.glyph(12, 21, "T");

	currentPkX = 2;
	currentPkY = 18;
	currentGnX = 18;
	currentGnY = 18;

	currentGoalGnX = 12;
	currentGoalGnY = 2;

	currentGoalPkX = 6;
	currentGoalPkY = 18;

	PS.color(currentPkX, currentPkY, 224, 54, 187);
	PS.color(currentGnX, currentGnY, 61, 214, 56);

	PS.color(currentGoalGnX, currentGoalGnY, 61, 214, 56)
	PS.alpha(currentGoalGnX, currentGoalGnY, 100);

	PS.color(currentGoalPkX, currentGoalPkY, 224, 54, 187);
	PS.alpha(currentGoalPkX, currentGoalPkY, 100);

	var map = [
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1,
		1, 2, 2, 0, 1, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 2, 1,
		1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 2, 2, 2, 2, 1, 2, 2, 0, 2, 1,
		1, 0, 2, 2, 1, 2, 2, 2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1,
		1, 0, 0, 0, 1, 2, 2, 2, 2, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 1, 0, 1, 2, 2, 2, 2, 0, 1, 0, 0, 0, 2, 2, 1, 0, 0, 0, 1,
		1, 0, 0, 0, 1, 2, 2, 2, 2, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 1, 0, 1, 1, 2, 2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 0, 0, 0, 1, 2, 2, 2, 2, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1,
		1, 0, 2, 0, 1, 2, 2, 2, 2, 0, 1, 0, 1, 0, 2, 0, 0, 0, 1, 0, 1,
		1, 0, 0, 0, 1, 2, 2, 2, 2, 0, 1, 2, 1, 0, 0, 0, 2, 0, 0, 0, 1,
		1, 2, 0, 2, 1, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1,
		1, 0, 0, 0, 1, 2, 2, 2, 2, 0, 1, 0, 1, 0, 0, 2, 1, 2, 0, 0, 1,
		1, 0, 1, 0, 1, 2, 2, 2, 2, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
		1, 0, 0, 0, 1, 2, 2, 2, 2, 0, 1, 2, 0, 0, 2, 0, 0, 0, 0, 0, 1,
		1, 2, 0, 2, 1, 2, 2, 2, 2, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 0, 0, 0, 1, 2, 2, 2, 2, 0, 1, 0, 0, 0, 2, 0, 2, 0, 0, 0, 1,
		1, 0, 9, 0, 1, 2, 8, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 9, 0, 1,
		1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];

	var x, y, data;

 	for ( y = 0; y < 21; y += 1 ) {
	 	for ( x = 0; x < 21; x += 1 ) {
			 data = map [ ( y * 21 ) + x ];
	 		if ( data === 1 )
			{
 				PS.color( x, y, 96, 89, 99);
 			}
			else if( data === 2){
				PS.color( x, y, PS.COLOR_RED);
			}
 		}
 	}	
}

PS.resetEnd = function(){
	PS.color(PS.ALL, PS.ALL, PS.COLOR_WHITE);
	PS.alpha(PS.ALL, PS.ALL, 255);
	PS.glyph(8, 21, "");
	PS.glyph(9, 21, "");
	PS.glyph(10, 21, "");
	PS.glyph(11, 21, "");
	PS.glyph(12, 21, "");

	PS.statusText("");

	currentPkX = 3;
	currentPkY = 6;
	currentGnX = 17;
	currentGnY = 6;

	currentGoalGnX = 21;
	currentGoalGnY = 22;

	currentGoalPkX = 21;
	currentGoalPkY = 22;


	PS.color(currentPkX, currentPkY, 224, 54, 187);
	PS.color(currentGnX, currentGnY, 61, 214, 56);

	var map = [
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1,		
		1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1,
		1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1,
		1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];

	var x, y, data;

 	for ( y = 0; y < 21; y += 1 ) {
	 	for ( x = 0; x < 21; x += 1 ) {
			 data = map [ ( y * 21 ) + x ];
	 		if ( data === 1 )
			{
 				PS.color( x, y, 96, 89, 99);
 			}
			else if( data === 2){
				PS.color( x, y, PS.COLOR_RED);
			}
 		}
 	}	
}