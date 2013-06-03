/*
Written by Harlan Haskins.
Copyright 2013, Not So Average, Inc.
	
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
	
*/

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
(function () {
    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame']);
    }
    if (!window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function (callback) {
            var now = new Date().getTime();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function () {
                callback(lastTime = nextTime);
            },
                nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());

var imageLooper = function (options) {

    function getMergedOptions(options) {
        var defaultOptions = {
            "numberOfImages": 54,
            "framesPerSecond": 24,
            "folder": "loopImages",
            "fileExtension": "png",
            "imagePrefix": "image_",
            "div": "currentPicture",
            "reversed": false,
            "autoStart": true
        };
        if (options) {
            var key;
            for (key in options) {
                if (!options.hasOwnProperty(key)) {
                    continue;
                }
                if (key === 'div') {
                    defaultOptions[key] = document.getElementById(defaultOptions[key]);
                } else {
                    defaultOptions[key] = options[key];
                }
            }
        }
        return defaultOptions;
    }

    options = getMergedOptions(options);

    var loadedImages = 0;

    function addToLoadedImages() {
        loadedImages += 1;
    }

    function allImagesLoaded() {
        return (loadedImages >= options.numberOfImages);
    }

    function setTagAttributes(tag, numberString) {
        var fileNameString = options.folder + "/" + options.imagePrefix + numberString + '.' + options.fileExtension;
        tag.style.display = "none";
        tag.setAttribute("src", fileNameString);
        tag.addEventListener("error", stopLoop, false);
        tag.addEventListener("load", addToLoadedImages, false);
    }

    function makeAndAddImageTagToDocument(numberString) {
        var imageTag = document.createElement("IMAGE");
        setTagAttributes(imageTag, numberString);
        options.div.appendChild(imageTag);
        return imageTag;
    }

    function numberString(i) {
        return ("00" + i).slice(-3);
    }

    function addImageTagsToDiv() {
        var i = 0;
        while (i < options.numberOfImages) {
            makeAndAddImageTagToDocument(numberString(i));
            i++;
        }
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
            } else {
                currentImage = lastImage - 1;
            }
        } else {
            lastImage = (iterator - 1);
            if (lastImage === -1) {
                lastImage = options.numberOfImages - 1;
            }
        }

        numberArray.push(lastImage);
        numberArray.push(currentImage);

        return numberArray;
    }

    var iterator = 0;
    var reversing = false;
    var interval;

    function adjustIterator() {
        if (reversing) {
            if (iterator <= 0) {
                reversing = false;
            } else {
                iterator -= 1;
            }
        } else {
            iterator += 1;
            if (iterator >= options.numberOfImages) {
                if (options.reversed) {
                    reversing = true;
                } else {
                    iterator = 0;
                }
            }
        }
    }

    function setPositionInLoop() {
        var picArray = options.div.children;
        var numbers = currentTagNumbers();
        var lastImageTag = picArray[numbers[0]];
        if (lastImageTag) {
            lastImageTag.style.display = "none";
        }

        var imageTag = picArray[numbers[1]];
        if (imageTag) {
            imageTag.style.display = "block";
        }

        adjustIterator();
    }

    function loop() {
        setTimeout(function () {
            window.requestAnimationFrame(loop);
            if (allImagesLoaded()) {
                setPositionInLoop();
            }
        }, 1000 / options.framesPerSecond);
    }

    function startLoop() {
        loop();
    }

    function setReversed(reversed) {
        options.reversed = reversed;
    }

    function stopLoop() {
        window.cancelAnimationFrame(loop);

    }

    if (options.autoStart) {
        startLoop();
    }

    addImageTagsToDiv();

    return {
        startLoop: function () {
            return startLoop();
        },
        stopLoop: function () {
            return stopLoop();
        },
        setReversed: function (reversed) {
            return setReversed(reversed);
        }
    };

};