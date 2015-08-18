var pointsArray = document.getElementsByClassName('point');


var addAnimation = function(index){
        pointsArray[index].style.opacity = 1;
        pointsArray[index].style.transform = "scaleX(1) translateY(0)";
        pointsArray[index].style.msTransform = "scaleX(1) translateY(0)";
        pointsArray[index].style.WebkitTransform = "scaleX(1) translateY(0)";
};


var revealPoint = function(callback) {
    forEach(pointsArray, callback);
}; 


window.onload = function() {
    //Automatically animates the points on a tall screen where scrolling isn't available
    if(window.innerHeight > 950) {
        revealPoint(addAnimation); 
    }
  window.addEventListener('scroll', function(event) {
    //use to figure out how far the selling points are from top
    //console.log("Current offset from the top is " + pointsArray[0].getBoundingClientRect().top + " pixels");
    if(pointsArray[0].getBoundingClientRect().top <= 500) {
       revealPoint(addAnimation); 
    }
  });
}