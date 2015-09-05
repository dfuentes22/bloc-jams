//#1 Template to hold the collection
 var buildCollectionItemTemplate = function() {
 
    var template =
    '<div class="collection-album-container column fourth">'
+ '    <img src="assets/images/album_covers/01.png"/>'
+ '    <div class="collection-album-info caption">'
+ '      <p>'
+ '         <a class="album-name" href="#">The Colors</a>'
+ '         <br/>'
+ '         <a href="#">Pablo Picasso</a>'
+ '         <br/>'
+ '         X songs'
+ '         <br/>'
+ '      </p>'
+ '    </div>'
+ '  </div>';
      
     // #2 returns the template
     return $(template);
 };

$(window).load(function() {
    //#3 Assign the album container that has the .clearfix classes on it
    var $collectionContainer = $('.album-covers .clearfix');
    
    //#4 Clear the conctents of the HTML just in case someting else has been dynamicaly inserted
    $collectionContainer.empty();
    for(var i = 0; i < 12; i++) {
        var $newThumbnail = buildCollectionItemTemplate();
    //#5
        $collectionContainer.append($newThumbnail);
        
    }
});