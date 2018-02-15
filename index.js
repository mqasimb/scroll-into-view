var imagesObject;
//Loaded iamge data which can also be received from a server
var imageURLs = ['https://images.pexels.com/photos/314374/pexels-photo-314374.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
'https://images.pexels.com/photos/214493/pexels-photo-214493.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
'https://images.pexels.com/photos/205352/pexels-photo-205352.jpeg?w=940&h=650&auto=compress&cs=tinysrgb']

window.addEventListener('DOMContentLoaded', function() {
	imagesObject = Array.prototype.map.call(document.querySelectorAll('img'), function(elm) {
		//Return an object with a reference to the element and the distance from the top of the document
		return {element: elm, scrollValue: elm.getBoundingClientRect().top}
	})

	//Run the Scroll Event Handler on load incase any images are visible in the viewport once all resources are loaded
	window.addEventListener("load", function(event) {
		if(imageURLs.length > 0) {
    		scrollEventHandler();
    	}
  	}, false);
  	window.addEventListener("resize", function(event) {
  		if(imageURLs.length > 0) {
  			scrollEventHandler();
  		}
  	}, false);
	window.addEventListener('scroll', scrollEventHandler, false);

	//Function run once an image container comes into view
	function isScrolledIntoView(elm) {
		//Get src url from array and set that to image src
		var srcAttribute = imageURLs.shift()
		elm.setAttribute('src', srcAttribute)
	}
	var currentScrollY = window.scrollY;
	function scrollEventHandler(e) {
		//Keep track of ScrollY so only scroll downs trigger any changes
		if(currentScrollY < window.scrollY)
			currentScrollY = window.scrollY;
		for (var i=0; i<imagesObject.length; i++) {
			//Only run the function if it becomes visible as scrolling down
			if(imagesObject[i].scrollValue - currentScrollY - visualViewport.height <= 0) {
				isScrolledIntoView(imagesObject[i].element);
			} else {
				//No need to check the rest of the elements if no images are within the viewport
				break;
			}
		}
		//Will remove all images from array that have already been loaded to prevent them from being loaded again
		imagesObject = imagesObject.slice(i);
	}
}, false)