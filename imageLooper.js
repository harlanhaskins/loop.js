/*
Written by Harlan Haskins.
Copyright 2012, Not So Average, Inc.
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
	
	You must have a folder filled with your images, named sequentially with a 3 digit number, starting with 000.
	
	You must set the parameters in your HTML!
*/

var numberOfImages = 100;
var folder = 'loopImages/'; //The folder where the images reside.
var fileExtension = 'png'; //The extension of the files.
var imagePrefix = 'image_'
var imageId = 'currentFrame'; //The Element ID of the image that is in your HTML.
var reverseBoxId = 'reverseCheckBox'; //The Element ID of the checkbox used to determine reversing.
var isGoing = false;

function imageStringArray() {
	var picArray = [];
	console.log(window.numberOfImages);
	var i = 0;
	for (i = 0; i <= window.numberOfImages; i++) {
			if (i < 10) {
				var numberString = '00' + i; //Change the 0's here based on the nuber of images you have.
			}
			else if (i < 100) {
				var numberString = '0' + i;
			}
			else {
				var numberString = '' + i;
			}
			var fileNameString = folder + imagePrefix + numberString + '.' + window.fileExtension;
			console.log(fileNameString);
			picArray.push(fileNameString);
	}
	return picArray;
}

var iterator = 0;
var checkBox = document.getElementById(reverseBoxId);
var reversing = false;
var interval;

function startLoop() {
	if (interval != null {
			interval = setInterval(loop, 50);
	}
}

function loop() {
	if (checkBox !== null) {
		var isReversed = checkBox.checked;
	}
	document.getElementById("currentFrame").src = pictureArray[iterator];
	if (reversing) {
		if (iterator === 0) {
			reversing = false;
		}
		else {
			iterator -= 1;
		}
	}
	else {
		iterator += 1;
		if (iterator === numberOfImages) {
			if (isReversed) {
				reversing = true;
			}
			else {
				iterator = 0;
			}
		}
	}
	console.log(pictureArray[iterator]);
}

function stopLoop() {
	clearInterval(interval);
	interval = null;
}