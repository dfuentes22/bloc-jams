var animatePoints = function () {
                
    var points = document.getElementsByClassName('point');
    
    var addAnimate = function(i){
            points[i].style.opacity = 1;
            points[i].style.transform = "scaleX(1) translateY(0)";
            points[i].style.msTransform = "scaleX(1) translateY(0)";
            points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
    };
    
    
    var revealPoint = function () {
        for(i = 0; i < 3; i++){
            addAnimate(i);
        }
    }; 
    
    revealPoint();  
};

animatePoints();