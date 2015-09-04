//#4
var animatePoints = function() {
                
                
    var revealPoint = function() {
        // #6
        $(this).css({
            opacity: 1,
            transform: 'scaleX(1) translateY(0)'
        });
    };
    
    // #5
    $.each($('.point'), revealPoint);

};

$(window).load(function() {
    
    // #1
    if ($(window).height() > 950) {
        animatePoints();
    }
    
    // #2
    $(window).scroll(function(event) {
        
    // #3
        if ($(window).scrollTop() >= 500) {
            animatePoints();
        
        }
        
    });
    
});