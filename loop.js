/*
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

var ImageLooper = function(_options) {

    function merged_options(options) {
        var default_options = {
            "image_count": 100,
            "framerate": 24,
            "folder": "loopImages",
            "extension": "png",
            "prefix": "image_",
            "img": "currentPicture",
            "urls": null,
            "reversed": false,
            "auto_start": true
        };
        if (!options) return default_options;
        for (var key in options) {
            if (!options.hasOwnProperty(key)) continue;
            if (key == 'img') {
                default_options[key] = document.getElementById(default_options[key]);
            } else {
                default_options[key] = options[key];
            }
        }
        return default_options;
    }

    var options = merged_options(_options);

    function number_strings(count) {
        return Array.apply(null, Array(count)).map(function(_, i) {
            return file_name(i);
        });
    }

    var loaded_images = 0;

    function image_for_file_name(file_name) {
        var image = new Image();
        image.setAttribute("src", file_name);
        image.addEventListener("error", stop, false);
        image.addEventListener("load", function() { loaded_images++; }, false);
        return image;
    }

    function file_name(number) {
        return options.folder + "/" + options.prefix + ("00" + number).slice(-3) + '.' + options.extension;
    }

    function add_tags() {
        if (!options.urls) {
            options.urls = number_strings(options.image_count);
        }
        images = options.urls.map(function(url, _) {
            return image_for_file_name(url)
        });
    }

    var iterator = 0;
    var reversing = false;

    function iterate() {
        if (reversing) {
            if (iterator <= 0) {
                reversing = false;
            } else {
                iterator -= 1;
            }
        } else {
            iterator += 1;
            if (iterator >= options.image_count) {
                if (options.reversed) {
                    reversing = true;
                } else {
                    iterator = 0;
                }
            }
        }
    }

    function process_image() {
        var image = images[iterator];
        if (image) {
            options.img.src = image.src;
        }
    }


    /* Frame Rate adjustments thanks to Rishabh at http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/ */
    var then = Date.now();
    var request;

    function timeout_interval() {
        return 1000 / options.framerate;
    }

    function loop() {
        request = window.requestAnimationFrame(loop);
        if (loaded_images < options.image_count) return;
        var now = Date.now();
        var delta = now - then;
        var interval = timeout_interval();
        if (delta > interval) {
            then = now - (delta % interval);
            process_image();
            iterate();
        }
    }

    function set_reversed(reversed) {
        options.reversed = reversed;
    }

    function set_framerate(framerate) {
        options.framerate = Math.abs(framerate);
        interval = 1000 / options.framerate;
    }

    function stop() {
        window.cancelAnimationFrame(request);
    }

    add_tags();

    if (options.auto_start) {
        loop();
    }

    return {
        start: loop,
        stop: stop,
        set_reversed: set_reversed,
        set_framerate: set_framerate
    };
};
