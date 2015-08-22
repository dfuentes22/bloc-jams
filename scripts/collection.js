//Template to hold the collection
var collectionItemTemplate = 
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

window.onload = function () {
    //#1
    var collectionContainer = document.getElementsByClassName('album-covers')[0].childNodes[1];
    //#2
    collectionContainer.innerHTML = '';
    
    //#3
    for(var i = 0; i < 12; i++) {
        collectionContainer.innerHTML += collectionItemTemplate;
    }
}