The goal of this project was to recreate a simple but significative and realistic 3D representation of the famous Tetris game, 
both in aspect (colors, textures) and gameplay (score system, rotation of pieces, conditions of gameover). 
The only semplification that needs to be taken into account is the scrolling movement of the falling pieces, which is actually 
continuous instead of stepped, due to the fact that complicating too much the code for something not related 3D graphics did not seem a good idea.

To make everything work the variable path on line 42 must be set to the path inside the local server in which the folder is run.
Nothing else should be necessary (tested on Google Chrome 49.0.2623.112m).

The scene is static and not interactive in any way but shows a pausable game-over sequence (repeated cyclically) in which we suppose a 
player is actually controlling the game.

The player camera is fixed and simulates the perspective of the original game, in particular it's difficult to get the whole 3D scene structure
from this perspective; the user can switch to the free (mouse-controlled) camera through the button on the top of the page.

The models used were taken from: http://www.sharecg.com/v/77000/gallery/5/3D-Model/TETRIS and do not have any kind of use restrictions;
they have been actually slightly modified (basically through scaling and change of pivot) to get a nicer (kind of) puzzle picture.
The only texture used so far (maybe some nicer terrain/background could be included in the future) is free to use too and is accessible at:
http://mb.srb2.org/showpost.php?p=755167&postcount=1

There's some (intended to) optimization code around to reduce the amount of work that goes through the pipeline and obtain better performance on
weaker machines, especially in the event lightning effects and better materials are added.
