// Example Album
 var albumPicasso = {
     name: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { name: 'Blue', length: '4:26' },
         { name: 'Green', length: '3:14' },
         { name: 'Red', length: '5:01' },
         { name: 'Pink', length: '3:21'},
         { name: 'Magenta', length: '2:15'}
     ]
 };
  
 // Another Example Album
 var albumMarconi = {
     name: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { name: 'Hello, Operator?', length: '1:01' },
         { name: 'Ring, ring, ring', length: '5:01' },
         { name: 'Fits in your pocket', length: '3:21'},
         { name: 'Can you hear me now?', length: '3:14' },
         { name: 'Wrong phone number', length: '2:15'}
     ]
 };
 
//My album
var albumDan = {
     name: 'Torches',
     artist: 'Foster The People',
     label: 'Columbia',
     year: '2011',
     albumArtUrl: 'assets/images/album_covers/11.png',
     songs: [
         { name: 'Helena Beat', length: '4:36' },
         { name: 'Pumped Up Kids', length: '4:00' },
         { name: 'Waste', length: '3:25'},
         { name: 'Call It What You Want', length: '4:01' },
         { name: 'Warrant', length: '5:23'}
     ]
 };
     
//Template for a song row
 var createSongRow = function(songNumber, songName, songLength) {
      
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
  
     return $(template);
  
 };
 
//function that sets the current album 
var setCurrentAlbum = function(album) {
  
    // #1 Select elements that we want to populate with text dynamically
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    //#2 // Assign values to each part of the album (text, images)
     $albumTitle.text(album.name);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
     
    // Clear contents of album song list container
    $albumSongList.empty();     
    // Build list of songs from album JavaScript object
    for(i=0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
         $albumSongList.append($newRow);    }
};

var findParentByClassName = function(element, targetClass) {
    
    var currentParent = element.parentElement;
    
    while (currentParent.className != targetClass) {
        currentParent = currentParent.parentElement
    }
    
    return currentParent;

};

var getSongItem = function(element) {
    
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }
    
};

var clickHandler = function(targetElement) {
    var songItem = getSongItem(targetElement);
    
    if (currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }
    else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
     }
    else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }
 };
 
// Elements we'll be adding listeners to
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
 
 // Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;

window.onload = function() {

    setCurrentAlbum(albumPicasso);
    
     songListContainer.addEventListener('mouseover', function(event) {

       console.log(event.target);
        // Only target individual song rows during event delegation
        if (event.target.parentElement.className === 'album-view-song-item') {
            // Change the content from the number to the play button's HTML
            event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
            var songItem = getSongItem(event.target);

            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            } else {
                songItem.innerHTML = pauseButtonTemplate;
            }
        }
    });
    for (i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {
        // Revert the content back to the number
            //#1
             var leavingSongItem = getSongItem(event.target);
             var leavingSongItemNumber = leavingSongItem.getAttribute('data-song-number');
 
             // #2
             if (leavingSongItemNumber !== currentlyPlayingSong) {
                 leavingSongItem.innerHTML = leavingSongItemNumber;
             }
        });
        
        songRows[i].addEventListener('click', function(event) {
             // Event handler call
            clickHandler(event.target);
        });
    }
};