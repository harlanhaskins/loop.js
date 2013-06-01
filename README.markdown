JSGif
=====

*A template project, using [HTML5 Boilerplate](http://html5boilerplate.com/), has been included with the default values.*

This is JSGif. With it, you can use Javascript to loop through a sequence of images (up to 1000 total) just like a gif, without the color compression.

All one needs to do is somewhere in their HTML have an image attribute with an ID, optionally have a checkbox attribute with an ID that determines whether or not to reverse the loop at the end, include these lines:

	
	<script src="js/imageLooper.js"></script>
	<script type = "text/javascript">
		window.numberOfImages = 100;
		window.folder = 'loopImages/'
		window.imagePrefix = 'image_'
		window.fileExtension = 'png';
		window.divId = 'currentPicture';
		window.reverseBoxId = 'reverseCheckBox';
		var pictureArray = imageTagArray();
		//if you don't want to use buttons to start the loop, make sure you call 		the startLoop() function somewhere.
		//startLoop();
	</script>

And change the variables based on your data. These values are all the defaults.

For example, I have a sequence with 217 images, each named `dog_###.jpg`, in the folder `pancakes/`, and I want the images looped in an image with the id `snails`.

I would write this:

	<script src="js/imageLooper.js"></script>
	<script type = "text/javascript">
		window.numberOfImages = 217;
		window.folder = 'pancakes/'
		window.imagePrefix = 'dog_'
		window.fileExtension = 'jpg';
		window.divId = 'snails';
		window.reverseBoxId = 'reverseCheckBox';
		var pictureArray = imageStringArray();
		//if you don't want to use buttons to start the loop, make sure you call 		the startLoop() function somewhere.
		//startLoop();
	</script>

If you want to start the loop, call `startLoop()`, if you want to stop, call `stopLoop()`.