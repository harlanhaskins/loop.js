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

/*jshint browser:true */

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

    var urlsProvided = false;

    function getMergedOptions(options) {
        var defaultOptions = {
            "numberOfImages": 100,
            "framesPerSecond": 24,
            "folder": "loopImages",
            "fileExtension": "png",
            "imagePrefix": "image_",
            "img": "currentPicture",
            "urls": null,
            "reversed": false,
            "autoStart": true
        };
        if (options) {
            var key;
            for (key in options) {
                if (!options.hasOwnProperty(key)) {
                    continue;
                }
                if (key === 'img') {
                    defaultOptions[key] = document.getElementById(defaultOptions[key]);
                } else {
                    defaultOptions[key] = options[key];
                }
            }
            urlsProvided = (defaultOptions.urls !== null);
        }
        return defaultOptions;
    }

    var imageArray = [];

    options = getMergedOptions(options);

    var loadedImages = 0;

    function addToLoadedImages() {
        loadedImages += 1;
    }

    function allImagesLoaded() {
        return (loadedImages >= options.numberOfImages);
    }

    function numberStringArray() {
        var urls = [];
        var i = 0;
        while (i < options.numberOfImages) {
            urls.push(fileNameString(numberString(i)));
            i++;
        }
        return urls;
    }

    function setImageAttributes(image, fileNameString) {
        image.src = fileNameString;
        image.setAttribute("src", fileNameString);
        image.addEventListener("error", stopLoop, false);
        image.addEventListener("load", addToLoadedImages, false);
    }

    function makeAndAddImageToArray(fileNameString) {
        var image = new Image();
        setImageAttributes(image, fileNameString);
        imageArray.push(image);
        return image;
    }

    function numberString(i) {
        return ("00" + i).slice(-3);
    }

    function fileNameString(numberString) {
        var fileName;
        if (urlsProvided) {
            fileName = numberString;
        } else {
            fileName = options.folder + "/" + options.imagePrefix + numberString + '.' + options.fileExtension;
        }
        return fileName;
    }

    function addImageTagsToDiv() {
        if (!options.urls) {
            options.urls = numberStringArray();
        }
        var i = 0;
        while (i < options.numberOfImages) {
            makeAndAddImageToArray(options.urls[i]);
            i++;
        }
    }

    var iterator = 0;
    var reversing = false;

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
        var image = imageArray[iterator];
        if (image) {
            options.img.src = image.src;
        }

        adjustIterator();
    }


    /* Frame Rate adjustments thanks to Rishabh at http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/ */
    var now;
    var then = Date.now();
    var interval = 1000 / options.framesPerSecond;
    var delta;
    var request;

    function loop() {
        request = window.requestAnimationFrame(loop);
        if (allImagesLoaded()) {
            now = Date.now();
            delta = now - then;
            if (delta > interval) {
                then = now - (delta % interval);
                setPositionInLoop();
            }
        }
    }

    function startLoop() {
        loop();
    }

    function setReversed(reversed) {
        options.reversed = reversed;
    }
    
    function setFramesPerSecond(framesPerSecond) {
        options.framesPerSecond = framesPerSecond;
        interval = 1000 / options.framesPerSecond;
    }

    function stopLoop() {
        window.cancelAnimationFrame(request);
    }

    addImageTagsToDiv();

    if (options.autoStart) {
        startLoop();
    }

    return {
        startLoop: function () {
            return startLoop();
        },
        stopLoop: function () {
            return stopLoop();
        },
        setReversed: function (reversed) {
            return setReversed(reversed);
        },
        setFramesPerSecond: function (framesPerSecond) {
            return setFramesPerSecond(framesPerSecond);
        }
    };

};