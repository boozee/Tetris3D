The goal of this project was to recreate a simple but significative and realistic 3D representation of the famous Tetris game, 
both in aspect (colors, textures) and gameplay (score system, rotation of pieces, conditions of gameover).

To work in a local environment the path should be set properly on line 27, pointing to the folder in the local server where the game directory is placed.
Nothing else should be necessary (tested on Google Chrome 50.0.2661.87m).

The scene is static and not interactive in any way but shows a pausable game-over sequence (repeated cyclically) in which we suppose a 
player is actually controlling the game. The speed of the animation is adjustable through the interface on the upper-left corner.

The player camera is fixed and simulates the perspective of the original game, in particular it's difficult to get the whole 3D scene structure
from this perspective; the user can switch to the free (mouse-controlled) camera through the button on the top of the page.

The models used were taken from: http://www.sharecg.com/v/77000/gallery/5/3D-Model/TETRIS and do not have any kind of use restrictions;
they have been actually slightly modified (basically through scaling and change of pivot) to get a nicer (kind of) puzzle picture.
The only texture used so far (maybe some nicer terrain/background could be included in the future) is free to use too and is accessible at:
http://mb.srb2.org/showpost.php?p=755167&postcount=1
