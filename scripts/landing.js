var pointsArray = document.getElementsByClassName('point');

var animatePoints = function (points) {
                
    
    var addAnimate = function(i){
            points[i].style.opacity = 1;
            points[i].style.transform = "scaleX(1) translateY(0)";
            points[i].style.msTransform = "scaleX(1) translateY(0)";
            points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
    };
    
    
    var revealPoint = function() {
        for(i = 0; i < points.length; i++){
            addAnimate(i);
        }
    }; 
    
    revealPoint();  
};


window.onload = function() {
    //Automatically animates the points on a tall screen where scrolling isn't available
    if(window.innerHeight > 950) {
        animatePoints(pointsArray);   
    }
  window.addEventListener('scroll', function(event) {
    //use to figure out how far the selling points are from top
    //console.log("Current offset from the top is " + pointsArray[0].getBoundingClientRect().top + " pixels");
    if(pointsArray[0].getBoundingClientRect().top <= 500) {
        animatePoints(pointsArray);
    }
  });
}