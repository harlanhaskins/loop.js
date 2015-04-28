# loop.js

*A template project, using [HTML5 Boilerplate](http://html5boilerplate.com/), has been included with the default values.*

This is loop.js. With it, you can use Javascript to loop through a sequence of images (up to 1000 total) just like a gif, without the color compression.

## Installation

All one needs to do is have:

1. A folder with images to loop in the form [imagePrefix]###.[fileExtension] or an array of URLs pointing to images.
2. An `<img>` with an ID somewhere in their HTML.

Then instantiate an `imageLooper()` object with a JSON object filled with their options. The default options are these:

```javascript
        "image_count" : 100,
        "framerate" : 24,
        "folder" : "loopImages",
        "extension" : "png",
        "prefix" : "image_",
        "img" : "currentPicture",
        "urls" : null,
        "reversed" : false,
        "auto_start" : true,
        "onframe": null
```

`onframe` is a function to be called per frame change, of type `(current: int, total: int) -> void`

You can change as many or as few of the options as you'd like. If you use the default options, then loop.js requires only one line:

        var looper = ImageLooper();

## Example

If I have a sequence with 217 images, each named `dog-###.jpg`, in the folder `pancakes/`, and I want the images looped in an img with the id `snails`.

I would write this:

```html
    <script src="js/loop.js"></script>
    <script type="text/javascript">
        var looper = imageLooper({
            "image_count" : 217,
            "extension" : "jpg",
            "prefix" : "dog-",
            "img" : "snails"
        });
	    // if you don't want to use buttons to start the loop,
        // and you've disabled autoStart,
	    // make sure you call looper.start() somewhere.
    </script>
```

If you want to start the loop, call `looper.start()`, if you want to stop, call `looper.stop()`.
You can also call `looper.set_reversed(reversed)` to set if the image
reverses at the end, and `looper.set_framerate(framerate)` to set the
framerate.
