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
var defaultOptions = {"numberOfImages" : "54", "folder" : "loopImages", "fileExtension" : "png", "imagePrefix" : "image_", "divId" : "currentPicture", "reverseBoxId" : "reverseCheckBox", "autoStart" : true};

var imageLooper = function (options) {
    var imageArray;
    options = options || defaultOptions;
    function imageTagArray() {
        if (!imageArray) {
            imageArray = [];
            var i;
            for (i = 0; i < options.numberOfImages; i += 1) {
                var numberString = '';        
                if (i < 10) {
                    numberString = '00' + i; //Change the 0's here based on the nuber of images you have.
                }
                else if (i < 100) {
                    numberString = '0' + i;
                }
                    else {
                        numberString = '' + i;
                    }
                imageArray.push(makeAndAddImageTagToDocument(numberString, i));
            }
        }
        return imageArray;
    }

    var iterator = 0;
    var checkBox = document.getElementById(options.reverseBoxId);
    var reversing = false;
    var interval;

    function startLoop() {
            interval = setInterval(loop, 50);
    }
    
    function setTagAttributes(tag, numberString, i) {
        var fileNameString = options.folder + "/" + options.imagePrefix + numberString + '.' + options.fileExtension;
        tag.style.display = "none";
        tag.setAttribute("src", fileNameString);
        tag.setAttribute("onerror", "imageLooper.stopLoop()");
        tag.setAttribute("id", i);
    }
    
    function makeAndAddImageTagToDocument(numberString, i) {
        var imageTag = document.createElement("IMAGE");
        setTagAttributes(imageTag, numberString, i);
        document.getElementById(options.divId).appendChild(imageTag);
        return imageTag;
    }
    
    function currentTagNumbers() {
        
        var lastImage = 0;
        var currentImage = iterator;
        var numberArray = [];
        if (reversing) {
            lastImage = iterator;
            if (lastImage === options.numberOfImages) {
                lastImage = options.numberOfImages - 1;
            }
            if (lastImage === 0) {
                reversing = false;
            }
            else {
                currentImage = lastImage - 1;
            }
        }
        else {
            lastImage = (iterator - 1);
            if (lastImage === -1) {
                lastImage = options.numberOfImages - 1;
            }
        }
        numberArray.push(lastImage);
        numberArray.push(currentImage);
        return numberArray;
    }
    
    function loop() {
        if (checkBox !== null) {
            var isReversed = checkBox.checked;
        }
    
        var picArray = imageTagArray();
        var numbers = currentTagNumbers();
        
        var lastImageTag = picArray[numbers[0]]; //document.getElementById(lastImage);
        if (lastImageTag) {
            lastImageTag.style.display = "none";
        }
    
        var imageTag = picArray[numbers[1]]; //document.getElementById(currentImage);
        if (imageTag) {
            imageTag.style.display = "block";
        }
    
	   if (reversing) {
           if (iterator <= 0) {
               reversing = false;
           }
           else {
               iterator -= 1;
           }
	   }
	   else {
           iterator += 1;
           if (iterator >= options.numberOfImages) {
               if (isReversed) {
                   reversing = true;
               }
               else {
                   iterator = 0;
               }
           }
	   }
    }

    function stopLoop() {
        clearInterval(interval);
    }
    
    if (options.autoStart) {
        startLoop();
    }
    
};

//imageLooper(options);