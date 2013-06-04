loop.js
=====

*A template project, using [HTML5 Boilerplate](http://html5boilerplate.com/), has been included with the default values.*

This is loop.js. With it, you can use Javascript to loop through a sequence of images (up to 1000 total) just like a gif, without the color compression.

Installation
===
All one needs to do is somewhere in their HTML have an img with an ID and instantiate an `imageLooper()` object with a JSON object filled with their options. The default options are these:

        "numberOfImages" : 100,
        "framesPerSecond" : 24,
        "folder" : "loopImages",
        "fileExtension" : "png",
        "imagePrefix" : "image_",
        "img" : "currentPicture",
        "reversed" : false,
        "autoStart" : true
        
You can change as many or as few of the options as you'd like. If you use the default options, then loop.js requires only one line:
        
        var looper = imageLooper();

For example, if I have a sequence with 217 images, each named `dog_###.jpg`, in the folder `pancakes/`, and I want the images looped in an img with the id `snails`.

I would write this:

	<script src="js/imageLooper.js"></script>
	<script type = "text/javascript">
		var looperOptions = { "numberOfImages" : 217,
                                  "fileExtension" : "jpg",
                                  "imagePrefix" : "dog_",
                                  "img" : "snails" };
                var looper = imageLooper(looperOptions);
		//if you don't want to use buttons to start the loop, and you've disabled autoStart, make sure you call looper.startLoop() somewhere.	</script>

If you want to start the loop, call `looper.startLoop()`, if you want to stop, call `looper.stopLoop()`. You can also call looper.setReversed(reversed) to, well, set if the image reverses at the end.
